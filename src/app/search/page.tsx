'use client'

import React, {FC, useCallback, useEffect, useState} from 'react';
import {twMerge} from "tailwind-merge";
import {Disclosure, Transition} from '@headlessui/react'
import {HiChevronDown, HiFilter, HiMinusSm, HiPlusSm} from "react-icons/hi";
import ProductComponent, {ProductProps} from "@/components/Product/Product";
import {Button} from "@material-tailwind/react";
import {HiArrowLeft, HiArrowRight} from "react-icons/hi2";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Checkbox, PopoverComponent} from "@/components";
import { getRandomIntInclusive } from "@/helpers/range";


const sortOptions = [
    {name: 'Most Popular', current: true},
    {name: 'Best Rating', current: false},
    {name: 'Newest', current: false},
    {name: 'Price: Low to High', current: false},
    {name: 'Price: High to Low', current: false},
]
const filters = [
    {
        id: 'prices',
        name: 'prices',
        options: [
            {value: '0,250', label: '$0 - $250', checked: false},
            {value: '250,500', label: '$250 - $500', checked: false},
            {value: '500,750', label: '$500 - $750', checked: false},
            {value: '750,1000', label: '$750+', checked: false},
        ],
    },
    {
        id: 'color',
        name: 'Color',
        options: [
            {value: 'white', label: 'White', checked: false},
            {value: 'beige', label: 'Beige', checked: false},
            {value: 'blue', label: 'Blue', checked: true},
            {value: 'brown', label: 'Brown', checked: false},
            {value: 'green', label: 'Green', checked: false},
            {value: 'purple', label: 'Purple', checked: false},
        ],
    },
    {
        id: 'category',
        name: 'Category',
        options: [
            {value: 'all-new-arrivals', label: 'All New Arrivals', checked: false},
            {value: 'tees', label: 'Tees', checked: false},
            {value: 'objects', label: 'Objects', checked: false},
            {value: 'sweatshirts', label: 'Sweatshirts', checked: false},
            {value: 'pants-and-shorts', label: 'Pants & Shorts', checked: false},
        ],
    },
    {
        id: 'sizes',
        name: 'Sizes',
        options: [
            {value: 'xs', label: 'XS', checked: false},
            {value: 's', label: 'S', checked: true},
            {value: 'm', label: 'M', checked: false},
            {value: 'l', label: 'L', checked: false},
            {value: 'xl', label: 'XL', checked: false},
            {value: '2xl', label: '2XL', checked: false},
        ],
    },
]

// export function getRandomIntInclusive(min: number, max: number): number {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
// }


const products: ProductProps[] = []

const stores = [
    "Amazon",
    "Walmart",
    "Target",
    "Best Buy",
    "GameStop",
    "Home Depot",
    "Newegg",
    "B&H Photo",
    "Ali Express",
];

const productNames = [
    "Apple iPhone 12 Pro Max",
    "Apple iPhone 12 Pro",
    "Samsung Galaxy S21 Ultra",
    "Samsung Galaxy S21+",
    "Google Pixel 5",
    "Google Pixel 4a",
    "OnePlus 8 Pro",
    "OnePlus 8",
    "Apple Watch Series 6",
    "Apple Watch SE",
    "Samsung Galaxy Watch 3",
    "Samsung Galaxy Watch Active 2",
    "Apple iPad Pro 12.9",
    "Apple iPad Pro 11",
    "Samsung Galaxy Tab S7+",
];
Array.from({length: 15}).map((_, i) => {
    const current = getRandomIntInclusive(600, 900)
    const previous = getRandomIntInclusive(700, 900)
    const product: ProductProps = {
        imgSrc: `https://picsum.photos/seed/${i}/200/300`,
        imgAlt: `Product ${i}`,
        store: stores[getRandomIntInclusive(0, stores.length - 1)],
        title: productNames[getRandomIntInclusive(0, productNames.length - 1)],
        url: '#',
        reviews: {
            rating: getRandomIntInclusive(1, 5),
            total: getRandomIntInclusive(600, 900)
        },
        price: {
            previous: previous,
            current: current,
            percentage: ((previous - current) / previous) * 100
        }
    }
    products.push(product)
})

