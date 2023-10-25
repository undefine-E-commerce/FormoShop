import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { LogoutButton } from "./Logout";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="col">
        <img height={"50px"} src={user.picture} alt={user.name} />
        <LogoutButton/>
        <h6>{user.nickname}</h6>
        <p>{user.email}</p>
      </div>
    )
  );
};