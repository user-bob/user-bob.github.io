"use client";

import { useRouter } from "next/navigation";
import React, {
  Children,
  cloneElement,
  ComponentProps,
  ContextType,
  FC,
  PropsWithChildren,
  ReactElement,
  useMemo,
  useState,
} from "react";
import { getItemsPos, ScrollMenu, slidingWindow, VisibilityContext } from "../HorizontalScroll";

import { twMerge } from "tailwind-merge";
import useDrag from "./useDrag";

type scrollVisibilityApiType = ContextType<typeof VisibilityContext>;

export const HScrollComponent: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const { dragStart, dragStop, dragMove, dragging } = useDrag();

  const items = useMemo(
    () =>
      Children.map(children as ReactElement[], (child: ReactElement) =>
        cloneElement(child, {
          onMouseDown: (ev: React.MouseEvent) => {
            ev.preventDefault();
          },
        }),
      ),
    [children],
  );

  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  const [selected, setSelected] = useState<number>();
  const handleItemClick = (index: number) => {
    if (dragging) return false;
    setSelected(index);
    router.push(items[index].props.href);
  };

  return (
    <>
      <div className="w-full overflow-x-scroll" style={{ paddingTop: "100px" }}>
        <div onMouseLeave={dragStop}>
          <ScrollMenu
            Header={() => (
              <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full">
                Header
              </div>
            )}
            onWheel={onWheel}
            onMouseDown={() => dragStart}
            onMouseUp={({ getItemById, scrollToItem, visibleItems }: scrollVisibilityApiType) =>
              () => {
                dragStop();
                const { center } = getItemsPos(visibleItems);
                scrollToItem(getItemById(center), "smooth", "center");
              }}
            options={{ throttle: 0 }} // NOTE: for center items
            onMouseMove={handleDrag}
            scrollContainerClassName={"flex space-x-2"}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className={twMerge(
                  "flex-shrink-0 flex items-center justify-center rounded-md select-none",
                  selected === index && "border-2 border-blue-500",
                  item.props.href && "hover:cursor-pointer",
                )}
                tabIndex={0}
                onClick={() => handleItemClick(index)}
              >
                {item}
              </div>
            ))}
          </ScrollMenu>
        </div>
      </div>
    </>
  );
};

interface HScrollItemProps extends PropsWithChildren<ComponentProps<"div">> {
  href?: string;
}

export const HScrollItem: FC<HScrollItemProps> = ({ children, href, className, ...props }) => {
  return (
    <div {...props} className={twMerge(className)}>
      {children}
    </div>
  );
};

function onWheel(
  { getItemById, items, visibleItems, scrollToItem }: scrollVisibilityApiType,
  ev: React.WheelEvent,
): void {
  const isTouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isTouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    // NOTE: for center items
    const nextGroupItems = slidingWindow(items.toItemsKeys(), visibleItems).next();
    const { center } = getItemsPos(nextGroupItems);
    scrollToItem(getItemById(center), "smooth", "center");
  } else if (ev.deltaY > 0) {
    const prevGroupItems = slidingWindow(items.toItemsKeys(), visibleItems).prev();
    const { center } = getItemsPos(prevGroupItems);
    scrollToItem(getItemById(center), "smooth", "center");
  }
}

export const HScroll = Object.assign(HScrollComponent, {
  Item: HScrollItem,
});
