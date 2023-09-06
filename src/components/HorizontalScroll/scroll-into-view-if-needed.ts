import { compute } from './compute-scroll-into-view'
import type {
	Options as BaseOptions,
	ScrollAction,
} from './compute-scroll-into-view'

/** @public */
export type Options<T = unknown> =
	| StandardBehaviorOptions
	| CustomBehaviorOptions<T>


export interface StandardBehaviorOptions extends BaseOptions {
	behavior?: ScrollBehavior
}

export interface CustomBehaviorOptions<T = unknown> extends BaseOptions {
	behavior: CustomScrollBehaviorCallback<T>
}

/** @public */
export type CustomScrollBehaviorCallback<T = unknown> = (
	actions: ScrollAction[]
) => T

const isStandardScrollBehavior = (
	options: any
): options is StandardBehaviorOptions =>
	options === Object(options) && Object.keys(options).length !== 0

const isCustomScrollBehavior = <T = unknown>(
	options: any
): options is CustomBehaviorOptions<T> =>
	typeof options === 'object' ? typeof options.behavior === 'function' : false

const getOptions = (options: any): StandardBehaviorOptions => {
	// Handle alignToTop for legacy reasons, to be compatible with the spec
	if (options === false) {
		return { block: 'end', inline: 'nearest' }
	}

	if (isStandardScrollBehavior(options)) {
		// compute.ts ensures the defaults are block: 'center' and inline: 'nearest', to conform to the spec
		return options
	}

	// if options = {}, options = true or options = null, based on w3c web platform test
	return { block: 'start', inline: 'nearest' }
}

const isInDocument = (element: Node) => {
	let currentElement = element
	while (currentElement && currentElement.parentNode) {
		if (currentElement.parentNode === document) {
			return true
		} else if (currentElement.parentNode instanceof ShadowRoot) {
			currentElement = (currentElement.parentNode as ShadowRoot).host
		} else {
			currentElement = currentElement.parentNode
		}
	}
	return false
}


function scrollIntoView(
	target: Element,
	options?: StandardBehaviorOptions | boolean
): void
function scrollIntoView<T>(
	target: Element,
	options: CustomBehaviorOptions<T>
): T
function scrollIntoView<T = unknown>(
	target: Element,
	options?: StandardBehaviorOptions | CustomBehaviorOptions<T> | boolean
): T | void {
	// Browsers treats targets that aren't in the dom as a no-op and so should we
	if (!target.isConnected || !isInDocument(target)) {
		return
	}

	if (isCustomScrollBehavior<T>(options)) {
		return options.behavior(compute(target, options))
	}

	const behavior = typeof options === 'boolean' ? undefined : options?.behavior

	for (const { el, top, left } of compute(target, getOptions(options))) {
		el.scroll({ top, left, behavior })
	}
}

export default scrollIntoView