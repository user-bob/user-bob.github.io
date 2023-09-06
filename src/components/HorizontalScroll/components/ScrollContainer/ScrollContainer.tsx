import React, { ReactNode, Ref, useMemo } from 'react';

export type Props = {
	className?: string;
	children?: ReactNode;
	onScroll?: (event: React.UIEvent) => void;
	scrollRef: Ref<HTMLDivElement>;
};

// TODO: pass initialPosition ??
function ScrollContainer({
	                         className: _className = '',
	                         children,
	                         onScroll = () => void 0,
	                         scrollRef,
                         }: Props) {
	const scrollContainerClass = useMemo(
		() => `flex h-max relative overflow-hidden w-full ${_className}`,
		[_className]
	);

	return (
		<div className={scrollContainerClass} onScroll={onScroll} ref={scrollRef}>
			{children}
		</div>
	);
}

export default ScrollContainer;
