import { MessageList, MessageInput } from "stream-chat-react";
import { ConversationHeader } from "./ConversationHeader";
import { LoggedUser } from "../types";

interface Props {
  loggedUser: LoggedUser;
}

export const ChatView: React.FC<Props> = ({ loggedUser }) => (
  <>
    <ConversationHeader loggedUser={loggedUser} />
    <MessageList />
    <MessageInput focus />
  </>
)