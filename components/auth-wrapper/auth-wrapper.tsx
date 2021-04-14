import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/client";
import { useRouter } from "next/router";

const withAuth = (Component: any) => {
  const Wrapper = (): JSX.Element => {
    const [session, loading] = useSession();
    const router = useRouter();

    const isLogged = session != null;

    useEffect(() => {
      if (!loading && !isLogged) {
        router.push("/");
        //signIn("identity-server4");
      }
    }, [loading]);

    return (
      <div>
        {isLogged.toString()}
        <Component />
      </div>
    );
  };

  return Wrapper;
};

export default withAuth;
