"use client"

import type {ComponentProps, FC, PropsWithChildren, ReactNode} from 'react';
import React, {useState} from "react";
import {Popover, PopoverContent, PopoverHandler,} from "@material-tailwind/react";
import {DeepPartial, useTheme} from "@/components";
import {twMerge} from "tailwind-merge";
import {mergeDeep} from "@/helpers/merge-deep";
import type {Placement} from "@floating-ui/core";
import {animation} from "@material-tailwind/react/types/generic";
import {PopoverContext} from "@/components/Popover/PopoverContext";

export interface PopoverTheme {
    root: PopoverRootTheme;
    overlay: string;
}

export interface PopoverRootTheme {
    base: string;
}

export interface PopoverProps extends PropsWithChildren, ComponentProps<'div'> {
    theme?: DeepPartial<PopoverTheme>;
    overlay?: boolean;
    handler: ReactNode;
    placement?: Placement
    offset?: number;
    animate?: animation
    hover?: boolean
}

export const PopoverComponent: FC<PopoverProps> = ({
                                                       theme: customTheme = {},
                                                       overlay = false,
                                                       handler,
                                                       className,
                                                       children,
                                                       placement = 'bottom',
                                                       offset = 0,
                                                       hover = false,
                                                       animate,
                                                       ...props
                                                   }) => {
    const theme = mergeDeep(useTheme().theme.popover, customTheme);
    const [openPopover, setOpenPopover] = useState(false);
    const triggers = hover && {
        onMouseEnter: () => setOpenPopover(true),
        onMouseLeave: () => setOpenPopover(false),
    };

    return (
        <PopoverContext.Provider value={{isOpen: openPopover, setIsOpen: setOpenPopover}}>
            {overlay && <div
                className={twMerge(openPopover && theme.overlay)}/>}
            <Popover animate={animate} open={openPopover} handler={setOpenPopover} placement={placement}
                     offset={offset} {...props}>
                <PopoverHandler {...triggers}>
                    {/*<Button variant="text" className={'hover:text-gray-900 border-none ring-0'}>{content.title}</Button>*/}
                    {handler}
                </PopoverHandler>
                <PopoverContent {...triggers}
                                className={twMerge(theme.root.base, className)}

                >
                    {children}
                </PopoverContent>
            </Popover>
        </PopoverContext.Provider>
    );
}