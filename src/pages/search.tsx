import React, {Fragment} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {HiChevronDown} from "react-icons/hi2";
import classNames from "@/utils/class-names";
import {HiFilter, HiMinusSm, HiPlusSm} from "react-icons/hi";
import {getRandomIntInclusive} from "@/utils/randoms";
import {Item} from "@/components/item";


const breadcrumbs = [
    {id: 1, name: 'Electronics', href: '#'},
    {id: 2, name: 'Appliances', href: '#'},
]
const sortOptions = [
    {name: 'Most Popular', href: '#', current: true},
    {name: 'Best Rating', href: '#', current: false},
    {name: 'Newest', href: '#', current: false},
    {name: 'Price: Low to High', href: '#', current: false},
    {name: 'Price: High to Low', href: '#', current: false},
]
const filters = [
    {
        id: 'prices',
        name: 'prices',
        options: [
            {value: '0', label: '$0 - $25', checked: false},
            {value: '25', label: '$25 - $50', checked: false},
            {value: '50', label: '$50 - $75', checked: false},
            {value: '75', label: '$75+', checked: false},
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


export default function Search() {
    const stores = [
        'Amazon',
        'Ebay',
        'Best buy',
        'Alibaba',
        'KFC'
    ]

    let prod = []
    for (let i = 1; i < 12; i++) {
        prod.push(
            {
                id: i,
                name: 'Machined Pen',
                color: 'Black',
                price: '$' + getRandomIntInclusive(100, 2000),
                store: stores[Math.floor(Math.random() * stores.length)],
                href: '#',
                rating: getRandomIntInclusive(1, 5),
                reviewCount: getRandomIntInclusive(100, 800),
                title: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
                imageSrc: `https://source.unsplash.com/featured/?laptop&phone&tablet${i}`,
                imageAlt: 'Black machined steel pen with hexagonal grip and small white logo at top.',
                availableColors: [
                    {name: 'Black', colorBg: '#111827'},
                    {name: 'Brass', colorBg: '#FDE68A'},
                    {name: 'Chrome', colorBg: '#E5E7EB'},
                ],
            }
        )
    }

    return (
        <div>
            {/* Static links / Breadcrumb */}
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ol role="list" className="flex items-center space-x-4 py-4">
                        {breadcrumbs.map((breadcrumb, index) => (
                            <li key={breadcrumb.id}>
                                <div className="flex items-center">
                                    {
                                        index === breadcrumbs.length - 1 ? (
                                            <a href="#" aria-current="page"
                                               className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-600">
                                                {breadcrumb.name}
                                            </a>
                                        ) : (
                                            <div className={'flex flex-row'}>
                                                <a href={breadcrumb.href}
                                                   className="mr-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                                                    {breadcrumb.name}
                                                </a>
                                                <svg
                                                    viewBox="0 0 6 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    aria-hidden="true"
                                                    className="h-5 w-auto text-gray-300"
                                                >
                                                    <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                                                          fill="currentColor"/>
                                                </svg>
                                            </div>
                                        )
                                    }

                                </div>
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>

            <main className="pb-24">
                {/* Filters */}
                <Disclosure
                    as="section"
                    aria-labelledby="filter-heading"
                    className="relative border-b border-gray-200 dark:border-gray-700 grid items-center"
                >
                    <h2 id="filter-heading" className="sr-only">
                        Filters
                    </h2>
                    <div className="relative col-start-1 row-start-1 py-4 lg:hidden">
                        <div
                            className="max-w-7xl mx-auto flex space-x-6 divide-x divide-gray-200 text-sm px-4 sm:px-6 lg:px-8">
                            <div>
                                <Disclosure.Button className="group text-gray-700 dark:text-gray-300 font-medium flex items-center">
                                    <HiFilter
                                        className="flex-none w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                                        aria-hidden="true"
                                    />
                                    2 Filters
                                </Disclosure.Button>
                            </div>
                            <div className="pl-6">
                                <button type="button" className="text-gray-500 dark:text-gray-400">
                                    Clear all
                                </button>
                            </div>
                        </div>
                    </div>
                    <Disclosure.Panel className="border-t border-gray-200 dark:border-gray-700 pt-4 pb-8 lg:hidden">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                                                        <input
                                                            id={`${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            defaultValue={option.value}
                                                            type="checkbox"
                                                            defaultChecked={option.checked}
                                                            className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label htmlFor={`${section.id}-${optionIdx}`}
                                                               className="ml-3 text-sm text-gray-600 dark:text-gray-300">
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
                    <div className="col-start-1 row-start-1 py-4">
                        <div className="flex justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <Menu as="div" className="relative z-10 inline-block">
                                <div className="flex">
                                    <Menu.Button
                                        className="group inline-flex justify-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900">
                                        Sort
                                        <HiChevronDown
                                            className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({active}) => (
                                                        <a
                                                            href={option.href}
                                                            className={classNames(
                                                                option.current ? 'font-medium text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400',
                                                                active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </Disclosure>

                {/* Product grid */}
                <section aria-labelledby="products-heading"
                         className="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8 mb-20">
                    <div className="lg:grid lg:grid-cols-4 lg:gap-x-8 xl:grid-cols-5">
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
                                  <HiMinusSm className="h-5 w-5" aria-hidden="true"/>
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
                                                                        <input
                                                                            id={`filter-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            defaultChecked={option.checked}
                                                                            className="flex-shrink-0 h-4 w-4 border-gray-300 dark:border-gray-700 rounded text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                            className="ml-3 text-sm text-gray-600 dark:text-gray-300"
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
                        <section aria-labelledby="product-heading" className="lg:col-span-3 xl:col-span-4">
                            <h2 id="product-heading" className="sr-only">
                                Products
                            </h2>

                            <div
                                className="-mx-px border-l border-gray-200 dark:border-gray-700 grid grid-cols-2 md:grid-cols-3 sm:mx-0 xl:grid-cols-4">
                                {prod.map((product) => (
                                    <div key={product.id}
                                         className="group relative p-4 border-r border-b border-gray-200 dark:border-gray-700 sm:p-6 md:p-4">
                                        <Item product={product}/>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </section>

                {/* Pagination */}
                <nav
                    aria-label="Pagination"
                    className="max-w-7xl mx-auto px-4 mt-6 flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 sm:px-6 lg:px-8"
                >
                    <div className="min-w-0 flex-1">
                        <a
                            href="#"
                            className="inline-flex items-center px-4 h-10 border border-gray-400 rounded-md dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:ring-indigo-600 focus:ring-opacity-25"
                        >
                            Previous
                        </a>
                    </div>
                    <div className="hidden space-x-2 sm:flex">
                        {/* Current: "border-indigo-600 ring-1 ring-indigo-600", Default: "border-gray-300" */}
                        {Array.from({length: 3}, (_, i) => (
                            <a
                                key={i}
                                href="#"
                                className={classNames(i == 1 ? 'border-indigo-600 ring-1 ring-indigo-600' : 'border-gray-300 dark:border-gray-700', "inline-flex items-center px-4 h-10 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:ring-indigo-600 focus:ring-opacity-25")}
                            >
                                {i + 1}
                            </a>
                        ))}
                        <span className="inline-flex items-center text-gray-500 px-1.5 h-10">...</span>
                        {Array.from({length: 3}, (_, i) => (
                            <a
                                key={i}
                                href="#"
                                className="inline-flex items-center px-4 h-10 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:border-indigo-600 focus:ring-2 dark:hover:bg-gray-800 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:ring-indigo-600 focus:ring-opacity-25"
                            >
                                {i + 7}
                            </a>
                        ))}
                    </div>
                    <div className="min-w-0 flex-1 flex justify-end">
                        <a
                            href="#"
                            className="inline-flex items-center px-4 h-10 border border-gray-300 dark:border-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:ring-indigo-600 focus:ring-opacity-25"
                        >
                            Next
                        </a>
                    </div>
                </nav>
            </main>
        </div>
    )
}
