import type {ComponentProps, FC, PropsWithChildren} from 'react';

import {DropdownDivider} from './DropdownDivider';
import {twMerge} from 'tailwind-merge';
import {useTheme} from '../..';

export interface FlowbiteDropdownHeaderTheme {
    header: string;
}

export const DropdownHeader: FC<PropsWithChildren & ComponentProps<'div'>> = ({children, className, ...props}) => {
    const theme = useTheme().theme.dropdown.floating.header;

    return (
        <>
            <div className={twMerge(theme, className)} {...props}>
                {children}
            </div>
            <DropdownDivider/>
        </>
    );
};
