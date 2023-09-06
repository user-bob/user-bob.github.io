import type {ComponentProps, FC, PropsWithChildren} from 'react';
import {useState} from 'react';
import type {DeepPartial, FlowbiteBoolean} from '../..';
import {useTheme} from '../..';

import type {FlowbiteNavbarBrandTheme} from './NavbarBrand';
import {NavbarBrand} from './NavbarBrand';
import type {FlowbiteNavbarCollapseTheme} from './NavbarCollapse';
import {NavbarCollapse} from './NavbarCollapse';
import type {FlowbiteNavbarLinkTheme} from './NavbarLink';
import {NavbarLink} from './NavbarLink';
import type {FlowbiteNavbarToggleTheme} from './NavbarToggle';
import {NavbarToggle} from './NavbarToggle';
import {NavbarContext} from './NavbarContext';
import {mergeDeep} from '@/helpers/merge-deep';
import {twMerge} from 'tailwind-merge';
import {NavbarPopoverTheme} from "./NavbarPopover";
import {NavbarUserTheme} from "./NavbarUser";
import type {NavbarTopTheme} from "./NavbarTop";
import {NavbarTop} from "./NavbarTop";

export interface FlowbiteNavbarTheme {
    root: FlowbiteNavbarRootTheme;
    brand: FlowbiteNavbarBrandTheme;
    collapse: FlowbiteNavbarCollapseTheme;
    link: FlowbiteNavbarLinkTheme;
    toggle: FlowbiteNavbarToggleTheme;
    top: NavbarTopTheme;
    popover: NavbarPopoverTheme;
    user: NavbarUserTheme;
}

export interface FlowbiteNavbarRootTheme {
    base: string;
    rounded: FlowbiteBoolean;
    bordered: FlowbiteBoolean;
    inner: {
        base: string;
        fluid: FlowbiteBoolean;
    };
}

export interface NavbarComponentProps extends PropsWithChildren, ComponentProps<'nav'> {
    menuOpen?: boolean;
    fluid?: boolean;
    rounded?: boolean;
    border?: boolean;
    theme?: DeepPartial<FlowbiteNavbarRootTheme>;
}

const NavbarComponent: FC<NavbarComponentProps> = ({
                                                       border,
                                                       children,
                                                       className,
                                                       fluid = false,
                                                       menuOpen,
                                                       rounded,
                                                       theme: customTheme = {},
                                                       ...props
                                                   }) => {
    const [isOpen, setIsOpen] = useState(menuOpen);

    const theme = mergeDeep(useTheme().theme.navbar.root, customTheme);

    return (
        <NavbarContext.Provider value={{isOpen, setIsOpen}}>
            <nav
                className={twMerge(
                    theme.base,
                    theme.bordered[border ? 'on' : 'off'],
                    theme.rounded[rounded ? 'on' : 'off'],
                    className,
                )}
                {...props}
            >
                <NavbarTop/>
                <div className={twMerge(theme.inner.base, theme.inner.fluid[fluid ? 'on' : 'off'])}>
                    {children}
                </div>
            </nav>
        </NavbarContext.Provider>
    );
};

NavbarComponent.displayName = 'Navbar';
NavbarBrand.displayName = 'Navbar.Brand';
NavbarCollapse.displayName = 'Navbar.Collapse';
NavbarLink.displayName = 'Navbar.Link';
NavbarToggle.displayName = 'Navbar.Toggle';

export const Navbar = Object.assign(NavbarComponent, {
    Brand: NavbarBrand,
    Collapse: NavbarCollapse,
    Link: NavbarLink,
    Toggle: NavbarToggle,
});
