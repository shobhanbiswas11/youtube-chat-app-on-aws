"use client";
import { Chat } from "@/API";
import ChatComp from "@/components/chat";
import { createChat } from "@/graphql/mutations";
import { chatsByChatroom } from "@/graphql/queries";
import { onCreateChat } from "@/graphql/subscriptions";
import { client } from "@/lib/client";
import { useEffect, useState } from "react";

interface PageProps {
  params: {
    chatroomId: string;
    userId: string;
  };
}

export default function Page({ params }: PageProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  useEffect(() => {
    client
      .graphql({
        query: chatsByChatroom,
        variables: {
          chatroomId: params.chatroomId,
        },
      })
      .then((res) => {
        setChats(res.data.chatsByChatroom.items);
      });
  }, [params.chatroomId]);

  useEffect(() => {
    const subscription = client
      .graphql({
        query: onCreateChat,
        variables: {
          filter: {
            chatroomId: {
              eq: params.chatroomId,
            },
          },
        },
      })
      .subscribe({
        next(value) {
          setChats((chats) => [...chats, value.data.onCreateChat]);
        },
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [params.chatroomId]);

  async function handleSend(text: string) {
    await client.graphql({
      query: createChat,
      variables: {
        input: {
          chatroomId: params.chatroomId,
          sender: params.userId,
          text,
        },
      },
    });
  }

  return (
    <div className="container max-w-screen-sm mt-20">
      <ChatComp
        chats={chats.map((chat) => ({
          ...chat,
          incoming: chat.sender !== params.userId,
        }))}
        onSend={handleSend}
      />
    </div>
  );
}
