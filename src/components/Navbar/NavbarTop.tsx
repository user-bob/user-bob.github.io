import React, {ComponentProps, FC, PropsWithChildren} from 'react';
import {DeepPartial, useTheme} from '../..';

import {mergeDeep} from '@/helpers/merge-deep';
import {HiChevronDown} from "react-icons/hi";
import {LoginHandler} from "@/components/Login/LoginHandler";

const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']

export interface NavbarTopTheme {
    root: NavbarTopRootTheme;
}

export interface NavbarTopRootTheme {
    base: string;
    inner: NavbarTopInnerTheme;
}

export interface NavbarTopInnerTheme {
    base: string;
}

export interface NavbarTopProps extends PropsWithChildren<ComponentProps<'div'>> {
    theme?: DeepPartial<NavbarTopTheme>;
}

export const NavbarTop: FC<NavbarTopProps> = ({
                                                  children,
                                                  className,
                                                  theme: customTheme = {},
                                              }) => {
    const theme = mergeDeep(useTheme().theme.navbar.top.root, customTheme);
    return (
        <div className={theme.base}>
            <div className={theme.inner.base}>
                {/* Currency selector */}
                <form className="hidden lg:block lg:flex-1">
                    <div className="flex">
                        <label htmlFor="desktop-currency" className="sr-only">
                            Currency
                        </label>
                        <div
                            className="-ml-2 group relative bg-gray-900 border-transparent rounded-md focus-within:ring-2 focus-within:ring-gray-700">
                            <select
                                id="desktop-currency"
                                name="currency"
                                className="bg-none bg-gray-900 border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-white group-hover:text-gray-100 focus:outline-none focus:ring-0 focus:border-transparent"
                            >
                                {currencies.map((currency) => (
                                    <option key={currency}>{currency}</option>
                                ))}
                            </select>
                            <div className="absolute right-0 inset-y-0 flex items-center pointer-events-none">
                                <HiChevronDown className="h-5 w-5 text-gray-300"/>
                            </div>
                        </div>
                    </div>
                </form>

                <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">
                    Get free delivery on orders over $100
                </p>

                <NavbarLoginButtons/>
            </div>
        </div>
    );
};


const NavbarLoginButtons: FC = () => {
    return (
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
            <LoginHandler text={'Create an account'} className={'text-sm font-medium text-white hover:text-gray-100'}/>
            <span className="h-6 w-px bg-gray-600" aria-hidden="true"/>
            <LoginHandler className={'text-sm font-medium text-white hover:text-gray-100'}/>
        </div>
    );
}