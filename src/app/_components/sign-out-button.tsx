import { signOut } from "@/auth"

export default function SignOutButton() {
    return (
        <form className={"inline-block"}
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <button type="submit">Abmelden</button>
        </form>
    )
}