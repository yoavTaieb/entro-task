import Link from "next/link";
import { siteConfig } from "~/config/site";

export default function SiteFooter() {
    return (
        <footer className="absolute bottom-0 left-0 right-0 bg-white">
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="items-center gap-4 px-8 flex flex-row">
                    <Link href="/" className="hidden items-center space-x-2 md:flex">
                        <img
                            className="h-6"
                            src={"/static/logo.jpeg"}
                            alt="logo" />
                        <span className="hidden font-bold sm:inline-block">
                            Task
                        </span>
                    </Link>
                    <p className="text-center text-sm leading-loose md:text-left">
                        Built by{" "} Yoav
                        . Hosted on{" "}
                        <a
                            href="https://vercel.com"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            Vercel
                        </a>
                        . Illustrations by{" "}
                        <a
                            href="https://chakra-ui.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            Chakra UI
                        </a>
                        . The source code is available on{" "}
                        <a
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            GitHub
                        </a>
                        .
                    </p>
                </div>
            </div>
        </footer>
    )
}