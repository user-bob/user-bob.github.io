'use client'

import React, {ComponentProps, FC, PropsWithChildren} from 'react';
import type {DeepPartial, FlowbiteBoolean} from '../..';
import {Rating, useTheme} from '../..';
import {Card} from '../../../src'
import {mergeDeep} from "@/helpers/merge-deep";
import {twMerge} from "tailwind-merge";

export interface ProductCardTheme {
    root: ProductCardRootTheme;
    rating: ProductCardRatingTheme;
    store: ProductCardStoreTheme;
    title: ProductCardTitleTheme;
    price: ProductCardPriceTheme;
}

export interface ProductCardRootTheme {
    base: string;
    background: FlowbiteBoolean;
}

export interface ProductCardRatingTheme {
    base: string;
    rating: string
    total: string
}

export interface ProductCardStoreTheme {
    base: string;
}

export interface ProductCardTitleTheme {
    base: string;
}

export interface ProductCardPriceTheme {
    base: string;
    previous: FlowbiteBoolean;
    current: string;
    discounted: FlowbiteBoolean;
    percentage: FlowbiteBoolean;
}

export interface ReviewProps {
    rating: number;
    total: number;
}

export interface PriceProps {
    previous?: number;
    current: number;
    percentage?: number;
}

export interface ProductProps {
    imgSrc: string;
    imgAlt: string;
    store: string;
    title: string;
    url: string;
    reviews: ReviewProps
    price: PriceProps;
}

export interface ProductCardProps extends PropsWithChildren<ComponentProps<'div'>> {
    theme?: DeepPartial<ProductCardTheme>;
    product: ProductProps;
}

const ProductComponent: FC<ProductCardProps> = ({
                                                    theme: customTheme = {},
                                                    product,
                                                    children,
                                                    className,
                                                    ...props
                                                }) => {
    const theme = mergeDeep(useTheme().theme.product, customTheme);
    const theirProps = props as object;
    return (
        <Card
            imgAlt={product.imgAlt}
            imgSrc={product.imgSrc}
            href={product.url}
            theme={
                {
                    root: {
                        base: 'flex rounded-lg bg-white dark:bg-gray-900',
                    },
                }
            }
            className={'border border-gray-100 hover:border-gray-300 dark:border-gray-700 hover:dark:border-gray-600'}
            {...theirProps}
        >
            <span className={theme.store.base}>
                {product.store}
            </span>
            <h5 className={theme.title.base}>
                <p>
                    {product.title}
                </p>
            </h5>
            <div className={theme.rating.base}>
                <Rating>
                    {Array.from({length: 5}).map((_, i) => (
                        <Rating.Star key={i}
                                     filled={i < product.reviews.rating}
                        />
                    ))}
                    <span className={twMerge(theme.rating.rating)}>
                    {product.reviews.rating}
                </span>
                </Rating>

            </div>
            <div className={theme.price.base}>
                <span className={twMerge(theme.price.previous[product.price.previous ? 'on' : 'off'])}>
                    ${product.price.previous}
                </span>
                <span className={twMerge(theme.price.current)}>
                    ${product.price.current}
                </span>
                <span
                    className={twMerge(theme.price.percentage[product.price.percentage ? 'on' : 'off'],
                        theme.price.discounted[product.price.previous! > product.price.current ? 'on' : 'off'])}>
                    {product.price.percentage?.toFixed(2)}%
                </span>
            </div>
        </Card>
    );
};

export default ProductComponent;
