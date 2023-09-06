export type ScrollMode = 'always' | 'if-needed'

export interface Options {
	block?: ScrollLogicalPosition
	inline?: ScrollLogicalPosition
	scrollMode?: ScrollMode
	boundary?: Element | ((parent: Element) => boolean) | null
	skipOverflowHiddenElements?: boolean
}

export interface ScrollAction {
	el: Element
	top: number
	left: number
}

const isElement = (el: any): el is Element =>
	typeof el === 'object' && el != null && el.nodeType === 1

const canOverflow = (
	overflow: string | null,
	skipOverflowHiddenElements?: boolean
) => {
	if (skipOverflowHiddenElements && overflow === 'hidden') {
		return false
	}

	return overflow !== 'visible' && overflow !== 'clip'
}

const getFrameElement = (el: Element) => {
	if (!el.ownerDocument || !el.ownerDocument.defaultView) {
		return null
	}

	try {
		return el.ownerDocument.defaultView.frameElement
	} catch (e) {
		return null
	}
}

const isHiddenByFrame = (el: Element): boolean => {
	const frame = getFrameElement(el)
	if (!frame) {
		return false
	}

	return (
		frame.clientHeight < el.scrollHeight || frame.clientWidth < el.scrollWidth
	)
}

const isScrollable = (el: Element, skipOverflowHiddenElements?: boolean) => {
	if (el.clientHeight < el.scrollHeight || el.clientWidth < el.scrollWidth) {
		const style = getComputedStyle(el, null)
		return (
			canOverflow(style.overflowY, skipOverflowHiddenElements) ||
			canOverflow(style.overflowX, skipOverflowHiddenElements) ||
			isHiddenByFrame(el)
		)
	}

	return false
}

const alignNearest = (
	scrollingEdgeStart: number,
	scrollingEdgeEnd: number,
	scrollingSize: number,
	scrollingBorderStart: number,
	scrollingBorderEnd: number,
	elementEdgeStart: number,
	elementEdgeEnd: number,
	elementSize: number
) => {
	if (
		(elementEdgeStart < scrollingEdgeStart &&
			elementEdgeEnd > scrollingEdgeEnd) ||
		(elementEdgeStart > scrollingEdgeStart && elementEdgeEnd < scrollingEdgeEnd)
	) {
		return 0
	}

	if (
		(elementEdgeStart <= scrollingEdgeStart && elementSize <= scrollingSize) ||
		(elementEdgeEnd >= scrollingEdgeEnd && elementSize >= scrollingSize)
	) {
		return elementEdgeStart - scrollingEdgeStart - scrollingBorderStart
	}

	if (
		(elementEdgeEnd > scrollingEdgeEnd && elementSize < scrollingSize) ||
		(elementEdgeStart < scrollingEdgeStart && elementSize > scrollingSize)
	) {
		return elementEdgeEnd - scrollingEdgeEnd + scrollingBorderEnd
	}

	return 0
}

const getParentElement = (element: Node): Element | null => {
	const parent = element.parentElement
	if (parent == null) {
		return (element.getRootNode() as ShadowRoot).host || null
	}
	return parent
}

