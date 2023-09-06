"use client";

import {RadioGroup} from '@headlessui/react'
import {twMerge} from "tailwind-merge";
import React, {useState} from "react";
import {HiStar} from "react-icons/hi";
import {BuyOptionsTable} from "./conmponents/buy-options-table";
import {LineGraph} from "@/components/PriceHistoryGraph/LineGraph";
import {ImageGallery} from "./conmponents/image-gallery";
import {TrackProduct} from "./conmponents/tract-product";
import {BestBuyingOption} from "./conmponents/best-buying-option";
import {RelatedProducts} from "./conmponents/related-products";


const product = {
    name: 'Zip Tote Basket',
    price: '$140',
    rating: 4,
    images: [
        {
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
        },
        {
            name: 'Side and front view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-02.jpg',
            alt: 'Bag from side, slightly open, with handle upright.',
        },
        {
            name: 'Back view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-03.jpg',
            alt: 'Directly above view of bag, open.',
        },
        {
            name: 'Internal details',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-04.jpg',
            alt: 'View of bag interior.',
        },
        {
            name: 'Product packaging',
            src: 'https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg',
            alt: 'Product packaging.',
        },
        {
            name: 'Product detail',
            src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
            alt: 'Product detail.',
        },
        {
            name: 'Product detail',
            src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
            alt: 'Product detail.',
        },
        {
            name: 'Product detail',
            src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
            alt: 'Product detail.',
        },
        {
            name: 'Product detail',
            src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
            alt: 'Product detail.',
        },
        {
            name: 'Product detail',
            src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg',
            alt: 'Product detail.',
        }
    ],
    colors: [
        {name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700'},
        {name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400'},
        {name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500'},
    ],
    description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
    details: [
        {
            name: 'Features',
            items: [
                'Multiple strap configurations',
                'Spacious interior with top zip',
                'Leather handle and tabs',
                'Interior dividers',
                'Stainless strap loops',
                'Double stitched construction',
                'Water-resistant',
            ],
        },
        // More sections...
    ],
}

const initialData = [
    {name: 1, cost: 4.11, impression: 100},
    {name: 2, cost: 2.39, impression: 120},
    {name: 3, cost: 1.37, impression: 150},
    {name: 4, cost: 1.16, impression: 180},
    {name: 5, cost: 2.29, impression: 200},
    {name: 6, cost: 3, impression: 499},
    {name: 7, cost: 0.53, impression: 50},
    {name: 8, cost: 2.52, impression: 100},
    {name: 9, cost: 1.79, impression: 200},
    {name: 10, cost: 2.94, impression: 222},
    {name: 11, cost: 4.3, impression: 210},
    {name: 12, cost: 4.41, impression: 300},
    {name: 13, cost: 2.1, impression: 50},
    {name: 14, cost: 8, impression: 190},
    {name: 15, cost: 0, impression: 300},
    {name: 16, cost: 9, impression: 400},
    {name: 17, cost: 3, impression: 200},
    {name: 18, cost: 2, impression: 50},
    {name: 19, cost: 3, impression: 100},
    {name: 20, cost: 7, impression: 100}
];

const relatedProducts = [
    {
        id: 1,
        name: "Zip Tote Basket",
        color: "White and black",
        href: "#",
        src: "https://source.unsplash.com/featured?bag",
        imageAlt:
            "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
        price: "$140",
    },
    {
        id: 2,
        name: "Zip Tote Basket",
        color: "White and black",
        href: "#",
        src: "https://source.unsplash.com/featured?iphone",
        imageAlt:
            "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
        price: "$140",
    },
    {
        id: 3,
        name: "Zip Tote Basket",
        color: "White and black",
        href: "#",
        src: "https://source.unsplash.com/featured?samsung",
        imageAlt:
            "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
        price: "$140",
    },
    {
        id: 4,
        name: "Zip Tote Basket",
        color: "White and black",
        href: "#",
        src: "https://source.unsplash.com/featured?macbook",
        imageAlt:
            "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
        price: "$140",
    },
    // More products...
];

const bestBuyingOption = [
    {
        store: 'Amazon',
        price: 139.99,
        link: '#',
        tax: 20,
        shipping: 10,
        deliveryEstimate: '3-5 days',
        returnPolicy: 'Free returns',
        trusted: true,
        rating: 4,
        reviews: 117,
        currency: '$',
    }, {
        store: 'Walmart',
        price: 140.99,
        link: '#',
        tax: 20,
        shipping: 11,
        deliveryEstimate: '3-5 days',
        returnPolicy: 'Free 15-day returns',
        trusted: true,
        rating: 3.9,
        reviews: 517,
        currency: '$',
    }
]

const tableData = [
    {
        store: 'Amazon',
        delivery: 'Tue, Jul 11',
        returns: 'Return eligible through Wed, Aug 11',
        shipping: 'Free shipping',
        price: '$129.99',
        tax: '$11.99',
        total: '$141.98',
        link: '#',
    },
    {
        store: 'Best Buy',
        delivery: 'Fri, Jul 14',
        returns: 'Free 14-day returns',
        shipping: '$11.99',
        price: '$129.99',
        tax: '$10.40',
        total: '$152.38',
        link: '#',
    },
    {
        store: 'Gamestop',
        delivery: 'Fri, Jul 14',
        returns: 'Return eligible through Thu, Aug 12',
        shipping: '$11.99',
        price: '$119.99',
        tax: '$10.40',
        total: '$142.38',
        link: '#',
    },
    {
        store: 'Target',
        delivery: 'Fri, Jul 14',
        returns: 'Return eligible through Thu, Aug 12',
        shipping: '$11.99',
        price: '$139.99',
        tax: '$10.40',
        total: '$162.38',
        link: '#',
    }
]


const ProductDetail = () => {
    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [open, setOpen] = useState(false)
    return (
        <main className="max-w-screen-2xl mx-auto sm:pt-8 sm:px-6 lg:px-8">
            <div className="mb-6 px-4 space-y-3">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{product.name}</h1>
                {/* Reviews */}
                <div>
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                        <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                                <HiStar
                                    key={rating}
                                    className={twMerge(
                                        product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                                        'h-5 w-5 flex-shrink-0'
                                    )}
                                    aria-hidden="true"
                                />
                            ))}
                        </div>
                        <p className="sr-only">{product.rating} out of 5 stars</p>
                    </div>
                </div>
            </div>
            {/* Product */}
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                {/* Image gallery */}
                <div className={'flex flex-col gap-8'}>
                    <ImageGallery images={product.images}/>
                    <form>
                        <RadioGroup value={selectedColor} onChange={setSelectedColor}
                                    className="mt-2 flex items-center justify-center">
                            <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                            <div className="flex items-center space-x-3">
                                {product.colors.map((color) => (
                                    <RadioGroup.Option
                                        key={color.name}
                                        value={color}
                                        className={({active, checked}) =>
                                            twMerge(
                                                color.selectedColor,
                                                active && checked ? 'ring ring-offset-1' : '',
                                                !active && checked ? 'ring-2' : '',
                                                '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                            )
                                        }
                                    >
                                        <RadioGroup.Label as="p" className="sr-only">
                                            {color.name}
                                        </RadioGroup.Label>
                                        <span
                                            aria-hidden="true"
                                            className={twMerge(
                                                color.bgColor,
                                                'h-8 w-8 border border-black border-opacity-10 rounded-full'
                                            )}
                                        />
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>
                    </form>
                    <div>
                        {product.details.map((detail, index) => (
                            <div key={index} className={'space-y-3'}>
                            <span
                                className={twMerge('text-gray-900 dark:text-white', 'text-sm font-medium')}>
                                {detail.name}
                            </span>
                                <ul role="list">
                                    {detail.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product info */}
                <div className="mt-10 px-4 space-y-8 sm:px-0 sm:mt-16 lg:mt-0">
                    <div aria-labelledby="best-buying-option">
                        <h2 id="details-heading"
                            className="text-xl text-gray-900 dark:text-white font-semibold">
                            Best buying options
                        </h2>
                        <div className="mt-6 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                            {
                                bestBuyingOption.map((option, index) => (
                                    <BestBuyingOption key={index} option={option}/>
                                ))}
                        </div>
                    </div>
                    <div aria-labelledby="price-history-graph">
                        <h2 id="details-heading"
                            className="text-xl text-gray-900 dark:text-white font-semibold">
                            Price history
                        </h2>
                        <div className={'relative aspect-w-2 aspect-h-1'}>
                            <LineGraph data={initialData}/>
                        </div>
                    </div>

                    <div className="mt-6">
                        <TrackProduct/>
                    </div>
                </div>
            </div>

            <section className="mt-12 xl:mt-6 px-4 sm:px-0">
                <div>
                    <h2 id={'details-heading'} className={'sr-only'}>
                        Product details
                    </h2>
                    <div className="mt-6">
                        <h3 className="text-xl mb-4 font-semibold text-gray-900 dark:text-white">Product
                            details</h3>

                        <div
                            className="text-base font-light text-gray-700 space-y-6 dark:text-gray-300"
                            dangerouslySetInnerHTML={{__html: product.description}}
                        />
                    </div>
                </div>
            </section>

            <section aria-labelledby="buying-option-table" className={'mt-16'}>
                <h2 id="buying-option-table" className="text-xl text-gray-900 dark:text-white font-semibold">
                    Buying options
                </h2>
                <div className="mt-6">
                    <BuyOptionsTable items={tableData}/>
                </div>
            </section>

            <section aria-labelledby="related-heading"
                     className="mt-10 flex-1 border-t border-gray-200 dark:border-gray-700 py-16 px-4 sm:px-0">
                <h2 id="related-heading" className="text-xl font-bold text-gray-900">
                    Customers also bought
                </h2>
                <RelatedProducts products={relatedProducts}/>
            </section>
        </main>
    );
};

export default ProductDetail;
