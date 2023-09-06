import {createContext, useContext} from 'react';

type SearchContext = {
    isOpen?: boolean;
    setIsOpen: (isOpen: boolean) => void;
    query?: string;
    setQuery?: (query: string) => void
    isSearchPage?: boolean;
    setIsSearchPage?: (isSearchPage: boolean) => void
};

export const SearchContext = createContext<SearchContext | undefined>(undefined);

export function useSearchContext(): SearchContext {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useNavBarContext should be used within the NavbarContext provider!');
    }
    return context;
}
