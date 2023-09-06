import {createContext, useContext} from "react";

interface OneTapContext {
    showOneTap: boolean;
    setShowOneTap?: (show: boolean) => void;
}

export const OneTapContext = createContext<OneTapContext>({
    showOneTap: false,
});

export function useOneTapContext() {
    const context = useContext(OneTapContext);
    if (!context) {
        throw new Error('useOneTapContext should be used within the NavbarContext provider!');
    }
    return context;
}