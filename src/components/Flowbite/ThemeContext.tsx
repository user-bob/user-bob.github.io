import type {Dispatch, FC, ReactNode, SetStateAction} from 'react';
import {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {isClient} from '@/helpers/is-client';
import {theme} from '@/theme';
import type {FlowbiteTheme} from '@/components';

export type Mode = 'light' | 'dark' | 'system';

const storageKey: string = "color-theme";

export interface ThemeContextProps {
    mode?: Mode;
    theme: FlowbiteTheme;
    toggleMode?: (mode: Mode) => void | null;
    isDark?: boolean;
}

export const ThemeContext = createContext<ThemeContextProps>({
    theme,
});

interface ThemeProviderProps {
    children: ReactNode;
    value: ThemeContextProps;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({children, value}) => {
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme: () => ThemeContextProps = () => {
    return useContext(ThemeContext);
};

const prefersColorScheme: () => Mode = () => {
    if (!isClient()) {
        return 'system';
    }
    const localMode = window.localStorage.getItem(storageKey) as Mode;
    return localMode || 'system';
};

const initIsDark: () => boolean = () => {
    if (prefersColorScheme() === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return prefersColorScheme() === 'dark';
}

export const useThemeMode: () => [Mode, Dispatch<SetStateAction<Mode>>, (mode: Mode) => void, boolean] = () => {
    const onToggleMode = (newMode: Mode) => {
        setModeOnBody(newMode);
        handleLocalStorage(newMode);
        setMode(newMode);
    };

    const handleLocalStorage = useCallback((newMode: Mode) => {
            if (!isClient()) {
                return;
            }
            if (newMode === 'system') {
                window.localStorage.removeItem(storageKey);
            } else {
                window.localStorage.setItem(storageKey, newMode);
            }
        }
        , []);

    const setModeOnBody = useCallback((mode: Mode) => {
        if (!isClient()) {
            return;
        }
        const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
        if (mode === 'dark' || (mode === 'system' && darkQuery.matches)) {
            document.documentElement.classList.add('dark');
            setIsDark(true)
        } else {
            document.documentElement.classList.remove('dark');
            setIsDark(false)
        }
    }, []);

    const systemChangeListener = useCallback((mode: Mode) => {
        if (!isClient()) {
            return;
        }
        const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
        if (mode === 'system') {
            darkQuery.addEventListener('change', (e) => {
                setIsDark(e.matches)
                if (e.matches) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            })
        }
    }, []);

    const {mode: initialMode, toggleMode = onToggleMode} = useContext(ThemeContext);
    const [mode, setMode] = useState<Mode>('light');
    const [isDark, setIsDark] = useState(initIsDark);

    useEffect(() => {
        const currentMode = initialMode || prefersColorScheme();

        setMode(currentMode);
        setModeOnBody(currentMode);
        if (currentMode === 'system') {
            systemChangeListener(currentMode);
        }

    }, [initialMode, setModeOnBody, setMode, handleLocalStorage, mode, systemChangeListener]);


    return [mode, setMode, toggleMode, isDark];

};
