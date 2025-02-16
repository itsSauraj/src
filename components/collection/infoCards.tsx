"use client";

import React from "react";
import Link from "next/link";

import { cn, getColor } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const colorClasses = {
  border: [
    "border-red-500 dark:border-red-700",
    "border-green-500 dark:border-green-700",
    "border-blue-500 dark:border-blue-700",
    "border-orange-500 dark:border-orange-700",
  ],
  background: [
    "bg-red-500 dark:bg-red-700",
    "bg-green-500 dark:bg-green-700",
    "bg-blue-500 dark:bg-blue-700",
    "bg-orange-500 dark:bg-orange-700",
  ],
  text: [
    "text-red-500 dark:text-red-700",
    "text-green-500 dark:text-green-700",
    "text-blue-500 dark:text-blue-700",
    "text-orange-500 dark:text-orange-700",
  ],
};

const InfoCards = ({
  title,
  children,
  index,
}: {
  title: string;
  children: React.ReactNode;
  index: number;
}) => {
  const [colorBorder, setColorBorder] = React.useState("");
  const [colorText, setColorText] = React.useState("");

  React.useEffect(() => {
    setColorBorder(getColor(index, "border"));
    setColorText(getColor(index, "text"));
  }, [index]);

  return (
    <Card
      className={cn(
        "flex-1 flex flex-col items-center justify-center min-w-[250px] border-t-4",
        colorText,
        colorBorder,
      )}
    >
      <CardHeader className={`rounded-lg w-full flex text-center p-3 `}>
        <CardTitle className="capitalize p-0 font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="min-h-[80px] flex justify-center items-center font-light">
        {children}
      </CardContent>
    </Card>
  );
};

const InfoCardsLink = ({
  title,
  children,
  index,
}: {
  title: string;
  children: React.ReactNode;
  index: number;
}) => {
  const [colorBorder, setColorBorder] = React.useState("");
  const [colorText, setColorText] = React.useState("");

  React.useEffect(() => {
    setColorBorder(getColor(index, "border"));
    setColorText(getColor(index, "text"));
  }, [index]);

  return (
    <Link
      className="cursor-pointer flex-grow"
      href={`/dashboard/${title.toLowerCase()}`}
    >
      <Card
        className={cn(
          "flex-1 flex flex-col items-center justify-center min-w-[250px] border-t-4",
          "hover:shadow-lg dark:hover:shadow-white/10 dark:bg-accent",
          colorText,
          colorBorder,
        )}
      >
        <CardHeader className={`rounded-lg w-full flex text-center p-3 `}>
          <CardTitle className="capitalize p-0 font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[80px] flex justify-center items-center font-light">
          {children}
        </CardContent>
      </Card>
    </Link>
  );
};

export { InfoCards, InfoCardsLink };
