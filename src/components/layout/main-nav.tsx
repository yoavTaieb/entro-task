import Link from "next/link";

export default function MainNav() {
    return (
        <header className="sticky top-0 z-40 border-b bg-background bg-white flex h-16 justify-between py-4 px-6">
            <Link href="/" className="items-center space-x-2 flex-row flex">
                <img
                    className="h-10"
                    src={"/static/logo.jpeg"}
                    alt="logo" />
                <div className="hidden font-bold sm:inline-block">
                    Tasks
                </div>
            </Link>
        </header>
    )
}