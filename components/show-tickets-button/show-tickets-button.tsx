import Button from "@material-ui/core/Button";
import Link from "next/link";
import React from "react";
import { useSession, signIn } from "next-auth/client";
import { useRouter } from "next/router";

const ShowTicketsButton: React.FC = () => {
  const [session] = useSession();
  const router = useRouter();

  if (session) {
    return (
      <Link href="/tickets">
        <Button variant="contained" color="primary">
          Zobrazit tickety
        </Button>
      </Link>
    );
  }

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={async () => {
        signIn("identity-server4");
      }}
    >
      Přihlásit se
    </Button>
  );
};

export default ShowTicketsButton;
