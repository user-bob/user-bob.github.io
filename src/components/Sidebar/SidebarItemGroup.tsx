import type {ComponentProps, FC, PropsWithChildren} from 'react';

import {SidebarItemContext} from './SidebarItemContext';
import {twMerge} from 'tailwind-merge';
import {useTheme} from '../..';

export interface SidebarItemGroupProps extends PropsWithChildren, ComponentProps<'ul'> {
}

export const SidebarItemGroup: FC<SidebarItemGroupProps> = ({children, className, ...props}) => {
    const theme = useTheme().theme.sidebar.itemGroup;

    return (
        <ul data-testid="flowbite-sidebar-item-group" className={twMerge(theme, className)} {...props}>
            <SidebarItemContext.Provider value={{isInsideCollapse: false}}>{children}</SidebarItemContext.Provider>
        </ul>
    );
};

SidebarItemGroup.displayName = 'Sidebar.ItemGroup';
