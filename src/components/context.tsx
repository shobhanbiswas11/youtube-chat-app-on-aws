"use client";

import config from "@/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";

if (typeof window !== "undefined") {
  Amplify.configure(config);
}

export default function ContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
