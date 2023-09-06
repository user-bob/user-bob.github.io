import type {ComponentProps, FC} from 'react';

import type {FlowbiteBreadcrumbItemTheme} from './BreadcrumbItem';
import {BreadcrumbItem} from './BreadcrumbItem';
import type {DeepPartial} from '../..';
import {useTheme} from '../..';
import {mergeDeep} from '../../helpers/merge-deep';
import {twMerge} from 'tailwind-merge';

export interface FlowbiteBreadcrumbTheme {
    root: FlowbiteBreadcrumbRootTheme;
    item: FlowbiteBreadcrumbItemTheme;
}

export interface FlowbiteBreadcrumbRootTheme {
    base: string;
    list: string;
}

export interface BreadcrumbComponentProps extends ComponentProps<'nav'> {
    theme?: DeepPartial<FlowbiteBreadcrumbRootTheme>;
}

const BreadcrumbComponent: FC<BreadcrumbComponentProps> = ({
                                                               children,
                                                               className,
                                                               theme: customTheme = {},
                                                               ...props
                                                           }) => {
    const theme = mergeDeep(useTheme().theme.breadcrumb.root, customTheme);

    return (
        <nav aria-label="Breadcrumb" className={twMerge(theme.base, className)} {...props}>
            <ol className={theme.list}>{children}</ol>
        </nav>
    );
};

BreadcrumbComponent.displayName = 'Breadcrumb';
export const Breadcrumb = Object.assign(BreadcrumbComponent, {Item: BreadcrumbItem});
