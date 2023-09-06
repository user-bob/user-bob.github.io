import {createContext, useContext} from 'react';

type PopoverContext = {
    isOpen?: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

export const PopoverContext = createContext<PopoverContext | undefined>(undefined);

export function usePopoverContext(): PopoverContext {
    const context = useContext(PopoverContext);

    if (!context) {
        throw new Error('usePopoverContext should be used within the NavbarContext provider!');
    }

    return context;
}