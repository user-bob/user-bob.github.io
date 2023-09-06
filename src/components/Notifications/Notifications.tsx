"use client"

import React, {ComponentProps, FC} from 'react';
import {twMerge} from "tailwind-merge";
import {HiBell, HiOutlineEye} from "react-icons/hi2";
import {DeepPartial, PopoverComponent, useTheme} from '../..';
import {mergeDeep} from "@/helpers/merge-deep";
import Link from "next/link";

export interface NotificationsTheme {
    root: string;
    button: NotificationButtonTheme;
    header: NotificationHeaderTheme;
    body: NotificationBodyTheme;
    viewAll: NotificationViewAllTheme;
}

export interface NotificationHeaderTheme {
    base: string;
    title: string;
}

export interface NotificationBodyTheme {
    base: string;
    item: NotificationItemTheme;
}

export interface NotificationViewAllTheme {
    base: string;
    icon: string;
    link: string;
}

export interface NotificationButtonTheme {
    base: string;
    icon: string;
}

export interface NotificationItemTheme {
    base: string;
    img: string;
    title: string;
    message: string;
    time: string;
}

export interface NotificationsComponentProps extends ComponentProps<'button'> {
    theme?: DeepPartial<NotificationsTheme>;
    notifications?: any[];
}

export const NotificationsComponent: FC<NotificationsComponentProps> = ({
                                                                            className,
                                                                            theme: customTheme = {},
                                                                            notifications = [],
                                                                            ...props
                                                                        }) => {
    const theme = mergeDeep(useTheme().theme.notifications, customTheme);
    return (
        <PopoverComponent
            handler={
                <button className={twMerge(theme.button.base, className)}>
                    <HiBell className="w-6 h-6"/>
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
                    y: -245, scale: 0, opacity: 0, transition: {
                        type: "spring",
                        bounce: 0,
                        duration: 0.4
                    }
                },
            }}
            className={theme.root}
            offset={16}
        >
            <div className={theme.header.base}>
                <h2 className={theme.header.title}>
                    Notifications
                </h2>
            </div>
            <div className={theme.body.base}>
                {notifications.map((item) => (
                    <div
                        key={item.id}
                        className={theme.body.item.base}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={item.product.imgSrc}
                            alt={item.product.imgAlt}
                            className={theme.body.item.img}
                        />
                        <div>
                            <a
                                href={item.product.url}
                                className={theme.body.item.title}
                            >
                                <span className="absolute inset-0"/>
                                {item.product.title}
                            </a>
                            <p className={theme.body.item.message}>
                                {item.message}
                            </p>
                            <p className={theme.body.item.time}>
                                {item.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={theme.viewAll.base}>
                <Link
                    href={"/notifications"}
                    className={theme.viewAll.link}
                >
                    <HiOutlineEye
                        className={theme.viewAll.icon}
                        aria-hidden="true"
                    />
                    <span className="ml-2">View all</span>
                </Link>
            </div>
        </PopoverComponent>
    );
};
