"use client";

import { Button } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

const ButtonSign = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <>
        <p>{session?.user.name}</p>
        <Button onClick={() => signOut()}> Sing Out</Button>
      </>
    );
  } else {
    return (
      <>
        <Button onClick={() => signIn()}> Sing In</Button>
      </>
    );
  }
};

export default ButtonSign;
