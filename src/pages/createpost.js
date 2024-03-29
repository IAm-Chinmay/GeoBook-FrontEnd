import React from "react";

import NavBar from "../Components/NavBar";
import Head from "next/head";

import CreatePostMain from "@/Components/CreatePost/CreatePostMain";

function createpost() {
  return (
    <>
      <Head>
        <title>CreatePost</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav
        style={{
          background: "rgba(114, 113, 113, 0.75)",
          borderBottomLeftRadius: "35px",
          borderBottomRightRadius: "35px",
          position: "sticky",
          top: 0,
        }}
      >
        <NavBar />
      </nav>
      <CreatePostMain />
    </>
  );
}

export default createpost;
