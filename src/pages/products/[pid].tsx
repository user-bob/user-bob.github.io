import { useRouter } from 'next/router'
import {Disclosure, Tab, Transition} from '@headlessui/react'
import classNames from "@/utils/class-names";
import {HiChevronDown} from "react-icons/hi2";
import BuyingOptionsTable from "@/components/tables/buying-options";
import LineGraph from "@/components/charts/line";
import * as CONST from "@/constants/colors";

const breadcrumbs = [{id: 1, name: 'Electronics', href: '#'}]
const product = {
    name: 'Zip Tote Basket',
    price: '$140',
    rating: 4,
    reviewCount: 64,
    images: [
        {
            id: 1,
            name: 'Angled view',
            src: 'https://source.unsplash.com/featured?mackbook',
            alt: 'Angled front view with bag zipped and handles upright.',
        },
        {
            id: 2,
            name: 'Angled view',
            src: 'https://source.unsplash.com/featured?chromebook',
            alt: 'Angled front view with bag zipped and handles upright.',
        },
        {
            id: 3,
            name: 'Angled view',
            src: 'https://source.unsplash.com/featured?ipad',
            alt: 'Angled front view with bag zipped and handles upright.',
        },
        {
            id: 4,
            name: 'Angled view',
            src: 'https://source.unsplash.com/featured?watch',
            alt: 'Angled front view with bag zipped and handles upright.',
        },
        // More images...
    ],
    colors: [
        {name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700'},
        {name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400'},
        {name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500'},
    ],
    description: `The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.`,
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
const relatedProducts = [
    {
        id: 1,
        name: 'Zip Tote Basket',
        color: 'White and black',
        href: '#',
        src: 'https://source.unsplash.com/featured?bag',
        imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
        price: '$140',
    }, {
        id: 2,
        name: 'Zip Tote Basket',
        color: 'White and black',
        href: '#',
        src: 'https://source.unsplash.com/featured?iphone',
        imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
        price: '$140',
    }, {
        id: 3,
        name: 'Zip Tote Basket',
        color: 'White and black',
        href: '#',
        src: 'https://source.unsplash.com/featured?samsung',
        imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
        price: '$140',
    }, {
        id: 4,
        name: 'Zip Tote Basket',
        color: 'White and black',
        href: '#',
        src: 'https://source.unsplash.com/featured?macbook',
        imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
        price: '$140',
    },
    // More products...
]

const Product = () => {
    const router = useRouter()
    const { pid } = router.query

    return (
        <div>
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ol role="list" className="flex items-center space-x-4 py-4">
                        {breadcrumbs.map((breadcrumb) => (
                            <li key={breadcrumb.id}>
                                <div className="flex items-center">
                                    <a href={breadcrumb.href} className="mr-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                                        {breadcrumb.name}
                                    </a>
                                    <svg
                                        viewBox="0 0 6 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className="h-5 w-auto text-gray-300"
                                    >
                                        <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor"/>
                                    </svg>
                                </div>
                            </li>
                        ))}
                        <li className="text-sm">
                            <a href="#" aria-current="page" className="font-medium text-gray-500 dark:text-gray-400 hover:text-gray-600">
                                Appliances
                            </a>
                        </li>
                    </ol>
                </nav>
            </div>
            <main className="max-w-7xl mx-auto p-4 sm:pt-8 sm:px-6 lg:px-4">
                <div className="md:grid md:grid-cols-2 md:gap-x-8">
                    <div className={'flex flex-col space-y-8'}>
                        <h1 className="text-2xl tracking-tight text-gray-900 dark:text-white">{product.name}</h1>
                        <Tab.Group as="div" className="flex flex-col-reverse">
                            {/* Image selector */}
                            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block md:max-w-none">
                                <Tab.List className="grid grid-cols-4 gap-6">
                                    {product.images.map((image) => (
                                        <Tab
                                            key={image.id}
                                            className="relative h-24 rounded-md flex items-center justify-center text-sm font-medium uppercase cursor-pointer focus:outline-none"
                                        >
                                            {({selected}) => (
                                                <>
                                                    <span className="sr-only">{image.name}</span>
                                                    <span className="absolute inset-0 rounded-md overflow-hidden">
                                                        <img src={image.src} alt="" className="w-full h-full object-cover"/>
                                                    </span>
                                                    <span
                                                        className={classNames(
                                                            selected ? 'ring-indigo-500' : 'ring-transparent',
                                                            'absolute inset-0 rounded-md ring-2 pointer-events-none'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </>
                                            )}
                                        </Tab>
                                    ))}
                                </Tab.List>
                            </div>

                            <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
                                {product.images.map((image) => (
                                    <Tab.Panel key={image.id}>
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-full object-center object-cover rounded-lg"
                                        />
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </Tab.Group>
                        <div className={'block mt-6'}>
                            <div className="max-w-fit rounded-full border border-gray-300 dark:border-gray-500 text-gray-600 dark:text-gray-400">
                                <div className="flex space-x-8 px-4 py-1 items-center">
                                    <span className="text-base text-gray-700 dark:text-gray-300">Capacity</span>
                                    <HiChevronDown/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <LineGraph />
                        <section aria-labelledby="details-heading" className="mt-12 ml-8">
                            <h2 id="details-heading" className="sr-only">
                                Product Features
                            </h2>
                            <div className="border-t border-gray-300 dark:border-gray-700">
                                {product.details.map((detail, index) => (
                                    <div key={index} className="mt-8 pb-6 prose prose-sm dark:text-gray-400">
                                        <ul role="list">
                                            {detail.items.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
                <div className="mt-12 flex flex-col space-y-8">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Product Details</h2>
                        <div className="mt-2 prose prose-sm dark:text-gray-400">
                            {product.description}
                        </div>
                    </div>
                    <BuyingOptionsTable/>
                </div>
                <div className="max-w-4xl mx-auto lg:max-w-none">
                    {/*Related products */}
                    <section aria-labelledby="related-heading"
                             className="mt-10 md:mt-16 border-t border-gray-200 dark:border-gray-700 py-16 px-4 sm:px-0">
                        <h2 id="related-heading" className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            Customers also bought
                        </h2>

                        <div
                            className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                            {relatedProducts.map((product) => (
                                <div key={product.id}>
                                    <div className="relative">
                                        <div className="relative w-full h-72 rounded-lg overflow-hidden">
                                            <img
                                                src={product.src}
                                                alt={product.imageAlt}
                                                className="w-full h-full object-center object-cover"
                                            />
                                        </div>
                                        <div className="relative mt-4">
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{product.name}</h3>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{product.color}</p>
                                        </div>
                                        <div
                                            className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                                            <div
                                                aria-hidden="true"
                                                className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                                            />
                                            <p className="relative text-lg font-semibold text-white">{product.price}</p>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <a
                                            href={product.href}
                                            className={`relative flex bg-gray-100 ${CONST.DARK_BG_ALT5} border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 dark:text-gray-200 dark:hover:bg-[#353A41] hover:bg-gray-200`}
                                        >
                                            View Full details<span className="sr-only">, {product.name}</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default Product