/** @public */
export const compute = (target: Element, options: Options): ScrollAction[] => {
	if (typeof document === 'undefined') {
		// If there's no DOM we assume it's not in a browser environment
		return []
	}

	const { scrollMode, block, inline, boundary, skipOverflowHiddenElements } =
		options
	const checkBoundary =
		typeof boundary === 'function' ? boundary : (node: any) => node !== boundary

	if (!isElement(target)) {
		throw new TypeError('Invalid target')
	}

	// Used to handle the top most element that can be scrolled
	const scrollingElement = document.scrollingElement || document.documentElement

	// Collect all the scrolling boxes, as defined in the spec: https://drafts.csswg.org/cssom-view/#scrolling-box
	const frames: Element[] = []
	let cursor: Element | null = target
	while (isElement(cursor) && checkBoundary(cursor)) {
		// Move cursor to parent
		cursor = getParentElement(cursor)

		// Stop when we reach the viewport
		if (cursor === scrollingElement) {
			frames.push(cursor)
			break
		}

		// Skip document.body if it's not the scrollingElement and documentElement isn't independently scrollable
		if (
			cursor != null &&
			cursor === document.body &&
			isScrollable(cursor) &&
			!isScrollable(document.documentElement)
		) {
			continue
		}

		// Now we check if the element is scrollable, this code only runs if the loop haven't already hit the viewport
		// or a custom boundary
		if (cursor != null && isScrollable(cursor, skipOverflowHiddenElements)) {
			frames.push(cursor)
		}
	}

	const viewportWidth = window.visualViewport?.width ?? innerWidth
	const viewportHeight = window.visualViewport?.height ?? innerHeight
	const { scrollX, scrollY } = window

	const {
		height: targetHeight,
		width: targetWidth,
		top: targetTop,
		right: targetRight,
		bottom: targetBottom,
		left: targetLeft,
	} = target.getBoundingClientRect()

	// These values mutate as we loop through and generate scroll coordinates
	let targetBlock: number =
		block === 'start' || block === 'nearest'
			? targetTop
			: block === 'end'
				? targetBottom
				: targetTop + targetHeight / 2 // block === 'center
	let targetInline: number =
		inline === 'center'
			? targetLeft + targetWidth / 2
			: inline === 'end'
				? targetRight
				: targetLeft // inline === 'start || inline === 'nearest

	// Collect new scroll positions
	const computations: ScrollAction[] = []
	for (let index = 0; index < frames.length; index++) {
		const frame = frames[index]

		// @TODO add a shouldScroll hook here that allows userland code to take control

		const { height, width, top, right, bottom, left } =
			frame.getBoundingClientRect()

		// If the element is already visible we can end it here
		// @TODO targetBlock and targetInline should be taken into account to be compliant with
		// https://github.com/w3c/csswg-drafts/pull/1805/files#diff-3c17f0e43c20f8ecf89419d49e7ef5e0R1333
		if (
			scrollMode === 'if-needed' &&
			targetTop >= 0 &&
			targetLeft >= 0 &&
			targetBottom <= viewportHeight &&
			targetRight <= viewportWidth &&
			targetTop >= top &&
			targetBottom <= bottom &&
			targetLeft >= left &&
			targetRight <= right
		) {
			// Break the loop and return the computations for things that are not fully visible
			return computations
		}

		const frameStyle = getComputedStyle(frame)
		const borderLeft = parseInt(frameStyle.borderLeftWidth as string, 10)
		const borderTop = parseInt(frameStyle.borderTopWidth as string, 10)
		const borderRight = parseInt(frameStyle.borderRightWidth as string, 10)
		const borderBottom = parseInt(frameStyle.borderBottomWidth as string, 10)

		let blockScroll: number = 0
		let inlineScroll: number = 0

		// The property existance checks for offfset[Width|Height] is because only HTMLElement objects have them, but
		// any Element might pass by here @TODO find out if the "as HTMLElement" overrides can be dropped
		const scrollbarWidth =
			'offsetWidth' in frame
				? (frame as HTMLElement).offsetWidth -
				(frame as HTMLElement).clientWidth -
				borderLeft -
				borderRight
				: 0
		const scrollbarHeight =
			'offsetHeight' in frame
				? (frame as HTMLElement).offsetHeight -
				(frame as HTMLElement).clientHeight -
				borderTop -
				borderBottom
				: 0

		const scaleX =
			'offsetWidth' in frame
				? (frame as HTMLElement).offsetWidth === 0
					? 0
					: width / (frame as HTMLElement).offsetWidth
				: 0
		const scaleY =
			'offsetHeight' in frame
				? (frame as HTMLElement).offsetHeight === 0
					? 0
					: height / (frame as HTMLElement).offsetHeight
				: 0

		if (scrollingElement === frame) {
			// Handle viewport logic (document.documentElement or document.body)

			if (block === 'start') {
				blockScroll = targetBlock
			} else if (block === 'end') {
				blockScroll = targetBlock - viewportHeight
			} else if (block === 'nearest') {
				blockScroll = alignNearest(
					scrollY,
					scrollY + viewportHeight,
					viewportHeight,
					borderTop,
					borderBottom,
					scrollY + targetBlock,
					scrollY + targetBlock + targetHeight,
					targetHeight
				)
			} else {
				// block === 'center' is the default
				blockScroll = targetBlock - viewportHeight / 2
			}

			if (inline === 'start') {
				inlineScroll = targetInline
			} else if (inline === 'center') {
				inlineScroll = targetInline - viewportWidth / 2
			} else if (inline === 'end') {
				inlineScroll = targetInline - viewportWidth
			} else {
				// inline === 'nearest' is the default
				inlineScroll = alignNearest(
					scrollX,
					scrollX + viewportWidth,
					viewportWidth,
					borderLeft,
					borderRight,
					scrollX + targetInline,
					scrollX + targetInline + targetWidth,
					targetWidth
				)
			}

			// Apply scroll position offsets and ensure they are within bounds
			// @TODO add more test cases to cover this 100%
			blockScroll = Math.max(0, blockScroll + scrollY)
			inlineScroll = Math.max(0, inlineScroll + scrollX)
		} else {
			// Handle each scrolling frame that might exist between the target and the viewport
			if (block === 'start') {
				blockScroll = targetBlock - top - borderTop
			} else if (block === 'end') {
				blockScroll = targetBlock - bottom + borderBottom + scrollbarHeight
			} else if (block === 'nearest') {
				blockScroll = alignNearest(
					top,
					bottom,
					height,
					borderTop,
					borderBottom + scrollbarHeight,
					targetBlock,
					targetBlock + targetHeight,
					targetHeight
				)
			} else {
				// block === 'center' is the default
				blockScroll = targetBlock - (top + height / 2) + scrollbarHeight / 2
			}

			if (inline === 'start') {
				inlineScroll = targetInline - left - borderLeft
			} else if (inline === 'center') {
				inlineScroll = targetInline - (left + width / 2) + scrollbarWidth / 2
			} else if (inline === 'end') {
				inlineScroll = targetInline - right + borderRight + scrollbarWidth
			} else {
				// inline === 'nearest' is the default
				inlineScroll = alignNearest(
					left,
					right,
					width,
					borderLeft,
					borderRight + scrollbarWidth,
					targetInline,
					targetInline + targetWidth,
					targetWidth
				)
			}

			const { scrollLeft, scrollTop } = frame
			// Ensure scroll coordinates are not out of bounds while applying scroll offsets
			blockScroll = Math.max(
				0,
				Math.min(
					scrollTop + blockScroll / scaleY,
					frame.scrollHeight - height / scaleY + scrollbarHeight
				)
			)
			inlineScroll = Math.max(
				0,
				Math.min(
					scrollLeft + inlineScroll / scaleX,
					frame.scrollWidth - width / scaleX + scrollbarWidth
				)
			)

			// Cache the offset so that parent frames can scroll this into view correctly
			targetBlock += scrollTop - blockScroll
			targetInline += scrollLeft - inlineScroll
		}

		computations.push({ el: frame, top: blockScroll, left: inlineScroll })
	}

	return computations
}