import { useUser } from "@/context/authContext";
import React, { useEffect } from "react";
import type { NextPage } from "next";
import Item from "@/components/Card/Item";
import Loa from '@/lotties/loading-animation.json'
import { Player } from "@lottiefiles/react-lottie-player";

const Home: NextPage = () => {
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading) {
      console.log(user);
    }
  }, [loading, user]);

  let items = [];
  for (let i = 1; i < 10; i++) {
    items.push(
      <Item
        key={i}
        image={`https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-${i}.jpg`}
      />
    );
  }
  return (
    <>
      <main className={"w-full py-4 px-6 md:px-8"}>
        <div className={"grid grid-flow-row gap-4 auto-rows-auto"}>
          <div
            className={
              "grid grid-flow-col gap-4 overflow-auto hover:overflow-x-scroll scrollbar-hide"
            }
          >
            {items}
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3">
            {items}
          </div>
        </div>
        {/*<Example />*/}
        <Player
          autoplay
          speed={1.5}
          loop
          src={Loa}
          style={{ height: "200px", width: "200px" }}
        >
        </Player>
      </main>
    </>
  );
};

export default Home;
