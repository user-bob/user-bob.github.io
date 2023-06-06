import {HiBars3, HiBell, HiEllipsisVertical, HiMagnifyingGlass, HiMoon, HiOutlineXMark, HiSun,} from "react-icons/hi2";
import {Dialog, Menu, Popover, Tab, Transition} from "@headlessui/react";
import React, {Fragment, useState} from "react";
import classNames from "@/utils/class-names";
import {Notifications} from "@/components/notifications";
import {PopoverMenu} from "@/components/popover/tooltip";
import {SearchBar} from "@/components/search-bar";
import {signOut, useSession} from "next-auth/react";
import {useTheme} from "@/theme/theme-provider";
import Avatar from "@/components/avatar";
import Link from "next/link";
import * as ROUTES from "@/constants/routes";
import * as APIS from "@/constants/apis";
import ModalLogin from "@/components/modal/login";

const navigation = {
    categories: [
        {
            id: 'electronics',
            name: 'Electronics',
            featured: [
                {
                    name: 'New Products',
                    href: '#',
                    imageSrc: 'https://source.unsplash.com/featured/?fridge',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Most popular',
                    href: '#',
                    imageSrc: 'https://source.unsplash.com/featured/?tv',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
            sections: [
                {
                    id: 'appliances',
                    name: 'Appliances',
                    items: [
                        {name: 'Fridges', href: '#'},
                        {name: 'Smart TVs', href: '#'},
                        {name: 'Monitors', href: '#'},
                        {name: 'Microwaves', href: '#'},
                        {name: 'Browse All', href: '#'},
                    ],
                },
                {
                    id: 'games',
                    name: 'Games',
                    items: [
                        {name: 'Xbox Consoles', href: '#'},
                        {name: 'PlayStation 5 console', href: '#'},
                        {name: 'Fifa 23', href: '#'},
                    ],
                },
                {
                    id: 'others',
                    name: 'Others',
                    items: [
                        {name: 'Webcam', href: '#'},
                        {name: 'Air pod', href: '#'},
                        {name: 'Galaxy Bud', href: '#'},
                        {name: 'Door bell', href: '#'},
                    ],
                },
            ],
        },
        {
            id: 'phones & tablets',
            name: 'Phones & Tablets',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://source.unsplash.com/featured/?iphone',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Basic Tees',
                    href: '#',
                    imageSrc: 'https://source.unsplash.com/featured/?ipad',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
            sections: [
                {
                    id: 'phones',
                    name: 'Phones',
                    items: [
                        {name: 'IPhone', href: '#'},
                        {name: 'Samsung Galaxy', href: '#'},
                        {name: 'Google Pixel', href: '#'},
                        {name: 'Oppo', href: '#'},
                        {name: 'One Plus', href: '#'},
                        {name: 'Browse All', href: '#'},
                    ],
                },
                {
                    id: 'tablets',
                    name: 'Tablets',
                    items: [
                        {name: 'Ipad Pro', href: '#'},
                        {name: 'Ipad', href: '#'},
                        {name: 'Samsung Tab', href: '#'},
                        {name: 'Remarkable', href: '#'},
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        {name: 'Phone covers', href: '#'},
                        {name: 'Air pod', href: '#'},
                        {name: 'Ear Bud', href: '#'},
                        {name: 'Wireless Charger', href: '#'},
                    ],
                },
            ],
        },
        {
            id: 'computers',
            name: 'Computers',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://source.unsplash.com/featured/?laptop',
                    imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
                },
                {
                    name: 'Artwork Tees',
                    href: '#',
                    imageSrc: 'https://source.unsplash.com/featured/?monitor',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
                },
            ],
            sections: [
                {
                    id: 'laptops',
                    name: 'Laptops',
                    items: [
                        {name: 'Macbook', href: '#'},
                        {name: 'Galaxy Book', href: '#'},
                        {name: 'HP', href: '#'},
                        {name: 'SPX', href: '#'},
                        {name: 'Chrome Book', href: '#'},
                        {name: 'Microsoft Surface', href: '#'},
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        {name: 'Watches', href: '#'},
                        {name: 'Wallets', href: '#'},
                        {name: 'Bags', href: '#'},
                        {name: 'Sunglasses', href: '#'},
                        {name: 'Hats', href: '#'},
                        {name: 'Belts', href: '#'},
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        {name: 'Apple', href: '#'},
                        {name: 'Samsung', href: '#'},
                        {name: 'Google', href: '#'},
                        {name: 'Microsoft', href: '#'},
                        {name: 'Hp', href: '#'},
                    ],
                },
            ],
        },
    ],
    pages: [
        {name: 'Stores', href: '#'},
    ],
};
const userNavigationDesktop = [
    {name: 'Your Profile', href: '/profile'},
    {name: 'Settings', href: '/settings'},
    {name: 'Sign out', href: APIS.SIGN_OUT},
]
const mobileAnon = [
    {name: 'Login', href: '#'},
    {name: 'Theme', href: '#'},
    {name: 'Notifications', href: '#'},
]
const userNavigationMobile = [
    {name: 'Your Profile', href: '/profile'},
    {name: 'Tracked items', href: '#'},
    {name: 'Settings', href: '/settings'},
    {name: 'Sign out', href: APIS.SIGN_OUT},
]

