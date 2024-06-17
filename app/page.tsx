import React from "react";

import MapFilter from "./components/MapFilter";
import prisma from "./lib/db";
import ListingCard from "./components/ListingCard";

async function getData() {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedLocation: true,
      addedDescription: true,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
    },
  });
  return data;
}

export default async function Home() {
  const data = await getData();
  return (
    <div>
      <MapFilter />
      <div>
        {data.map((item) => {
          <ListingCard key={item.id} />;
        })}
      </div>
    </div>
  );
}
