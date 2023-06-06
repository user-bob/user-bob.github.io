import {NextPage} from "next";
import React from "react";
import {Item} from "@/components/item";
import {getRandomIntInclusive} from "@/utils/randoms";
import Link from "next/link";


const categories = [
    {
        name: 'New Arrivals',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-01.jpg',
    },
    {
        name: 'Productivity',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-02.jpg',
    },
    {
        name: 'Workspace',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-04.jpg',
    },
    {
        name: 'Accessories',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-05.jpg',
    },
    { name: 'Sale', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-03.jpg' },
]
const Home: NextPage = () => {

    const stores = [
        'Amazon',
        'Ebay',
        'Best buy',
    ]

    let prod = []
    for (let i = 1; i < 12; i++) {
        const price = getRandomIntInclusive(100, 2000)
        prod.push(
            {
                id: i,
                name: 'Machined Pen',
                color: 'Black',
                price: '$' + price,
                lastPrice: '$' + (price - getRandomIntInclusive(1, 100)),
                store: stores[Math.floor(Math.random() * stores.length)],
                href: '#',
                rating: getRandomIntInclusive(1, 5),
                reviewCount: getRandomIntInclusive(100, 800),
                title: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
                imageSrc: `https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-${i}.jpg`,
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
        <>
            <main className={"w-full py-10 flex flex-col space-y-10"}>
                <div className="relative px-6 md:px-8 scroll-bar w-full pb-6 overflow-x-auto">
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">Recent price drops</h2>
                    <ul
                        role="list"
                        className="inline-flex space-x-6 mt-4"
                    >
                        {prod.map((product) => (
                            <li key={product.id} className={'w-56'}>
                                <Item isRecent={true} product={product}/>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white dark:bg-gray-900 dark:bg-opacity-20">
                    <div className="xl:max-w-7xl xl:mx-auto xl:px-8">
                        <div className="px-4 sm:px-6 sm:flex sm:items-center sm:justify-between lg:px-8 xl:px-0">
                            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">Shop by Category</h2>
                            <Link href="/categories" className="hidden text-sm font-semibold text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 hover:text-indigo-500 sm:block">
                                Browse all categories<span aria-hidden="true"> &rarr;</span>
                            </Link>
                        </div>

                        <div className="mt-4 flow-root">
                            <div className="-my-2">
                                <div className="box-content scroll-bar py-2 relative h-80 overflow-x-auto xl:overflow-visible">
                                    <div className="absolute min-w-screen-xl px-4 flex space-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:grid xl:grid-cols-5 xl:gap-x-8">
                                        {categories.map((category) => (
                                            <a
                                                key={category.name}
                                                href={category.href}
                                                className="relative w-56 h-80 rounded-lg p-6 flex flex-col overflow-hidden hover:opacity-75 xl:w-auto"
                                            >
                    <span aria-hidden="true" className="absolute inset-0">
                      <img src={category.imageSrc} alt="" className="w-full h-full object-center object-cover" />
                    </span>
                                                <span
                                                    aria-hidden="true"
                                                    className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                                                />
                                                <span className="relative mt-auto text-center text-xl font-bold text-white">{category.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 px-4 sm:hidden">
                            <Link href="/categories" className="block text-sm font-semibold dark:text-indigo-400 dark:hover:text-indigo-300 text-indigo-600 hover:text-indigo-500">
                                Browse all categories<span aria-hidden="true"> &rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl  mx-auto">
                    <div className="relative px-6 md:px-8">
                        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">Recommended for you</h2>
                        <ul
                            role="list"
                            className="grid grid-cols-2 mt-4 gap-y-16 gap-x-6 lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5"
                        >
                            {prod.map((product) => (
                                <li key={product.id}
                                    className="inline-flex flex-col text-center">
                                    <Item product={product}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
