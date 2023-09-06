import React, {FC} from "react";
import {HiCheckCircle} from "react-icons/hi2";
import {twMerge} from "tailwind-merge";
import {HiStar} from "react-icons/hi";
import {motion} from "framer-motion";

interface bestBuyingOptionProp {
    option: {
        store: string,
        price: number,
        link: string,
        tax: number,
        shipping: number,
        deliveryEstimate: string,
        returnPolicy: string,
        trusted: boolean,
        rating: number,
        reviews: number,
        currency: string,
    }
}

export const BestBuyingOption: FC<bestBuyingOptionProp> = ({option}) => {
    return (
        <motion.a
            whileHover={{scale: 1.05}}
            transition={{type: "spring", stiffness: 200, damping: 10}}
            href={option.link}
            target={'_blank'}
            className="max-w-sm hover:bg-gray-50 dark:hover:bg-gray-800 shadow flex border border-gray-200 rounded-lg overflow-hidden dark:border-gray-700 p-3">
            <div
                className="flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-300">
                <p className="text-base font-medium text-gray-900 dark:text-white">
                    {option.store}
                </p>
                <h3 className={'text-2xl font-semibold text-gray-900 dark:text-white'}>
                    {option.currency}{option.price}
                </h3>
                <p>
                    +{option.currency}{option.tax} est. tax
                </p>
                <p>
                    {option.currency}{option.shipping} shipping fee
                </p>
                <p>
                    {option.deliveryEstimate} delivery time
                </p>
                <p>
                    {option.returnPolicy}
                </p>
                <p>
                    <HiCheckCircle
                        className={twMerge(
                            option.trusted ? 'text-blue-500' : 'text-red-500',
                            'h-4 w-4 inline-block'
                        )}
                        aria-hidden="true"
                    /> {option.trusted ? 'Trusted seller' : 'Untrusted seller'}
                    <span className={'ml-1'}>
                                            {" · "}</span>
                    <span className={'ml-1'}>{option.rating + '/5'}{' '}
                        <HiStar
                            className={twMerge(
                                option.trusted ? 'text-green-500' : 'text-red-500',
                                'h-4 w-4 inline-block'
                            )}
                            aria-hidden="true"
                        />
                                            <span className={'ml-1'}>({option.reviews})</span>
                                        </span>
                </p>
            </div>
            <div className="flex-shrink-0 mt-4">
                <a href={option.link}
                   className="font-medium px-4 py-2.5 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-500 hover:text-blue-600 dark:bg-blue-600 dark:text-blue-50 hover:dark:text-white hover:dark:bg-blue-500">
                    Shop now<span aria-hidden="true"> &rarr;</span>
                </a>
            </div>
        </motion.a>
    )
}