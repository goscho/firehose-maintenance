import {auth} from "@/auth";

export default async function Home() {

    const session = await auth();
    console.debug("page.tsx", session);

    return (
        <main>
            <div>main</div>
        </main>
    );
}
