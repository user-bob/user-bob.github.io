import React, { useCallback, useRef, useState } from "react";

export default function useDrag() {
	const [clicked, setClicked] = useState(false);
	const [dragging, setDragging] = useState(false);
	const position = useRef(0);

	const dragStart = useCallback((ev: React.MouseEvent) => {
		position.current = ev.clientX;
		setClicked(true);
	}, []);

	const dragStop = useCallback(
		() =>
			// NOTE: need some delay so item under cursor won't be clicked
			window.requestAnimationFrame(() => {
				setDragging(false);
				setClicked(false);
			}),
		[]
	);

	const dragMove = (ev: React.MouseEvent, cb: (posDif: number) => void) => {
		const newDiff = position.current - ev.clientX;

		const movedEnough = Math.abs(newDiff) > 5;

		if (clicked && movedEnough) {
			setDragging(true);
		}

		if (dragging && movedEnough) {
			position.current = ev.clientX;
			cb(newDiff);
		}
	};

	return {
		dragStart,
		dragStop,
		dragMove,
		dragging,
		position,
		setDragging
	};
}
