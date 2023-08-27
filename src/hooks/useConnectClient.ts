import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { STREAM_KEY } from "../constants";
import { LoggedUser } from "../types";

export const useConnectClient = (loggedUser: LoggedUser) => {
  const { token, ...user } = loggedUser
  const [client, setClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    if (client) return;

    const streamClient = StreamChat.getInstance(STREAM_KEY);

    const init = async () => {
      await streamClient.connectUser(user, token)

      setClient(streamClient)
      console.log('Connected to Stream')
    }

    init()
  }, [client, token, user]);

  return { client }
}