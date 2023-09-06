"use client";

import {HiComputerDesktop, HiMoon, HiSun} from "react-icons/hi2";
import React, {ComponentProps, FC, useContext} from "react";
import {twMerge} from "tailwind-merge";
import {mergeDeep} from "@/helpers/merge-deep";
import {DeepPartial, PopoverComponent, useTheme} from '../..';
import {Mode, ThemeContext} from "@/components/Flowbite/ThemeContext";

const items = [
    {name: "Light", icon: HiSun},
    {name: "Dark", icon: HiMoon},
    {name: "System", icon: HiComputerDesktop},
];

export interface SwitcherTheme {
    root: SwitcherRootTheme;
}

export interface SwitcherRootTheme {
    base: string;
    icon: string;
}

export interface ThemeSwitcherProps extends ComponentProps<'button'> {
    theme?: DeepPartial<SwitcherTheme>;
    themes?: string[];
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({className, theme: customTheme = {}, ...props}) => {
    const theme = mergeDeep(useTheme().theme.switcher, customTheme);
    const {mode, toggleMode, isDark} = useContext(ThemeContext);

    return (
        <PopoverComponent
            handler={
                <button className={twMerge(theme.root.base, className)}>
                    {
                        isDark ?
                            <HiSun className={theme.root.icon}/> :
                            <HiMoon className={theme.root.icon}/>
                    }
                </button>
            }
            animate={{
                mount: {
                    y: 0, scale: 1, opacity: 1, transition: {
                        type: "spring",
                        bounce: 0.3,
                        duration: 0.7,
                    }
                },
                unmount: {
                    y: -100, scale: 0, opacity: 0, transition: {
                        type: "spring",
                        bounce: 0,
                        duration: 0.4
                    }
                },
            }}
            offset={16}
            className={"w-full max-w-[164px] bg-white space-y-1.5 dark:bg-gray-800 dark:border-gray-700 p-2 flex-auto overflow-hidden text-sm shadow-lg"}
        >
            {items.map((item) => (
                <div key={item.name}
                     className={
                         twMerge(
                             mode === item.name.toLowerCase() as Mode && "bg-gray-200 dark:bg-gray-500/70",
                             "group text-gray-500 dark:text-gray-400 relative",
                             " flex gap-x-4 px-2.5 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600")}>
                    <div
                        className={
                            twMerge("mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-gray-100",
                                "dark:bg-gray-700 group-hover:bg-white group-hover:dark:bg-gray-800/50")}>
                        <item.icon className={
                            twMerge(
                                "w-6 h-6",
                                mode === item.name.toLowerCase() as Mode && "text-gray-600 dark:text-gray-300",
                                "font-semibold group-hover:text-gray-600 group-hover:dark:text-gray-300"
                            )
                        } aria-hidden="true"/>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={() =>
                                toggleMode ? toggleMode(item.name.toLowerCase() as Mode) : null
                            }
                            className={twMerge(
                                mode === item.name.toLowerCase() as Mode && "text-gray-900 dark:text-gray-100",
                                "font-semibold group-hover:text-gray-700 group-hover:dark:text-gray-200"
                            )}>
                            {item.name}
                            <span className="absolute inset-0"/>
                        </button>
                    </div>
                </div>
            ))}
        </PopoverComponent>
    )
};


export default ThemeSwitcher;
