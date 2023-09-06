/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import type {ComponentProps, FC, PropsWithChildren} from 'react';

import type {DeepPartial} from '../..';
import {useTheme} from '../..';
import {mergeDeep} from '../../helpers/merge-deep';
import {twMerge} from 'tailwind-merge';

export interface FlowbiteDropdownItemTheme {
    base: string;
    icon: string;
}

export interface DropdownItemProps extends PropsWithChildren, ComponentProps<'li'> {
    icon?: FC<ComponentProps<'svg'>>;
    onClick?: () => void;
    theme?: DeepPartial<FlowbiteDropdownItemTheme>;
}

export const DropdownItem: FC<DropdownItemProps> = ({
                                                        children,
                                                        className,
                                                        icon: Icon,
                                                        onClick,
                                                        theme: customTheme = {},
                                                        ...props
                                                    }) => {
    const theme = mergeDeep(useTheme().theme.dropdown.floating.item, customTheme);

    return (
        <li className={twMerge(theme.base, className)} onClick={onClick} {...props}>
            {Icon && <Icon className={theme.icon}/>}
            {children}
        </li>
    );
};