const SearchPage = () => {

    const [prods, setProds] = useState<ProductProps[]>(products)

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()!

    const filterProducts = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString())
        const entries = params.entries()
        const filters = Array.from(entries).filter(([key, value]) => key !== 'q')
        const filteredProducts = products.filter((product) => {
            let match = true
            filters.forEach(([key, value]) => {
                if (key === 'prices') {
                    const prices = value.split(',')
                    const price = product.price.current
                    match = match && price >= Number(prices[0]) && price <= Number(prices[1])
                } else {
                    match = match && product[key as keyof ProductProps] === value
                }
            })
            return match
        })
        setProds(filteredProducts)
    }, [searchParams])

    useEffect(() => {
            const sortProducts = () => {
                const params = new URLSearchParams(searchParams.toString())
                const sort = params.get('sort')
                if (sort === 'Price: High to Low') {
                    setProds([...prods].sort((a, b) => b.price.current - a.price.current))
                } else if (sort === 'Price: Low to High') {
                    setProds([...prods].sort((a, b) => a.price.current - b.price.current))
                }
            }
            sortProducts()
        }
        , [searchParams, prods, filterProducts]
    )

    const filterChange = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        }
        , [searchParams])

    const setQueryValue = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    const clearAllFilters = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString())
        const keys = Array.from(params.keys())
        keys.filter((key) => (key !== 'q') && (key !== 'page')).forEach((key) => params.delete(key))
        return params.toString()
    }, [searchParams])

    const handleSortChange = useCallback(
        (value: string) => {
            router.push(
                pathname + '?' + setQueryValue('sort', value),
            )
        },
        [router, pathname, setQueryValue]
    )

    const handleClearAllFilters = useCallback(() => {
        router.push(
            pathname + '?' + clearAllFilters(),
        )
    }, [router, pathname, clearAllFilters])

    const handlePageChange = useCallback(
        (page: number) => {
            router.push(
                pathname + '?' + setQueryValue('page', page.toString()),
            )
        },
        [router, pathname, setQueryValue]
    )

    const handleFilterChange = useCallback(
        (name: string, value: string) => {
            router.push(
                pathname + '?' + filterChange(name, value),
            )
        },
        [router, pathname, filterChange]
    )

    return (
        <main className="pb-24">
            {/* Filters */}
            <MobileFilters
                handleSortChange={handleSortChange}
                handleClearAllFilters={handleClearAllFilters}
                handleFilterChange={handleFilterChange}/>

            {/* Product grid */}
            <section aria-labelledby="products-heading"
                     className="max-w-screen-2xl mx-auto overflow-hidden sm:px-6 lg:px-8 mb-20">
                <div className="lg:grid lg:grid-cols-4 lg:gap-x-8 xl:grid-cols-5">
                    <DesktopFilters handleFilterChange={handleFilterChange}/>
                    <section aria-labelledby="product-heading" className="lg:col-span-3 xl:col-span-4">
                        <h2 id="product-heading" className="sr-only">
                            Products
                        </h2>

                        <div
                            className="-mx-px border-l border-gray-200 dark:border-gray-700 grid grid-cols-2 md:grid-cols-3 sm:mx-0 xl:grid-cols-4">
                            {prods.map((product, index) => (
                                <div key={index}
                                     className="group relative border-r border-b border-gray-200 dark:border-gray-700">
                                    <div className={`group-hover:opacity-75 sm:p-6 md:p-4 p-4`}>
                                        <ProductComponent product={product} key={index}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </section>

            {/* Pagination */}
            <Pagination pages={9} onCurrentPageChange={
                (page) => {
                    handlePageChange(page)
                }
            }/>
        </main>
    )
};

export interface MobileFiltersProps extends SortProps {
    handleClearAllFilters: () => void
    handleFilterChange: (sectionId: string, value: string) => void
}

const MobileFilters: FC<MobileFiltersProps> = ({handleClearAllFilters, handleFilterChange, handleSortChange}) => {
    return (
        <Disclosure
            as="section"
            aria-labelledby="filter-heading"
            className="relative border-y mt-6 border-gray-200 dark:border-gray-700 grid items-center"
        >
            <h2 id="filter-heading" className="sr-only">
                Filters
            </h2>
            <div className="relative max-w-screen-2xl w-full mx-auto flex justify-between py-4">
                <div
                    className="flex space-x-6 divide-x divide-gray-200 lg:divide-x-0 text-sm px-4 sm:px-6">
                    <div>
                        <Disclosure.Button
                            className="group lg:hidden text-gray-700 dark:text-gray-300 font-medium flex items-center">
                            <HiFilter
                                className="flex-none w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                                aria-hidden="true"
                            />
                            2 Filters
                        </Disclosure.Button>
                    </div>
                    <div className="pl-6 lg:pl-0">
                        <button type="button" className="text-gray-500 dark:text-gray-400"
                                onClick={handleClearAllFilters}
                        >
                            Clear all
                        </button>
                    </div>
                </div>
                <div className="relative px-4 sm:px-6 lg:px-8">
                    <Sort handleSortChange={handleSortChange}/>
                </div>
            </div>

            <Disclosure.Panel className="border-t border-gray-200 dark:border-gray-700 pt-4 pb-8 lg:hidden">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-y-4 auto-rows-min md:grid-cols-4">
                        {filters.map((section, sectionIdx) => (
                            <div key={sectionIdx} className={'pt-6 sm:pt-4'}>
                                <fieldset>
                                    <legend
                                        className="block text-sm font-medium text-gray-900 dark:text-gray-100">{section.name}</legend>
                                    <div className="pt-6 sm:pt-4 space-y-4">
                                        {section.options.map((option, optionIdx) => (
                                            <div key={option.value}
                                                 className="flex items-center text-base sm:text-sm">
                                                <Checkbox
                                                    id={`${section.id}-${optionIdx}`}
                                                    name={`${section.id}[]`}
                                                    defaultValue={option.value}
                                                    defaultChecked={option.checked}
                                                    checked={option.checked}
                                                    onChange={(e) => {
                                                        e.preventDefault()
                                                        handleFilterChange(section.id, option.value)
                                                        option.checked = e.target.checked

                                                    }}
                                                    className="flex-shrink-0"
                                                />
                                                <label htmlFor={`${section.id}-${optionIdx}`}
                                                       className="ml-3 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
                                                    {option.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </fieldset>
                            </div>
                        ))}
                    </div>
                </div>
            </Disclosure.Panel>
        </Disclosure>
    )
}

export interface DesktopFiltersProps {
    handleFilterChange: (sectionId: string, value: string) => void
}

const DesktopFilters: FC<DesktopFiltersProps> = ({handleFilterChange}) => {
    return (
        <aside>
            <h2 className="sr-only">Filters</h2>
            <div className="hidden lg:block">
                <form className="space-y-6 mt-6">
                    {filters.map((section) => (
                        <Disclosure as="div" key={section.id}
                                    className="border border-gray-300 dark:border-gray-700 p-5 rounded-lg">
                            {({open}) => (
                                <>
                                    <h3 className="-my-3 flow-root">
                                        <Disclosure.Button
                                            className="py-3 w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                                                            <span
                                                                className="font-medium text-gray-900 dark:text-gray-200">{section.name}</span>
                                            <span className="ml-6 flex items-center">
                                                                  {!open ? (
                                                                      <HiMinusSm className="h-5 w-5"
                                                                                 aria-hidden="true"/>
                                                                  ) : (
                                                                      <HiPlusSm className="h-5 w-5" aria-hidden="true"/>
                                                                  )}
                                                            </span>
                                        </Disclosure.Button>
                                    </h3>
                                    <Transition
                                        show={!open}
                                        enter="transition duration-100 ease-out"
                                        enterFrom="transform scale-95 opacity-0"
                                        enterTo="transform scale-100 opacity-100"
                                        leave="transition duration-75 ease-out"
                                        leaveFrom="transform scale-100 opacity-100"
                                        leaveTo="transform scale-95 opacity-0"
                                    >
                                        <Disclosure.Panel static className="pt-6">
                                            <div className="space-y-4">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value}
                                                         className="flex items-center">
                                                        <Checkbox
                                                            id={`filter-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            defaultValue={option.value}
                                                            defaultChecked={option.checked}
                                                            checked={option.checked}
                                                            onChange={(e) => {
                                                                e.preventDefault()
                                                                handleFilterChange(section.id, option.value)
                                                                option.checked = e.target.checked

                                                            }}
                                                            className="flex-shrink-0"
                                                        />
                                                        <label
                                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                                            className="ml-3 text-sm text-gray-600 dark:text-gray-300 cursor-pointer"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </Disclosure.Panel>
                                    </Transition>
                                </>
                            )}
                        </Disclosure>
                    ))}
                </form>
            </div>
        </aside>
    )
}

export interface SortProps {
    handleSortChange: (sort: string) => void
}

const Sort: FC<SortProps> = ({handleSortChange}) => {
    const [sort, setSort] = useState(sortOptions[0])
    return (
        <PopoverComponent
            handler={
                <button type="button"
                        className="group inline-flex justify-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900">
                    Sort
                    <HiChevronDown
                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
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
            placement={'bottom-end'}
            offset={6}
            className={'w-44 p-2 border-none rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 focus:outline-none'}
        >
            {sortOptions.map((option) => (
                <button
                    key={option.name}
                    className={twMerge(
                        option == sort ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400',
                        'hover:bg-gray-100 hover:dark:bg-gray-700 hover:text-gray-800 hover:dark:text-gray-100',
                        'block px-4 py-2 text-sm rounded-md w-full text-left'
                    )}
                    onClick={(e) => {
                        e.preventDefault()
                        handleSortChange(option.name)
                        setSort(option)
                    }
                    }
                >
                    {option.name}
                </button>
            ))}
        </PopoverComponent>
    )
}


export interface PaginationProps {
    onCurrentPageChange: (page: number) => void
    pages: number
}

const Pagination: FC<PaginationProps> = ({onCurrentPageChange, pages}) => {
    const searchParams = useSearchParams()!
    const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1
    const [active, setActive] = useState(currentPage);

    const getItemProps = (index: number) =>
        ({
            variant: active === index ? "filled" : "text",
            color: active === index ? "blue" : "blue-gray",
            onClick: () => {
                setActive(index);
                onCurrentPageChange(index)
            },
        } as any);

    const next = () => {
        if (active === pages) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };

    return (
        <div className="flex items-center gap-4 justify-center">
            {pages >= 2 && (<Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-2"
                onClick={prev}
                disabled={active === 1}
            >
                <HiArrowLeft strokeWidth={2} className="h-4 w-4"/> Previous
            </Button>)}
            <div className="flex items-center gap-2">
                {/*    array of the first and last 2 pages seperated by `...`*/}
                {Array.from({length: pages}, (_, i) => i + 1).map((page, index) => {
                    if (page === 1 || page === pages || (active - 2 <= page && page <= active + 2)) {
                        return (
                            <Button key={index} {...getItemProps(page)}>
                                {page}
                            </Button>
                        );
                    }

                    if (active - 3 === page || active + 3 === page) {
                        return <span key={index}>...</span>;
                    }

                    return null;
                })}
            </div>
            {pages >= 2 && (<Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-2"
                onClick={next}
                disabled={active === pages}
            >
                Next
                <HiArrowRight strokeWidth={2} className="h-4 w-4"/>
            </Button>)}
        </div>
    )
}

export default SearchPage;
