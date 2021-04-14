import React from "react";
import { useSession, signOut, signIn } from "next-auth/client";
import Button from "@material-ui/core/Button";

const LoginButton: React.FC = () => {
  const [session, loading] = useSession();

  if (session) {
    return (
      <div>
        <Button variant="text" onClick={() => signOut()}>
          Odhlásit se
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => {
        signIn("identity-server4");
      }}
    >
      Přihlásit se
    </Button>
  );
};

export default LoginButton;
