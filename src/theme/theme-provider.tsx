import React, {createContext, useContext, useEffect, useState} from 'react'
import {Inter} from "@next/font/google";
import classNames from "@/utils/class-names";

type ThemeContextProps = {
    dark: boolean
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextProps>({
    dark: false,
    toggleTheme: () => {
    },
})

type ThemeProviderProps = {
    children: React.ReactNode
}

const inter = Inter({subsets: ['latin'], variable: '--font-inter'})
export const ThemeProvider = ({children}: ThemeProviderProps) => {
    const [theme, setTheme] = useState('light')
    const [dark, setDarkTheme] = useState(theme === 'dark')
    useEffect(() => {
        const localTheme = window.localStorage.getItem('color-theme')
        if (localTheme) {
            setTheme(localTheme)
            setDarkTheme(localTheme === 'dark')
        } else {
            setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            setDarkTheme(window.matchMedia('(prefers-color-scheme: dark)').matches)
        }
    }
    , [dark])

    const toggleTheme = () => {
        setDarkTheme(!dark)
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark')
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('color-theme', 'light');
        }
    }

    return (
        <ThemeContext.Provider value={{dark, toggleTheme}}>
            <div className={classNames(dark ? 'dark' : '', inter.variable, 'font-sans')}>
            {children}
            </div>
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const {dark, toggleTheme} = useContext(ThemeContext)
    return {dark, toggleTheme}
}