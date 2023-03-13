import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useAuth } from "@/context/authContext";

const Home: NextPage = () => {
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  if (!user) return <h1>U need to login</h1>;

  return (
    <>
      <Head>
        <title>Private</title>
        <meta name="description" content="private user" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Email : {user?.claims.email}</h1>
        Private
      </main>
    </>
  );
};

export default Home;