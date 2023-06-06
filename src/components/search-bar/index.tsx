import {useRouter} from 'next/router';
import {HiMagnifyingGlass} from "react-icons/hi2"
import {useEffect, useState} from 'react'

export const SearchBar = () => {
    const [q, setQuery] = useState<string | string[]>('');
    const router = useRouter();
    const {pathname, query} = router
    const q1 = query.q ?? ''


    useEffect(() => {
        setQuery(pathname === '/search' ? q1 : '')
    }, [pathname, query.q]);

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (q !== null && q.length > 0) {
            router.push('http://localhost:3000/search?q=' + q, undefined, {shallow: true})
            console.log('Enter', q);
        }
    };


    return (
        <form role={'search'} onSubmit={handleSubmit}>
            <label htmlFor="product-search" className="sr-only">
                Search
            </label>
            <div className="relative">
                <div
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiMagnifyingGlass className="h-5 w-5 text-gray-400"
                                       aria-hidden="true"/>
                </div>
                <input
                    id="product-search"
                    name="q"
                    className="block w-full rounded-lg border-0 pl-10 py-2 pr-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 placeholder:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    placeholder="Search"
                    type="search"
                    aria-label="Search through site products"
                    onChange={(event) => setQuery(event.target.value)}
                    value={q}
                />
            </div>
        </form>
    );
}