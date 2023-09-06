'use client'

import {LineGraph} from "@/components/PriceHistoryGraph/LineGraph";
import React, {useState} from "react";
import {twMerge} from "tailwind-merge";
import {FaArrowTrendDown, FaArrowTrendUp} from "react-icons/fa6";

const trackedProducts = [
    {
        title: 'Apple Watch Series 6 with Sport Band',
        href: '#',
        store: 'Apple Store',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg',
        imageAlt: 'Front of Apple Watch Series 6 with Pride watch face.',
        prices: [
            {price: 100},
            {price: 120},
            {price: 150},
            {price: 180},
            {price: 200},
            {price: 499},
            {price: 50},
            {price: 100},
            {price: 200},
            {price: 222},
            {price: 210},
            {price: 300},
        ],
        discounted: false
    },
    {
        title: 'Apple Watch SE - 40mm',
        href: '#',
        store: 'Amazon',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-product-02.jpg',
        imageAlt: 'Front of Apple Watch SE with watch face.',
        prices: [
            {price: 222},
            {price: 210},
            {price: 100},
            {price: 200},
            {price: 120},
            {price: 150},
            {price: 180},
            {price: 200},
            {price: 499},
            {price: 50},
            {price: 300},
            {price: 100},
        ],
        discounted: true
    },
    {
        title: 'Apple Watch Series 3',
        href: '#',
        store: 'Walmart',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-product-03.jpg',
        imageAlt: 'Front of Apple Watch Series 3 with watch face.',
        prices: [
            {price: 100},
            {price: 180},
            {price: 200},
            {price: 499},
            {price: 50},
            {price: 150},
            {price: 200},
            {price: 120},
            {price: 300},
            {price: 222},
            {price: 100},
            {price: 210},
        ],
        discounted: false
    },
    {
        title: 'Apple Watch Nike Series 6',
        href: '#',
        store: 'Nike',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-product-04.jpg',
        imageAlt: 'Front of Apple Watch Nike with watch face.',
        prices: [
            {price: 200},
            {price: 120},
            {price: 200},
            {price: 100},
            {price: 180},
            {price: 150},
            {price: 100},
            {price: 222},
            {price: 210},
            {price: 300},
            {price: 499},
            {price: 50},
        ],
        discounted: true
    },
]
const TrackedProductsPage = () => {
    const [selectedProduct, setSelectedProduct] = useState(trackedProducts[0])
    return (
        <div className={'relative px-4 mx-auto max-w-screen-2xl sm:px-6'}>
            <div className={'flex flex-col justify-center items-center gap-4 mb-16'}>
                <h1 className={'text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl'}>
                    Tracked Products
                </h1>
                <p className={'text-gray-500 dark:text-gray-400'}>
                    Track the price history of your favorite products from different stores.
                </p>
            </div>
            <div
                className={'flex flex-col xl:flex-row gap-8 divide-y divide-x-0 xl:divide-x xl:divide-y-0 divide-gray-200  dark:divide-gray-700'}>
                <div className={'w-full xl:max-w-sm'}>
                    <div
                        className={'flex xl:flex-col justify-center mb-8 xl:mb-0 xl:justify-start flex-row gap-4 sticky top-6'}>
                        {trackedProducts.map((product, index) => (
                            <div key={index} className={twMerge(
                                'flex group items-center hover:bg-gray-100 dark:hover:bg-gray-800 gap-4 xl:px-4 xl:py-2 rounded-lg cursor-pointer',
                                selectedProduct.title === product.title ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-900'
                            )} onClick={() => setSelectedProduct(product)}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className={twMerge(
                                        'flex-shrink-0 w-16 h-16 rounded-lg object-cover bg-gray-100 dark:bg-gray-800',
                                        selectedProduct.title === product.title ? 'ring-2 ring-indigo-500' : 'ring-1 ring-gray-200 dark:ring-gray-700',
                                        'group-hover:opacity-75'
                                    )}
                                />
                                <h3 className={'text-sm xl:block hidden font-medium text-gray-900 dark:text-white overflow-ellipsis'}>{product.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={'w-full px-4 py-8 xl:px-6 xl:py-0 overflow-auto'}>
                    <div className={'flex flex-col gap-4'}>
                        {trackedProducts.map((product, index) => (
                            <div key={index} aria-labelledby="price-history-graph" className={'mt-8 md:mt-0'}>
                                <div className={'flex items-center justify-between'}>
                                    <h3 className={'text-lg font-medium text-gray-900 dark:text-white'}>{product.store}</h3>
                                    {product.discounted ? (
                                        <span
                                            className={'inline-flex items-center px-2.5 py-0.5 text-sm font-medium text-green-500'}>
                                            <FaArrowTrendDown className={'h-6 w-6'}/> <span className={'ml-2 text-xl'}> 12% off</span>
                                        </span>
                                    ) : (
                                        <span
                                            className={'inline-flex items-center px-2.5 py-0.5 text-red-500 font-medium text-sm'}>
                                            <FaArrowTrendUp className={'h-6 w-6'}/> <span className={'ml-2 text-xl'}> 8% up</span>
                                        </span>
                                    )}
                                </div>
                                <div className={'relative h-96 md:aspect-w-2 md:aspect-h-1'}>
                                    <LineGraph data={product.prices} idx={index}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackedProductsPage
