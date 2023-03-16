import "@/styles/globals.css";
import type { AppProps } from "next/app";
import FirebaseProvider from "@/context/authContext";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
        <FirebaseProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </FirebaseProvider>
  );
}
