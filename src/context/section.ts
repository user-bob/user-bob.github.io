import nookies from "nookies";
import { GetServerSidePropsContext, NextApiHandler } from "next";
import admin from "@/firebase/init-admin";

export const authServer = async (ctx: GetServerSidePropsContext) => {
  const { idToken } = nookies.get(ctx);

  try {
    return admin.auth().verifyIdToken(idToken);
  } catch (err) {
    return null;
  }
};