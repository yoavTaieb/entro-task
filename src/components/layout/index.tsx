import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import MainNav from "./main-nav";
import SiteFooter from "./site-footer";

type LayoutProps = {
    children: ReactNode,
};

export default function RootLayout({ children }: LayoutProps) {
    return (
        <div className="flex min-h-screen flex-col space-y-8">
            <MainNav />
            <main className="flex flex-col items-center py-4 pb-32">
                {children}
            </main>
            <SiteFooter />
        </div>
    )
}

