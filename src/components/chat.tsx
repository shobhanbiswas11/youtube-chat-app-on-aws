"use client";

import {
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

interface Chat {
  id: string;
  sender: string;
  text: string;
  incoming?: boolean;
}
interface Props {
  chats: Chat[];
  onSend: (text: string) => any;
}

export default function ChatComp({ chats, onSend }: Props) {
  return (
    <div style={{ position: "relative", height: "500px" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {chats.map((chat) => (
              <Message
                key={chat.id}
                model={{
                  direction: chat.incoming ? "incoming" : "outgoing",
                  position: "single",
                  message: chat.text,
                  sender: chat.sender,
                }}
              >
                <Message.Header sender={chat.sender} />
              </Message>
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            attachButton={false}
            onSend={onSend}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
