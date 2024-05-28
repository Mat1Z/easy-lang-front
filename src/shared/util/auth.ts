import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { User } from "../types/User.interface";



type GetServerSidePropsFunc<P = any> = (
  context: GetServerSidePropsContext,
  session: Session | null
) => Promise<GetServerSidePropsResult<P>>;

export function withSession(getServerSidePropsFunc: GetServerSidePropsFunc
  // , allowedRoles: ACCESS_TYPES[] = [ACCESS_TYPES.STUDENT]
) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<{ session: Session | null }>> => {
    const session = await getSession(context) as unknown as (Session & { user: User });
    const props = await getServerSidePropsFunc(context, session);

    if (!session || !session.user || !session.user.role) return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      }
    }

    return {
      props: {
        ...props,
        session,
      },
    };
  };
}