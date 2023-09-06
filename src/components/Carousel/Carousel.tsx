import type { ComponentProps, FC, PropsWithChildren, ReactElement, ReactNode } from "react";
import { Children, cloneElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import type { DeepPartial, FlowbiteBoolean } from "../..";
import { useTheme } from "../..";

import { isClient } from "@/helpers/is-client";
import { mergeDeep } from "@/helpers/merge-deep";
import ScrollContainer from "react-indiana-drag-scroll";
import { twMerge } from "tailwind-merge";

export interface FlowbiteCarouselTheme {
  root: FlowbiteCarouselRootTheme;
  indicators: FlowbiteCarouselIndicatorsTheme;
  item: FlowbiteCarouselItemTheme;
  control: FlowbiteCarouselControlTheme;
  scrollContainer: FlowbiteCarouselScrollContainer;
}

export interface FlowbiteCarouselRootTheme {
  base: string;
  leftControl: string;
  rightControl: string;
}

export interface FlowbiteCarouselIndicatorsTheme {
  active: FlowbiteBoolean;
  base: string;
  wrapper: string;
}

export interface FlowbiteCarouselItemTheme {
  base: string;
  wrapper: string;
}

export interface FlowbiteCarouselControlTheme {
  base: string;
  icon: string;
}

export interface FlowbiteCarouselScrollContainer {
  base: string;
  snap: string;
}

export interface CarouselProps extends PropsWithChildren<ComponentProps<"div">> {
  indicators?: boolean;
  leftControl?: ReactNode;
  rightControl?: ReactNode;
  slide?: boolean;
  slideInterval?: number;
  theme?: DeepPartial<FlowbiteCarouselTheme>;
  onSlideChange?: (slideIdx: number) => void;
}

export const Carousel: FC<CarouselProps> = ({
  children,
  indicators = true,
  leftControl,
  rightControl,
  slide = true,
  slideInterval,
  className,
  theme: customTheme = {},
  onSlideChange,
  ...props
}) => {
  const theme = mergeDeep(useTheme().theme.carousel, customTheme);

  const isDeviceMobile = isClient() && navigator.userAgent.indexOf("IEMobile") !== -1;
  const carouselContainer = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const items = useMemo(
    () =>
      Children.map(children as ReactElement[], (child: ReactElement) =>
        cloneElement(child, {
          className: twMerge(theme.item.base, child.props.className),
        }),
      ),
    [children, theme.item.base],
  );

  const navigateTo = useCallback(
    (item: number) => () => {
      if (!items) return;
      item = (item + items.length) % items.length;
      if (carouselContainer.current) {
        carouselContainer.current.scrollLeft = carouselContainer.current.clientWidth * item;
      }
      onSlideChange && onSlideChange(item);
      setActiveItem(item);
    },
    [items, onSlideChange],
  );

  useEffect(() => {
    if (carouselContainer.current && !isDragging && carouselContainer.current.scrollLeft !== 0) {
      setActiveItem(
        Math.round(carouselContainer.current.scrollLeft / carouselContainer.current.clientWidth),
      );
    }
  }, [isDragging]);

  useEffect(() => {
    if (slide) {
      const intervalId = setInterval(
        () => !isDragging && navigateTo(activeItem + 1)(),
        slideInterval ?? 3000,
      );

      return () => clearInterval(intervalId);
    }
  }, [activeItem, isDragging, navigateTo, slide, slideInterval]);

  const handleDragging = (dragging: boolean) => () => setIsDragging(dragging);

  return (
    <div className={twMerge(theme.root.base, className)} data-testid="carousel" {...props}>
      <ScrollContainer
        className={twMerge(
          theme.scrollContainer.base,
          (isDeviceMobile || !isDragging) && theme.scrollContainer.snap,
        )}
        draggingClassName="cursor-grab"
        innerRef={carouselContainer}
        onEndScroll={handleDragging(false)}
        onStartScroll={handleDragging(true)}
        vertical={false}
      >
        {items?.map((item, index) => (
          <div
            key={index}
            className={theme.item.wrapper}
            data-active={activeItem === index}
            data-testid="carousel-item"
          >
            {item}
          </div>
        ))}
      </ScrollContainer>
      {indicators && (
        <div className={theme.indicators.wrapper}>
          {items?.map((_, index) => (
            <button
              key={index}
              className={twMerge(
                theme.indicators.base,
                theme.indicators.active[index === activeItem ? "on" : "off"],
              )}
              onClick={navigateTo(index)}
              data-testid="carousel-indicator"
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {items && (
        <>
          <div className={theme.root.leftControl}>
            <button
              className="group"
              data-testid="carousel-left-control"
              onClick={navigateTo(activeItem - 1)}
              type="button"
              aria-label="Previous slide"
            >
              {leftControl ? leftControl : <DefaultLeftControl />}
            </button>
          </div>
          <div className={theme.root.rightControl}>
            <button
              className="group"
              data-testid="carousel-right-control"
              onClick={navigateTo(activeItem + 1)}
              type="button"
              aria-label="Next slide"
            >
              {rightControl ? rightControl : <DefaultRightControl />}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const DefaultLeftControl: FC = () => {
  const theme = useTheme().theme.carousel;
  return (
    <span className={theme.control.base}>
      <HiOutlineChevronLeft className={theme.control.icon} />
    </span>
  );
};

const DefaultRightControl: FC = () => {
  const theme = useTheme().theme.carousel;
  return (
    <span className={theme.control.base}>
      <HiOutlineChevronRight className={theme.control.icon} />
    </span>
  );
};

Carousel.displayName = "Carousel";
