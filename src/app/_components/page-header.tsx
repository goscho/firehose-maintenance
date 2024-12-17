import Link from "next/link";
import SignOutButton from "@/app/_components/sign-out-button";
import {auth} from "@/auth";

export default async function PageHeader() {

    const session = await auth();

    const loggedIn = !!session?.user;

    return (
        <header className="flex flex-row justify-between p-5 drop-shadow-sm bg-gray-600 text-white">
            <h1 className="text-4xl font-bold leading-none tracking-tight my-auto">
                <Link href={"/"}>Schlauchverwaltung</Link>
            </h1>
            <div>{session?.user?.name} {loggedIn && <SignOutButton/>}</div>
        </header>
    );
}
