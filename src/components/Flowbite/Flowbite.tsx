import type {FC, HTMLAttributes, ReactNode} from 'react';
import {useEffect, useMemo} from 'react';
import {Mode, ThemeContext, useTheme, useThemeMode} from './ThemeContext';

import type {DeepPartial} from '../..';
import {theme as defaultTheme} from '../..';
import type {FlowbiteTheme} from './FlowbiteTheme';
import {mergeDeep} from '@/helpers/merge-deep';

export interface ThemeProps {
    initialMode?: Mode;
    theme?: DeepPartial<FlowbiteTheme>;
}

interface FlowbiteProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    theme?: ThemeProps;
}

export const Flowbite: FC<FlowbiteProps> = ({children, theme = {}}) => {
    const {theme: customTheme = {}, initialMode} = theme;
    const [mode, setMode, toggleMode, isDark] = useThemeMode();

    const mergedTheme = mergeDeep(defaultTheme, customTheme);

    const handleClassList = (mode: Mode) => {
        const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
        if (mode === 'dark' || (mode === 'system' && darkQuery.matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    useEffect(() => {
        if (initialMode) {
            setMode(initialMode);
            handleClassList(initialMode);
        }
    }, [initialMode, setMode, toggleMode]);

    const themeContextValue = useMemo(
        () => ({
            theme: mergedTheme,
            mode,
            toggleMode,
            isDark,
        }),
        [mode, toggleMode, mergedTheme, isDark],
    );

    return <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>;
};

Flowbite.displayName = 'Flowbite';

export type {
    CustomFlowbiteTheme,
    FlowbiteBoolean,
    FlowbiteColors,
    FlowbiteContentPositions,
    FlowbiteGradientColors,
    FlowbiteGradientDuoToneColors,
    FlowbiteHeadingLevel,
    FlowbitePositions,
    FlowbiteSizes,
    FlowbiteStateColors,
    FlowbiteTheme,
} from './FlowbiteTheme';
export {useTheme, useThemeMode};
