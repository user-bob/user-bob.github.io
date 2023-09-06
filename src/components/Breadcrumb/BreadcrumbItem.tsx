import type {ComponentProps, FC, PropsWithChildren} from 'react';
import {forwardRef} from 'react';
import type {DeepPartial, FlowbiteBoolean} from '../..';
import {useTheme} from '../..';

import {HiOutlineChevronRight} from 'react-icons/hi';
import {mergeDeep} from '../../helpers/merge-deep';
import {twMerge} from 'tailwind-merge';

export interface FlowbiteBreadcrumbItemTheme {
    base: string;
    chevron: string;
    href: FlowbiteBoolean;
    icon: string;
}

export interface BreadcrumbItemProps extends PropsWithChildren<Omit<ComponentProps<'li'>, 'ref'>> {
    href?: string;
    icon?: FC<ComponentProps<'svg'>>;
    theme?: DeepPartial<FlowbiteBreadcrumbItemTheme>;
}

export const BreadcrumbItem = forwardRef<HTMLAnchorElement | HTMLSpanElement, BreadcrumbItemProps>(
    ({children, className, href, icon: Icon, theme: customTheme = {}, ...props}, ref) => {
        const isLink = typeof href !== 'undefined';
        const Component = isLink ? 'a' : 'span';

        const theme = mergeDeep(useTheme().theme.breadcrumb.item, customTheme);

        return (
            <li className={twMerge(theme.base, className)} {...props}>
                <HiOutlineChevronRight aria-hidden className={theme.chevron}
                                       data-testid="flowbite-breadcrumb-separator"/>
                <Component
                    ref={ref as never}
                    className={theme.href[isLink ? 'on' : 'off']}
                    data-testid="flowbite-breadcrumb-item"
                    href={href}
                >
                    {Icon && <Icon aria-hidden className={theme.icon}/>}
                    {children}
                </Component>
            </li>
        );
    },
);

BreadcrumbItem.displayName = 'Breadcrumb.Item';
