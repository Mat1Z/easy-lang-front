import { useSession } from "next-auth/react";
import { User } from "../types/User.interface";

export const useGetSessionData = () => {
  const session = useSession() as any;

  return session?.data?.user as User;
}