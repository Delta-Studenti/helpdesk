import React from "react";
import { useSession, signOut } from "next-auth/client";
import Link from "next/link";
import Button from "@material-ui/core/Button";

const LoginButton: React.FC = () => {
  const [session, loading] = useSession();

  if (session) {
    return (
      <div>
        <p>Přihlášen: {session.user.email}</p>
        <Button variant="contained" color="primary" onClick={() => signOut()}>
          Odhlásit se
        </Button>
      </div>
    );
  }

  return (
    <Link href="/api/auth/signin">
      <Button variant="contained" color="primary">
        Přihlásit se
      </Button>
    </Link>
  );
};

export default LoginButton;
