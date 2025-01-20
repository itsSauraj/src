/* eslint-disable @next/next/no-img-element */
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// Dummy Data
export const data = [
  {
    id: 1,
    title: "Collection 1 Python Courses",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio autem in aspernatur molestias? Recusandae eveniet dolorum debitis id consectetur minima perferendis? Repellat non qui commodi ipsa, architecto maxime facere laborum aliquam? Accusamus laudantium quaerat nesciunt quas. Totam, corrupti ratione optio consectetur tempore quisquam neque sapiente! Quisquam facilis doloribus repellendus nihil.",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    title: "Collection 2",
    description: "This is collection 2",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 1,
    title: "Collection 1 Python Courses",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio autem in aspernatur molestias? Recusandae eveniet dolorum debitis id consectetur minima perferendis? Repellat non qui commodi ipsa, architecto maxime facere laborum aliquam? Accusamus laudantium quaerat nesciunt quas. Totam, corrupti ratione optio consectetur tempore quisquam neque sapiente! Quisquam facilis doloribus repellendus nihil.",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    title: "Collection 2",
    description: "This is collection 2",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 3,
    title: "Collection 1 Python Courses",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio autem in aspernatur molestias? Recusandae eveniet dolorum debitis id consectetur minima perferendis? Repellat non qui commodi ipsa, architecto maxime facere laborum aliquam? Accusamus laudantium quaerat nesciunt quas. Totam, corrupti ratione optio consectetur tempore quisquam neque sapiente! Quisquam facilis doloribus repellendus nihil.",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 4,
    title: "Collection 2",
    description: "This is collection 2",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 5,
    title: "Collection 1 Python Courses",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio autem in aspernatur molestias? Recusandae eveniet dolorum debitis id consectetur minima perferendis? Repellat non qui commodi ipsa, architecto maxime facere laborum aliquam? Accusamus laudantium quaerat nesciunt quas. Totam, corrupti ratione optio consectetur tempore quisquam neque sapiente! Quisquam facilis doloribus repellendus nihil.",
    image: "https://picsum.photos/200/300",
  },
  {
    id: 6,
    title: "Collection 2",
    description: "This is collection 2",
    image: "https://picsum.photos/200/300",
  },
];

export const CollectionCard = () => {
  return (
    <>
      {data.map((collection) => (
        <Card
          key={collection.id}
          className="w-[350px] p-0 rounded-xl h-full flex flex-col"
        >
          <CardHeader className="relative rounded-t-xl min-h-[120px] w-full">
            <img
              alt={collection.title}
              className="absolute top-0 left-0 pointer-events-none z-10 w-full object-cover h-full rounded-xl opacity-40"
              // src={(process.env.NEXT_PUBLIC_ROOT_IMAGE_PATH || "") +
              //   collection.image}
              src={collection.image}
            />
            <CardTitle className="z-20">
              <h3 className="text-2xl">{collection.title}</h3>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-4 p-4">
            <Label className="text-xl">Description</Label>
            <p className="line-clamp-6 h-[6rem] overflow-y-scroll no-scrollbar">{collection.description}</p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Explore</Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};
