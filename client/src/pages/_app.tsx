import "@/styles/globals.css";
import { Metadata } from "next";
import type { AppProps } from "next/app";

export default function Layout({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export const metadata: Metadata = {
    title: "Commission Tracker",
    description: "Track current commissions."
}