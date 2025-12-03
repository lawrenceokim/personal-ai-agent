"use client";

import React, { useContext, useEffect } from "react";
import Header from "./_components/Header";
import { GetAuthUserData } from "@/services/GlobalApi";
import { useRouter } from "next/navigation";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AuthContext } from "@/context/AuthContext";

function Provider({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const convex = useConvex();
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    CheckUserAuth();
  }, []);

  const CheckUserAuth = async () => {
    const token = localStorage.getItem("user_token");

    //if user token exist, get new access token
    const user = token && (await GetAuthUserData(token));
    if (!user?.email) {
      router.replace("/sign-in");
      return;
    }

    // get user info from database
    try {
      const result = await convex.query(api.users.GetUser, {
        email: user?.email,
      });
      // console.log("RESULT--", result);
      setUser(result);
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Provider;
