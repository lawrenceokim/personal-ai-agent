"use client";

import { AuthContext } from "@/context/AuthContext";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useState } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(); //for setting and calling the user variable.
  return (
    <ConvexProvider client={convex}>
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    </ConvexProvider>
  );
}
