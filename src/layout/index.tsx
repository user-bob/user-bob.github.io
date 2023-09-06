"use client"

import React, {FC, PropsWithChildren} from 'react';

import {Flowbite} from "../../src";
import {SiteFooter} from "./footer";
import {SiteHeader} from "./header";
import {NotificationAlert} from "@/components/Notifications/NotificationAlert";
import {OneTap} from "@/components/OneTap";

const SiteLayout: FC<PropsWithChildren> = ({children}) => {
    return (
        <Flowbite>
            <OneTap>
                <OneTap.Handler/>
            </OneTap>
            <header>
                <SiteHeader/>
            </header>
            <main className={'w-full min-h-[100vh] py-6'}>
                {children}
            </main>
            <footer>
                <SiteFooter/>
            </footer>
            <NotificationAlert message={{
                title: 'Hello World!!! This is a test message for the notification alert.',
                message: 'This is a test message for the notification alert. It should be displayed in the upper right corner of the screen.',
                img: '/images/products/room.jpeg'
            }} show={false}/>
        </Flowbite>
    );
};

export default SiteLayout;
