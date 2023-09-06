import React, {ComponentProps, FC} from 'react';
import {Avatar, DeepPartial, PopoverComponent, useTheme} from "@/components";
import {mergeDeep} from "@/helpers/merge-deep";
import {HiGift} from "react-icons/hi2";
import {BiSolidCoupon} from "react-icons/bi";
import {RiProductHuntFill} from "react-icons/ri";
import {twMerge} from "tailwind-merge";
import Link from "next/link";
import {signOut} from "next-auth/react";

export interface NavbarUserTheme {
    root: NavbarUserRootTheme;
    header: NavbarUserHeaderTheme;
    list: NavbarUserListTheme;
}

export interface NavbarUserRootTheme {
    base: string;
}

export interface NavbarUserHeaderTheme {
    base: string;
    name: string;
    email: string;
}

export interface NavbarUserListTheme {
    base: string;
    item: NavbarUserListItemTheme;
}

export interface NavbarUserListItemTheme {
    text: string;
    icon: string;
}

export interface NavbarUserProps extends ComponentProps<'button'> {
    theme?: DeepPartial<NavbarUserTheme>;
    themes?: string[];
}

export const NavbarUser: FC<NavbarUserProps> = (
    {className, theme: customTheme = {}, ...props}
) => {
    const theme = mergeDeep(useTheme().theme.navbar.user, customTheme);

    return (
        <PopoverComponent
            handler={
                <button>
                    <Avatar alt="User settings" rounded/>
                </button>
            }
            animate={{
                mount: {
                    y: 0, scale: 1, opacity: 1, transition: {
                        type: "spring",
                        bounce: 0.3,
                        duration: 0.7,
                    }
                },
                unmount: {
                    y: -170, scale: 0, opacity: 0, transition: {
                        type: "spring",
                        bounce: 0,
                        duration: 0.4
                    }
                },
            }}
            offset={16}
            className={theme.root.base}
        >
            <div className={theme.header.base}>
                <span className={theme.header.name}>Neil sims</span>
                <span
                    className={theme.header.email}>name@flowbite.com</span>
            </div>
            <ul className={theme.list.base} aria-labelledby="dropdown">
                <li>
                    <Link href="/profile"
                          className={twMerge(theme.list.item.text, 'block')}>My
                        profile</Link>
                </li>
                <li>
                    <Link href="/settings"
                          className={twMerge(theme.list.item.text, 'block')}>Account
                        settings</Link>
                </li>
                <li>
                    <Link href="/tracked-products"
                          className={twMerge(theme.list.item.text, 'block')}>Tracked products</Link>
                </li>
            </ul>
            <ul className={theme.list.base} aria-labelledby="dropdown">
                <li>
                    <Link href="#"
                          className={twMerge(theme.list.item.text, 'flex items-center ')}>
                        <HiGift className={theme.list.item.icon}/>
                        Gift Cards</Link>
                </li>
                <li>
                    <Link href="#"
                          className={twMerge(theme.list.item.text, 'flex items-center ')}>
                        <BiSolidCoupon className={theme.list.item.icon}/>
                        Coupons</Link>
                </li>
                <li>
                    <Link href="#"
                          className={twMerge(theme.list.item.text, 'flex items-center ')}>
                        <RiProductHuntFill className={theme.list.item.icon}/>Points
                    </Link>
                </li>

            </ul>
            <ul className={theme.list.base} aria-labelledby="dropdown">
                <li>
                    <button
                        onClick={() => signOut()}
                        className={twMerge(theme.list.item.text, 'block w-full text-start')}>Sign out
                    </button>
                </li>
            </ul>
        </PopoverComponent>
    );
};
