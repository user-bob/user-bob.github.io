import type {ComponentProps, FC} from 'react';

import type {DeepPartial, FlowbiteBoolean} from '../..';
import {useTheme} from '../..';
import {FaBars} from 'react-icons/fa';
import {mergeDeep} from '@/helpers/merge-deep';
import {twMerge} from 'tailwind-merge';
import {useNavbarContext} from './NavbarContext';
import {useSearchContext} from "@/components/Search/SearchContext";

export interface FlowbiteNavbarToggleTheme {
    base: string;
    icon: string;
    isSearchPage: FlowbiteBoolean;
}

export interface NavbarToggleProps extends ComponentProps<'button'> {
    barIcon?: FC<ComponentProps<'svg'>>;
    theme?: DeepPartial<FlowbiteNavbarToggleTheme>;
}

export const NavbarToggle: FC<NavbarToggleProps> = ({
                                                        barIcon: BarIcon = FaBars,
                                                        className,
                                                        theme: customTheme = {},
                                                        ...props
                                                    }) => {
    const {isOpen, setIsOpen} = useNavbarContext();
    const {isSearchPage} = useSearchContext();
    const theme = mergeDeep(useTheme().theme.navbar.toggle, customTheme);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <button
            data-testid="flowbite-navbar-toggle"
            onClick={handleClick}
            className={twMerge(theme.base, theme.isSearchPage[isSearchPage ? 'on' : 'off'], className)}
            {...props}
        >
            <span className="sr-only">Open main menu</span>
            <BarIcon aria-hidden className={theme.icon}/>
        </button>
    );
};
