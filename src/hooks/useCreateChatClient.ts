import { useState, useRef, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { STREAM_KEY } from "../constants";
import { LoggedUser } from "../types";

export const useCreateChatClient = (loggedUser: LoggedUser) => {
  const { token, ...user } = loggedUser

  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const disconnectRef = useRef(Promise.resolve());

  useEffect(() => {
    const client = StreamChat.getInstance(STREAM_KEY);
    const connectionPromise = disconnectRef.current.then(() =>
      client
        .connectUser(user, token)
        .then(() => {
          setChatClient(client)
          console.log('[Chat client]: Connected');
        })
        .catch((err) => {
          console.error(`[Chat client]: Failed to establish connection`, err);
        }),
    );

    return () => {
      disconnectRef.current = connectionPromise
        .then(() => client.disconnectUser())
        .then(() => {
          console.log('[Chat client]: Connection closed');
        })
        .catch(() => {
          console.log('[Chat client]: Failed to disconnect');
        })
        .finally(() => setChatClient(null));
    };

  }, []);

  return chatClient;
}