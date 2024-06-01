"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createChat } from "@/graphql/mutations";
import { client } from "@/lib/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 } from "uuid";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  function handleCreate() {
    if (username.trim() === "") return;
    const chatroomId = v4();

    client
      .graphql({
        query: createChat,
        variables: {
          input: {
            chatroomId,
            sender: username,
            text: `${username} has created this chatroom, chatroom link: ${window.location.origin}/${chatroomId}`,
          },
        },
      })
      .then(() => {
        router.push(`${chatroomId}/${username}`);
      });
  }

  return (
    <div className="container max-w-screen-sm mt-20">
      <h1 className="text-2xl">Create Chatroom</h1>
      <div className="mt-4 space-y-2">
        <Input
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button onClick={handleCreate}>Create</Button>
      </div>
    </div>
  );
}
