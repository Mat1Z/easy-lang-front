import { signOut } from "next-auth/react";
import { useCallback } from "react";

export const useLogout = () => {
  return useCallback(async () => {
    await signOut({
      redirect: true,
    });
  }, []);
};