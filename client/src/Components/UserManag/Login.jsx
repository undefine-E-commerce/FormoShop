import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="btn btn-md btn-light" onClick={() => loginWithRedirect()}>Log In</button>;
};