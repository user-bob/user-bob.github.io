import type {ComponentProps, FC} from 'react';
import {useEffect, useState} from "react";

import type {DeepPartial} from '../..';
import {useTheme} from '../..';
import {mergeDeep} from '@/helpers/merge-deep';
import {twMerge} from 'tailwind-merge';
import {useSearchContext} from "./SearchContext";
import {HiMagnifyingGlass} from "react-icons/hi2";

export interface SearchHandlerTheme {
    base: string;
    icon: string;
}

export interface SearchHandlerProps extends ComponentProps<'button'> {
    barIcon?: FC<ComponentProps<'svg'>>;
    theme?: DeepPartial<SearchHandlerTheme>;
}

export const SearchHandler: FC<SearchHandlerProps> = ({
                                                          barIcon: SearchIcon = HiMagnifyingGlass,
                                                          className,
                                                          theme: customTheme = {},
                                                          ...props
                                                      }) => {
    const {isOpen, setIsOpen, query, isSearchPage, setQuery} = useSearchContext();
    const theme = mergeDeep(useTheme().theme.search.handler, customTheme);
    const [collapsed, setCollapsed] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setCollapsed(true);
            } else {
                setCollapsed(false);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        window.location.href = `/search?q=${query}&page=1`
    }

    if (isSearchPage && !collapsed) {
        return <form onSubmit={handleSearch}>
            <label htmlFor="default-search"
                   className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative max-w-xs">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon className="w-5 h-5 text-gray-400 dark:text-gray-300" aria-hidden="true"/>
                </div>
                <input
                    type="search"
                    name="default-search"
                    id="default-search"
                    value={query}
                    onChange={(e) => setQuery ? setQuery(e.target.value) : null}
                    className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search..."
                    required/>
            </div>
        </form>
    }

    return (
        <button
            data-testid="search-handler"
            onClick={handleClick}
            className={twMerge(theme.base, className)}
            {...props}
        >
            <span className="sr-only">Open search menu</span>
            <SearchIcon aria-hidden className={theme.icon}/>
        </button>
    );
};

