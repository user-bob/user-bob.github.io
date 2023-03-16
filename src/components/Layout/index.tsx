import Header from "./header";
import Footer from "./footer";
import React from "react";
import Head from "next/head";

export default function Layout({title, children}: Props) {
    return (
        <>
            <Head>
                <title>{title ? title : 'No Title'}</title>
                <meta name="description" content="My home page"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div
                className="container flex flex-col min-w-full min-h-screen bg-white dark:bg-gray-900"
            >
                <Header/>
                <hr className="border-gray-200 dark:border-gray-700"/>
                <div className="flex-grow">{children}</div>
                <hr className="border-gray-200 dark:border-gray-700"/>
                <Footer/>
            </div>
        </>
    );
}

type Props = {
    title?: string;
    children: React.ReactNode;
};
