import "@/styles/globals.css";
import { Metadata } from "next";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ Component, pageProps }: AppProps) {
    return (
        <main className={inter.className}>
            <Component {...pageProps} />
        </main>
    );
}

export const metadata: Metadata = {
    title: "Commission Tracker",
    description: "Track current commissions.",
};