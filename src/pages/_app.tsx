import "@/styles/globals.css";
import type {AppProps} from "next/app";
import Layout from "@/components/Layout";
import type {Session} from "next-auth";
import {SessionProvider} from "next-auth/react";
import {ThemeProvider} from "@/theme/theme-provider";
import Script from "next/script";

export default function App({
                                Component,
                                pageProps: {session, ...pageProps},
                            }: AppProps<{ session: Session }>) {
    return (
        <>
            <Script id={'j'} strategy={"beforeInteractive"}>
                {`if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('color-theme', 'dark');
} else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('color-theme', 'light');
}`}
            </Script>
            <SessionProvider session={session}>
                <ThemeProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </SessionProvider>
        </>
    );
}
