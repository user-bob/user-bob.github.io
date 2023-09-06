import type {ComponentProps, FC, PropsWithChildren} from 'react';

import type {DeepPartial} from '../..';
import {useTheme} from '../..';
import type {FlowbiteFooterLinkTheme} from './FooterLink';
import {mergeDeep} from '../../helpers/merge-deep';
import {twMerge} from 'tailwind-merge';

export interface FlowbiteFooterLinkGroupTheme {
    base: string;
    link: FlowbiteFooterLinkTheme;
    col: string;
}

export interface FooterLinkGroupProps extends PropsWithChildren, ComponentProps<'ul'> {
    col?: boolean;
    theme?: DeepPartial<FlowbiteFooterLinkGroupTheme>;
}

export const FooterLinkGroup: FC<FooterLinkGroupProps> = ({
                                                              children,
                                                              className,
                                                              col = false,
                                                              theme: customTheme = {},
                                                              ...props
                                                          }) => {
    const theme = mergeDeep(useTheme().theme.footer.groupLink, customTheme);

    return (
        <ul data-testid="footer-groupLink" className={twMerge(theme.base, col && theme.col, className)} {...props}>
            {children}
        </ul>
    );
};
