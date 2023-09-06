import React, {
  FC,
  MouseEventHandler,
  MutableRefObject,
  ReactNode,
  TouchEventHandler,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "./styles.css";

import ItemsMap from "./ItemsMap";
import MenuItems from "./components/MenuItems";
import ScrollContainer from "./components/ScrollContainer";
import createApi, { publicApiType } from "./createApi";
import useIntersectionObserver from "./hooks/useIntersectionObserver";
import useItemsChanged from "./hooks/useItemsChanged";
import { observerOptions as defaultObserverOptions } from "./settings";

import * as constants from "./constants";

import useOnInitCb from "./hooks/useOnInitCb";
import useOnUpdate from "./hooks/useOnUpdate";

import { VisibilityContext } from "./context";

import { getElementOrConstructor } from "./helpers";
import type { ItemType, Refs } from "./types";

import { useTheme } from "@/components";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import getItemsPos from "./getItemsPos";
import slidingWindow from "./slidingWindow";

type ComponentType = ReactNode | JSX.Element | FC;

export interface Props {
  Header?: ComponentType;
  Footer?: ComponentType;
  children: ItemType;
  transitionDuration?: number;
  transitionEase?: (t: number) => number;
  transitionBehavior?: string | Function;
  onInit?: (api: publicApiType) => void;
  onUpdate?: (api: publicApiType) => void;
  onScroll?: (api: publicApiType, ev: React.UIEvent) => void;
  onWheel?: (api: publicApiType, ev: React.WheelEvent) => void;
  options?: Partial<typeof defaultObserverOptions>;
  onMouseDown?: (arg0: publicApiType) => MouseEventHandler;
  onMouseUp?: (arg0: publicApiType) => MouseEventHandler;
  onMouseMove?: (arg0: publicApiType) => MouseEventHandler;
  onTouchMove?: (arg0: publicApiType) => TouchEventHandler;
  onTouchStart?: (arg0: publicApiType) => TouchEventHandler;
  onTouchEnd?: (arg0: publicApiType) => TouchEventHandler;
  /**
     For add custom className for item
	 */
  itemClassName?: string;
  separatorClassName?: string;
  scrollContainerClassName?: string;
  wrapperClassName?: string;
  apiRef?: MutableRefObject<publicApiType>;
  RTL?: boolean;
  noPolyfill?: boolean;
}

function ScrollMenu({
  children,
  Header: _Header,
  Footer: _Footer,
  transitionDuration = 500,
  transitionEase,
  transitionBehavior,
  onInit = (): void => void 0,
  onUpdate = (): void => void 0,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  onScroll = (): void => void 0,
  onTouchMove,
  onTouchStart,
  onTouchEnd,
  onWheel = (): void => void 0,
  options = defaultObserverOptions,
  scrollContainerClassName = "",
  itemClassName = "",
  separatorClassName = "",
  wrapperClassName = "",
  apiRef = { current: {} as publicApiType },
  RTL,
  noPolyfill,
}: Props): JSX.Element {
  // const LeftArrow = getElementOrConstructor(_LeftArrow);
  // const RightArrow = getElementOrConstructor(_RightArrow);
  const Header = getElementOrConstructor(_Header);
  const Footer = getElementOrConstructor(_Footer);

  const scrollContainerRef = useRef(null);
  const [menuItemsRefs] = useState<Refs>({});

  const observerOptions = useMemo(
    () => ({
      ...defaultObserverOptions,
      ...options,
      root: scrollContainerRef.current,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options, scrollContainerRef.current],
  );

  const items = useRef(new ItemsMap()).current;

  // NOTE: hack for detect when items added/removed dynamicaly
  const itemsChanged = useItemsChanged(children, items);

  const { visibleElementsWithSeparators } = useIntersectionObserver({
    items,
    itemsChanged,
    options: observerOptions,
    refs: menuItemsRefs,
  });
  const mounted = !!visibleElementsWithSeparators.length;

  const api = useMemo(
    () =>
      createApi(
        items,
        visibleElementsWithSeparators,
        scrollContainerRef,
        {
          duration: transitionDuration,
          ease: transitionEase,
          behavior: transitionBehavior!,
        },
        RTL,
        noPolyfill,
      ),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, visibleElementsWithSeparators, itemsChanged, RTL, noPolyfill],
  );

  const getContext = useCallback(
    () => ({
      ...api,
      initComplete: mounted,
      items,
      visibleElementsWithSeparators,
      scrollContainer: scrollContainerRef,
    }),
    [api, mounted, items, visibleElementsWithSeparators, scrollContainerRef],
  );

  const [context, setContext] = useState<publicApiType>(getContext);

  const onInitCbFired = useOnInitCb({
    cb: () => onInit(context),
    condition: mounted,
  });

  useOnUpdate({
    cb: () => onUpdate(context),
    condition: onInitCbFired,
    hash: JSON.stringify(
      visibleElementsWithSeparators
        .concat(String(context?.isFirstItemVisible))
        .concat(String(context?.isLastItemVisible)),
    ),
  });

  useEffect(() => setContext(getContext()), [getContext]);

  apiRef.current = context;

  const scrollHandler = useCallback(
    (event: React.UIEvent) => onScroll(context, event),
    [onScroll, context],
  );

  const onWheelHandler = useCallback(
    (event: React.WheelEvent) => onWheel(context, event),
    [onWheel, context],
  );

  const wrapperClass: string = useMemo(
    () => `flex flex-col ${wrapperClassName}`,
    [wrapperClassName],
  );

  const containerClassName = useMemo(
    () => `${scrollContainerClassName}${RTL ? " rtl" : ""}`,
    [RTL, scrollContainerClassName],
  );
  return (
    <div
      className={wrapperClass}
      onWheel={onWheelHandler}
      onMouseDown={onMouseDown?.(context)}
      onMouseUp={onMouseUp?.(context)}
      onMouseMove={onMouseMove?.(context)}
      onTouchStart={onTouchStart?.(context)}
      onTouchMove={onTouchMove?.(context)}
      onTouchEnd={onTouchEnd?.(context)}
    >
      <VisibilityContext.Provider value={context}>
        <div className={"w-full"}>{Header}</div>
        <div className={"relative h-full w-full px-5"}>
          <ScrollContainer
            className={twMerge(containerClassName)}
            onScroll={scrollHandler}
            scrollRef={scrollContainerRef}
          >
            <MenuItems
              refs={menuItemsRefs}
              itemClassName={itemClassName}
              separatorClassName={separatorClassName}
            >
              {children}
            </MenuItems>
          </ScrollContainer>
          <>
            <div
              className={
                "absolute top-1/2 left-0 z-50 flex items-center justify-center focus:outline-none"
              }
            >
              <DefaultLeftControl />
            </div>
            <div
              className={
                "absolute top-1/2 right-0 z-50 flex items-center justify-center focus:outline-none"
              }
            >
              <DefaultRightControl />
            </div>
          </>
        </div>
        <div className={"w-full"}>{Footer}</div>
      </VisibilityContext.Provider>
    </div>
  );
}

interface ControlsProps {
  children: ReactNode;
  left?: boolean;
}

const Controls: FC<ControlsProps> = ({ children, left }) => {
  const {
    items,
    visibleItems,
    getItemById,
    isFirstItemVisible,
    isLastItemVisible,
    scrollToItem,
    visibleElements,
    initComplete,
  } = useContext(VisibilityContext);
  const [disabledLeft, setDisabledLeft] = useState(
    !initComplete || (initComplete && isFirstItemVisible),
  );
  const [disabledRight, setDisabledRight] = useState(!visibleElements.length && isLastItemVisible);
  useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleElements.length) {
      setDisabledLeft(isFirstItemVisible);
      setDisabledRight(isLastItemVisible);
    }
  }, [isFirstItemVisible, isLastItemVisible, visibleElements]);

  const prevGroupItems = slidingWindow(items.toItemsKeys(), visibleItems).prev();

  const nextGroupItems = slidingWindow(items.toItemsKeys(), visibleItems).next();

  const { center } = getItemsPos(left ? prevGroupItems : nextGroupItems);
  const scrollCentered = () => scrollToItem(getItemById(center), "smooth", "center");

  return (
    <button
      disabled={left ? disabledLeft : disabledRight}
      onClick={scrollCentered}
      className={twMerge("group disabled:hidden disabled:cursor-not-allowed")}
    >
      {children}
    </button>
  );
};

const DefaultLeftControl: FC = () => {
  const theme = useTheme().theme.carousel;
  return (
    <Controls left>
      <span
        className={twMerge(
          "inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500/50",
          " group-hover:bg-gray-500/70 group-focus:outline-none group-focus:ring-4 group-focus:ring-white",
          " dark:bg-gray-800/50 dark:group-hover:bg-gray-800/70 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
        )}
      >
        <HiOutlineChevronLeft strokeWidth={3} className={theme.control.icon} />
      </span>
    </Controls>
  );
};

const DefaultRightControl: FC = () => {
  const theme = useTheme().theme.carousel;
  return (
    <Controls>
      <span
        className={twMerge(
          "inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500/50",
          " group-hover:bg-gray-500/70 group-focus:outline-none group-focus:ring-4 group-focus:ring-white",
          " dark:bg-gray-800/50 dark:group-hover:bg-gray-800/70 dark:group-focus:ring-gray-800/80 sm:h-10 sm:w-10",
        )}
      >
        <HiOutlineChevronRight strokeWidth={3} className={theme.control.icon} />
      </span>
    </Controls>
  );
};

export { ScrollMenu, VisibilityContext, constants, getItemsPos, slidingWindow };
