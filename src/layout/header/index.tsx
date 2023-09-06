import React, {FC} from "react";
import {Navbar, Search} from "../../../src";
import Link from "next/link";
import {MobileSidebar, NavbarIcons, NavbarPopovers} from "./navbar";
import {Login} from "@/components/Login";
import {LoginContent} from "@/components/Login/LoginContent";

export const SiteHeader: FC = () => {
    return (
        <Login>
            <Search paletteOpen={false}>
                <Navbar
                    theme={{
                        base: 'sticky top-0 z-40 bg-white flex-col dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 flex items-center  w-full mx-auto',
                        inner: {
                            base: 'mx-auto flex flex-wrap justify-between items-center w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8',
                        },
                    }}
                >
                    <div className="flex items-center gap-4">
                        <Navbar.Toggle/>
                        <Navbar.Brand as={'div'} className="flex items-center gap-3  py-4">
                            <Link href="/" className="text-2xl font-bold">
                                Next.js
                            </Link>
                        </Navbar.Brand>
                    </div>
                    <MobileSidebar/>
                    <NavbarPopovers/>
                    <NavbarIcons/>
                    <LoginContent/>
                </Navbar>
            </Search>
        </Login>
    );
};