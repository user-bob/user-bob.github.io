import React, {Fragment, useState} from "react";
import {Dialog, RadioGroup, Transition} from '@headlessui/react'
import {
    HiCheck,
    HiOutlineCheckBadge,
    HiOutlineShieldCheck,
    HiOutlineXMark,
    HiQuestionMarkCircle,
    HiStar
} from 'react-icons/hi2'
import classNames from "@/utils/class-names";
import Link from "next/link";
import {useTheme} from "@/theme/theme-provider";
import * as ROUTES from "@/constants/routes";

type Props = {
    isRecent?: boolean;
    product: any;
};

const product1 = {
    name: 'Everyday Ruck Snack',
    price: '$220',
    last_price: '$250',
    rating: 3.9,
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-quick-preview-03-detail.jpg',
    imageAlt: 'Interior of light green canvas bag with padded laptop sleeve and internal organization pouch.',
    sizes: [
        {name: '18L', description: 'Perfect for a reasonable amount of snacks.'},
        {name: '20L', description: 'Enough room for a serious amount of snacks.'},
    ],
}
export const Item = ({product, isRecent}: Props) => {
    const {dark} = useTheme();
    const [open, setOpen] = useState(false)
    const [selectedSize, setSelectedSize] = useState(product1.sizes[0])
    return (
        <div
            className="inline-flex flex-col text-center">
            <div className="group relative">
                <div
                    className="w-full rounded-md overflow-hidden aspect-w-1 aspect-h-1">
                    <div className="absolute z-10 inset-y-3/4 px-5 bottom-0 hidden group-hover:block">
                        <button type="button"
                                className={'bg-gray-50 bg-opacity-75 dark:bg-gray-500 dark:bg-opacity-60 rounded-lg w-full py-2 text-gray-500 dark:text-gray-300'}
                                onClick={() => setOpen(true)}>
                            Quick Preview
                        </button>
                    </div>
                    <Link href={`${ROUTES.PRODUCTS}/${product.id}`}>
                        <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="w-full h-full object-center object-cover group-hover:opacity-75"
                        />
                    </Link>
                </div>
                <Link href={`${ROUTES.PRODUCTS}/${product.id}`}>
                    <div className="mt-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{product.store}</p>
                        <h3 className="mt-1 text-base font-medium text-gray-900 dark:text-gray-300">
                            <Link href={product.href}>
                                <span className="absolute inset-0"/>
                                {product.title}
                            </Link>
                        </h3>
                        <div className="pt-4 flex justify-center">
                            <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                    <HiStar
                                        key={rating}
                                        className={classNames(
                                            product.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                                            'h-5 w-5 flex-shrink-0'
                                        )}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                            <span
                                className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 ml-3">{product.rating}.0</span>

                        </div>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{product.reviewCount} reviews</p>
                    </div>
                </Link>
            </div>
            <div className="mt-4 flex flex-grow text-center">
                <p className="text-xl flex-1 font-bold text-gray-900 dark:text-gray-100">{product.price}</p>
                {
                    (product.lastPrice !== product.price && isRecent) &&
                    <p className="text-base text-gray-500 dark:text-gray-400 line-through">{product.lastPrice}</p>
                }
            </div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className={classNames(
                    dark
                        ? 'dark'
                        : '', "fixed z-10 inset-0 overflow-y-auto")} onClose={setOpen}>
                    <div className="flex min-h-screen text-center md:block md:px-2 lg:px-4" style={{fontSize: 0}}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay
                                className="hidden fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity md:block"/>
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">
            &#8203;
          </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            enterTo="opacity-100 translate-y-0 md:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 md:scale-100"
                            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        >
                            <div
                                className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
                                <div
                                    className="w-full relative flex rounded-xl items-center bg-white dark:bg-gray-900 px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                    <button
                                        type="button"
                                        className="absolute top-4 right-4 text-gray-400 dark:hover:text-gray-300 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <HiOutlineXMark className="h-6 w-6" aria-hidden="true"/>
                                    </button>

                                    <div
                                        className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                                        <div className="sm:col-span-4 lg:col-span-5">
                                            <div
                                                className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden">
                                                <img src={product.imageSrc}
                                                     alt={product.imageAlt}
                                                     className="object-center object-cover"/>
                                            </div>
                                            <div className="mt-4 grid grid-cols-3 gap-4">
                                                {[1, 2, 3].map((value, index, array) => (
                                                    <img
                                                        key={index}
                                                        src={`https://flowbite.s3.amazonaws.com/docs/gallery/square/image-${value}.jpg`}
                                                        alt={product.imageAlt}
                                                        className="object-center object-cover h-auto max-w-full rounded-lg"/>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="sm:col-span-8 lg:col-span-7">
                                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 sm:pr-12">{product.title}</h2>

                                            <section aria-labelledby="information-heading" className="mt-2">
                                                <h3 id="information-heading" className="sr-only">
                                                    Product information
                                                </h3>
                                                <div className="flex items-center">
                                                    <HiOutlineCheckBadge className="flex-shrink-0 w-5 h-5 text-blue-500"
                                                                         aria-hidden="true"/>
                                                    <p className="ml-2 font-medium text-gray-500 dark:text-gray-400">Amazon
                                                        - trusted store</p>
                                                </div>
                                                <div className="mt-2 flex items-center">
                                                    <p className="text-lg text-gray-900 dark:text-gray-100 sm:text-xl">{product.price}</p>

                                                    <div className="ml-4 pl-4 border-l border-gray-300">
                                                        <h4 className="sr-only">Reviews</h4>
                                                        <div className="flex items-center">
                                                            <div className="flex items-center">
                                                                {[0, 1, 2, 3, 4].map((rating) => (
                                                                    <HiStar
                                                                        key={rating}
                                                                        className={classNames(
                                                                            product.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                                                                            'h-5 w-5 flex-shrink-0'
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                ))}
                                                            </div>
                                                            <span
                                                                className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 ml-3">{product.rating}.0</span>
                                                            <p className="ml-1 text-sm text-gray-500 dark:text-[#f1f1f1]">{product.reviewCount} reviews</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex items-center">
                                                    <HiCheck className="flex-shrink-0 w-5 h-5 text-green-500"
                                                             aria-hidden="true"/>
                                                    <p className="ml-2 font-medium text-gray-500 dark:text-gray-400">In
                                                        stock and ready
                                                        to
                                                        ship</p>
                                                </div>
                                            </section>

                                            <section aria-labelledby="options-heading" className="mt-6">
                                                <h3 id="options-heading" className="sr-only">
                                                    Product options
                                                </h3>

                                                <div className="sm:flex sm:justify-between">
                                                    {/* Size selector */}
                                                    <RadioGroup value={selectedSize} onChange={setSelectedSize}>
                                                        <RadioGroup.Label
                                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Size
                                                        </RadioGroup.Label>
                                                        <div
                                                            className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                            {product1.sizes.map((size) => (
                                                                <RadioGroup.Option
                                                                    as="div"
                                                                    key={size.name}
                                                                    value={size}
                                                                    className={({active}) =>
                                                                        classNames(
                                                                            active ? 'ring-2 ring-indigo-500' : '',
                                                                            'relative block border border-gray-300 dark:border-gray-600 rounded-lg p-4 cursor-pointer focus:outline-none'
                                                                        )
                                                                    }
                                                                >
                                                                    {({active, checked}) => (
                                                                        <>
                                                                            <RadioGroup.Label as="p"
                                                                                              className="text-base font-medium text-gray-900 dark:text-gray-100">
                                                                                {size.name}
                                                                            </RadioGroup.Label>
                                                                            <RadioGroup.Description as="p"
                                                                                                    className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                                                {size.description}
                                                                            </RadioGroup.Description>
                                                                            <div
                                                                                className={classNames(
                                                                                    active ? 'border' : 'border-2',
                                                                                    checked ? 'border-indigo-500' : 'border-transparent',
                                                                                    'absolute -inset-px rounded-lg pointer-events-none'
                                                                                )}
                                                                                aria-hidden="true"
                                                                            />
                                                                        </>
                                                                    )}
                                                                </RadioGroup.Option>
                                                            ))}
                                                        </div>
                                                    </RadioGroup>
                                                </div>
                                                <div className="mt-4 flex">
                                                    <Link href="#"
                                                          className="group flex text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 dark:text-gray-400">
                                                        <span>What size should I buy?</span>
                                                        <HiQuestionMarkCircle
                                                            className="flex-shrink-0 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                                                            aria-hidden="true"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="mt-6">
                                                    <Link
                                                        href={`${ROUTES.PRODUCTS}/${product.id}`}
                                                        className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                                                    >
                                                        View full details
                                                    </Link>
                                                </div>
                                                <div className="mt-6 text-center">
                                                    <Link href="#"
                                                          className="group inline-flex text-base font-medium">
                                                        <HiOutlineShieldCheck
                                                            className="flex-shrink-0 mr-2 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                            aria-hidden="true"
                                                        />
                                                        <span
                                                            className="text-gray-500 group-hover:text-gray-700">Lifetime Guarantee</span>
                                                    </Link>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
}