export default function Header() {
    const {data: session} = useSession();
    const {dark, toggleTheme} = useTheme()

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [open, setOpen] = useState(false)


    return (
        <div className={'z-10'}>
            {/* Mobile menu */}
            <Transition.Root show={mobileMenuOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileMenuOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25"/>
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div
                            className="relative max-w-xs w-full bg-white dark:bg-gray-900 shadow-xl pb-12 flex flex-col overflow-y-auto">
                            <div className="px-4 pt-5 pb-2 flex">
                                <button
                                    type="button"
                                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <HiOutlineXMark className="h-6 w-6" aria-hidden="true"/>
                                </button>
                            </div>

                            {/* Links */}
                            <Tab.Group as="div" className="mt-2">
                                <div className="border-b border-gray-200 dark:border-gray-800">
                                    <Tab.List className="-mb-px flex px-4 space-x-8">
                                        {navigation.categories.map((category) => (
                                            <Tab
                                                key={category.name}
                                                className={({selected}) =>
                                                    classNames(
                                                        selected
                                                            ? 'text-indigo-500 border-indigo-500 dark:text-indigo-300 dark:border-indigo-300'
                                                            : 'text-gray-900 dark:text-gray-100 border-transparent',
                                                        'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                                                    )
                                                }
                                            >
                                                {category.name}
                                            </Tab>
                                        ))}
                                    </Tab.List>
                                </div>
                                <Tab.Panels as={Fragment}>
                                    {navigation.categories.map((category) => (
                                        <Tab.Panel key={category.name} className="pt-10 pb-8 px-4 space-y-10">
                                            <div className="grid grid-cols-2 gap-x-4">
                                                {category.featured.map((item) => (
                                                    <div key={item.name} className="group relative text-sm">
                                                        <div
                                                            className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                                            <img src={item.imageSrc} alt={item.imageAlt}
                                                                 className="object-center object-cover"/>
                                                        </div>
                                                        <Link href={item.href}
                                                              className="mt-6 block font-medium text-gray-900 dark:text-gray-100">
                                                                <span className="absolute z-10 inset-0"
                                                                      aria-hidden="true"/>
                                                            {item.name}
                                                        </Link>
                                                        <p aria-hidden="true" className="mt-1">
                                                            Shop now
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                            {category.sections.map((section) => (
                                                <div key={section.name}>
                                                    <p id={`${category.id}-${section.id}-heading-mobile`}
                                                       className="font-medium text-gray-900 dark:text-gray-100">
                                                        {section.name}
                                                    </p>
                                                    <ul
                                                        role="list"
                                                        aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                        className="mt-6 flex flex-col space-y-6"
                                                    >
                                                        {section.items.map((item) => (
                                                            <li key={item.name} className="flow-root">
                                                                <Link href={item.href}
                                                                      className="-m-2 p-2 block text-gray-500 dark:text-gray-400">
                                                                    {item.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </Tab.Panel>
                                    ))}
                                </Tab.Panels>
                            </Tab.Group>

                            <div className="border-t border-gray-200 dark:border-gray-700 py-6 px-4 space-y-6">
                                {navigation.pages.map((page) => (
                                    <div key={page.name} className="flow-root">
                                        <Link href={page.href}
                                              className="-m-2 p-2 block font-medium text-gray-900 dark:text-gray-100">
                                            {page.name}
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-700 py-6 px-4">
                                <Link href="#" className="-m-2 p-2 flex items-center">
                                    <img
                                        src="https://tailwindui.com/img/flags/flag-canada.svg"
                                        alt=""
                                        className="w-5 h-auto block flex-shrink-0"
                                    />
                                    <span
                                        className="ml-3 block text-base font-medium text-gray-900 dark:text-gray-100">CAD</span>
                                    <span className="sr-only">, change currency</span>
                                </Link>
                            </div>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>

            <header className="relative">
                <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-16 flex items-center">
                        <button
                            type="button"
                            className="p-2 rounded-md text-gray-400 lg:hidden"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open menu</span>
                            <HiBars3 className="h-6 w-6" aria-hidden="true"/>
                        </button>

                        {/* Logo */}
                        <div className="ml-auto md:ml-4 flex lg:ml-0">
                            <Link href={ROUTES.INDEX}>
                                <span className="sr-only">Workflow</span>
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                                    alt=""
                                />
                            </Link>
                        </div>

                        {/* Flyout menus */}
                        <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                            <div className="h-full flex space-x-8 items-center justify-center">
                                {navigation.categories.map((category) => (
                                    <PopoverMenu key={category.name} popoverCN={'flex'} popoverBtnCN={''}
                                                 popoverPanelCN={'hidden lg:block top-full w-full max-w-2xl text-sm text-gray-500 dark:text-gray-400'}
                                                 button={category.name} content={
                                        <div
                                            className="relative bg-white dark:bg-gray-900 px-5 py-6 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                            <div
                                                className="grid grid-cols-2 gap-y-10 gap-x-8">
                                                <div
                                                    className="col-start-2 grid grid-cols-2 gap-x-8">
                                                    {category.featured.map((item) => (
                                                        <div key={item.name}
                                                             className="group relative text-base sm:text-sm">
                                                            <div
                                                                className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                                                <img
                                                                    src={item.imageSrc}
                                                                    alt={item.imageAlt}
                                                                    className="object-center object-cover"
                                                                />
                                                            </div>
                                                            <Link href={item.href}
                                                                  className="mt-4 block font-medium text-gray-900 dark:text-gray-100">
                                                                                            <span
                                                                                                className="absolute z-10 inset-0"
                                                                                                aria-hidden="true"/>
                                                                {item.name}
                                                            </Link>
                                                            <p aria-hidden="true"
                                                               className="mt-1">
                                                                Shop now
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div
                                                    className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                                    {category.sections.map((section) => (
                                                        <div key={section.name}>
                                                            <p id={`${section.name}-heading`}
                                                               className="font-medium text-gray-900 dark:text-gray-100">
                                                                {section.name}
                                                            </p>
                                                            <ul
                                                                role="list"
                                                                aria-labelledby={`${section.name}-heading`}
                                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                            >
                                                                {section.items.map((item) => (
                                                                    <li key={item.name}
                                                                        className="flex">
                                                                        <Link href={item.href}
                                                                              className="hover:text-gray-800 dark:hover:text-gray-200">
                                                                            {item.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    }/>
                                ))}

                                {navigation.pages.map((page) => (
                                    <a
                                        key={page.name}
                                        href={page.href}
                                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200"
                                    >
                                        {page.name}
                                    </a>
                                ))}
                            </div>
                        </Popover.Group>

                        {/*Search input*/}
                        <div className="hidden md:mx-auto md:pl-2 md:w-full md:flex md:items-center md:max-w-xs">
                            <div className="w-full">
                                <SearchBar/>
                            </div>
                        </div>

                        <div className="ml-auto md:ml-0 flex items-center">
                            <div className="hidden lg:ml-8 lg:mr-6 lg:flex">
                                <Link href="#"
                                      className="text-gray-700 dark:text-gray-300 hover:text-gray-800 flex items-center">
                                    <img
                                        src="https://tailwindui.com/img/flags/flag-canada.svg"
                                        alt=""
                                        className="w-5 h-auto block flex-shrink-0"
                                    />
                                    <span className="ml-3 block text-sm font-medium">CAD</span>
                                    <span className="sr-only">, change currency</span>
                                </Link>
                            </div>

                            {/* Search icon*/}
                            <div className="flex md:hidden lg:ml-6">
                                <Link href="#"
                                      className="p-2 text-gray-400 dark:hover:text-gray-300 hover:text-gray-500">
                                    <span className="sr-only">Search</span>
                                    <HiMagnifyingGlass className="w-6 h-6" aria-hidden="true"/>
                                </Link>
                            </div>

                            {/*---Desktop-----|| theme, notification, user*/}
                            <div className="hidden md:ml-4 lg:ml-6 md:flex md:space-x-4 lg:space-x-6">
                                {/* Theme */}
                                <button
                                    className="inline-flex items-center justify-center text-sm font-medium text-center text-gray-500 hover:text-gray-700 focus:outline-none dark:hover:text-gray-200 dark:text-gray-400"
                                    onClick={toggleTheme}
                                >
                                    <span className="sr-only">Switch Theme</span>
                                    {dark ? (<HiSun className="h-6 w-6" aria-hidden="true"/>) : (
                                        <HiMoon className="h-6 w-6" aria-hidden="true"/>)}
                                </button>

                                {/*Notifications*/}
                                <Notifications/>

                                {/*user profile*/}
                                <div className={`flex items-center`}>
                                    {!session && (
                                        <button
                                            className="block text-sm font-medium text-gray-700 hover:text-gray-800 dark:text-gray-300"
                                            onClick={() => setOpen(true)}
                                        >
                                            Login
                                        </button>
                                    )}
                                    {session?.user && (
                                        <Menu as="div" className="relative flex-shrink-0">
                                            <div>
                                                <Menu.Button
                                                    className="rounded-full flex text-sm">
                                                    <span className="sr-only">Open user menu</span>
                                                    <Avatar src={session.user.image!} alt={'user avatar'} size={'md'}/>
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
                                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {userNavigationDesktop.map((item) => (
                                                        <Menu.Item key={item.name}>
                                                            {({active}) => (
                                                                <a
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100 dark:bg-gray-800' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                                                                    )}
                                                                    onClick={(e) => {
                                                                        e.preventDefault()
                                                                        item.name === 'Sign out' && signOut()
                                                                    }}
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    )}
                                </div>
                            </div>

                            {/*---Mobile-----|| theme, notification, user*/}
                            <div className="flex items-center md:hidden">
                                <Menu as="div" className="relative flex-shrink-0">
                                    <div>
                                        <Menu.Button
                                            className="inline-flex items-center justify-center p-2 text-gray-400 dark:hover:text-gray-300">
                                            <span className="sr-only">Open main menu</span>
                                            <HiEllipsisVertical className="block h-6 w-6" aria-hidden="true"/>
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
                                            className={classNames(!session ? 'w-40' : 'w-80', "origin-top-right absolute right-0 mt-2 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none")}>
                                            <Menu.Item>
                                                <div
                                                    className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                                    <div
                                                        className={classNames(!session ? 'pt-1' : 'pt-2.5', "pb-1")}>
                                                        {session && session.user?.email && (
                                                            <div className="flex items-center px-5">
                                                                <div className="flex-shrink-0">
                                                                    <Avatar src={session?.user?.image!}
                                                                            alt={'user avatar'} size={'lg'}/>
                                                                </div>
                                                                <div className="ml-3">
                                                                    <div
                                                                        className="font-semibold text-lg text-gray-800 dark:text-gray-200">{session?.user?.name}</div>
                                                                    <div
                                                                        className="text-sm font-medium text-gray-500 dark:text-gray-400">{session?.user?.email}</div>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    className="ml-auto flex-shrink-0 p-1 text-gray-400 rounded-full hover:text-gray-500 dark:hover:text-gray-300"
                                                                >
                                                                            <span
                                                                                className="sr-only">View notifications</span>
                                                                    <HiBell className="h-6 w-6"
                                                                            aria-hidden="true"/>
                                                                </button>
                                                            </div>
                                                        )}
                                                        {!session ? (
                                                            <div>
                                                                {mobileAnon.map((item) => (
                                                                    <a
                                                                        key={item.name}
                                                                        href={item.href}
                                                                        className="block rounded-md px-3 py-2 text-base text-gray-900 dark:text-gray-100 font-medium dark:hover:bg-gray-800 hover:bg-gray-100 hover:text-gray-800"
                                                                    >
                                                                        {item.name}
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div className="mt-3 px-2 space-y-1">
                                                                {userNavigationMobile.map((item) => (
                                                                    <a
                                                                        key={item.name}
                                                                        href={item.href}
                                                                        onClick={(e) => {
                                                                            e.preventDefault()
                                                                            item.name === 'Sign out' && signOut()
                                                                        }}
                                                                        className="block rounded-md px-3 py-2 text-base text-gray-900 dark:text-gray-100 font-medium dark:hover:bg-gray-800 hover:bg-gray-100 hover:text-gray-800"
                                                                    >
                                                                        {item.name}
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {open && (
                <ModalLogin open={open} setOpen={setOpen}/>
            )}
        </div>
    );
}
