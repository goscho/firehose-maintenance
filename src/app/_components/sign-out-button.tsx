import { signOut } from "@/auth";
import TouchButton from "@/app/_components/touch-button";

export default function SignOutButton() {
  return (
    <TouchButton
      primary
      label={"Abmelden"}
      onClick={async () => {
        "use server";
        await signOut();
      }}
    />
  );
}
