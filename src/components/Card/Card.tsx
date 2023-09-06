import type {ComponentProps, FC, PropsWithChildren} from 'react';
import type {DeepPartial, FlowbiteBoolean} from '../..';
import {useTheme} from '../..';

import {mergeDeep} from '@/helpers/merge-deep';
import {twMerge} from 'tailwind-merge';

export interface FlowbiteCardTheme {
    root: FlowbiteCardRootTheme;
    img: FlowbiteCardImageTheme;
}

export interface FlowbiteCardRootTheme {
    base: string;
    children: string;
    horizontal: FlowbiteBoolean;
    href: string;
}

export interface FlowbiteCardImageTheme {
    base: string;
    image: string;
    horizontal: FlowbiteBoolean;
}

export interface CardProps extends PropsWithChildren<ComponentProps<'div'>> {
    horizontal?: boolean;
    href?: string;
    imgAlt?: string;
    imgSrc?: string;
    theme?: DeepPartial<FlowbiteCardTheme>;
}

export const Card: FC<CardProps> = ({
                                        children,
                                        className,
                                        horizontal,
                                        href,
                                        imgAlt,
                                        imgSrc,
                                        theme: customTheme = {},
                                        ...props
                                    }) => {
    const Component = typeof href === 'undefined' ? 'div' : 'a';
    const theirProps = props as object;

    const theme = mergeDeep(useTheme().theme.card, customTheme);

    return (
        <Component
            data-testid="flowbite-card"
            href={href}
            className={twMerge(
                theme.root.base,
                theme.root.horizontal[horizontal ? 'on' : 'off'],
                href && theme.root.href,
                className,
            )}
            {...theirProps}
        >
            {imgSrc && (
                <div className={twMerge(theme.img.base)}>
                    <img
                        alt={imgAlt ?? ''}
                        src={imgSrc}
                        className={twMerge(theme.img.image, theme.img.horizontal[horizontal ? 'on' : 'off'])}
                    />
                </div>
            )}
            <div className={theme.root.children}>{children}</div>
        </Component>
    );
};

Card.displayName = 'Card';
