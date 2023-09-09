import { useChannelStateContext, useChatContext } from "stream-chat-react";
import { Avatar } from "./Avatar";
import { formatDistanceToNow } from "date-fns";
import { MoreVerticalIcon, PhoneCallIcon, SearchIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { LoggedUser } from "../types";
import { CreateCallButton } from "./CreateCallButton";

interface Props {
  loggedUser: LoggedUser;
}

export const ConversationHeader: React.FC<Props> = ({ loggedUser }) => {
  const { client, channel } = useChatContext()
  const { watcher_count } = useChannelStateContext('ChannelHeader');

  const member = Object.values(channel?.state.members || {})
    .filter(({ user }) => user?.id !== client.userID)[0].user;

  const isOnline = Boolean(watcher_count && watcher_count >= 2)

  if (!channel || !member) return null
  const handleDeleteChannel = () => channel.delete()

  return (
    <>
      <div
        className='flex items-center justify-between px-4 py-3 border-b border-whatsappBorder dark:bg-whatsappBg2 bg-whatsappBg2Light h-16'
      >
        <div className='flex items-center'>
          <Avatar
            image={member.image || ''}
            name={member.name || ''}
            online={isOnline}
          />
          <div className='ml-4'>
            <p className='dark:text-whatsappFgPrimaryStrong font-bold'>{member.name}</p>
            {isOnline && <p className='text-whatsappFgPrimaryLight text-sm'>Online</p>}
          </div>
        </div>

        <div className='flex items-center dark:text-whatsappFgPrimaryStrong'>
          <button className='mr-6 mb-1'>
            <CreateCallButton loggedUser={loggedUser} />
          </button>

          <button className='mr-6'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <SearchIcon height={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='dark:bg-whatsappBg2 p-4 mr-6'>
                <DropdownMenuLabel>Search in Conversation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Input placeholder='Search for Messages' className="dark:bg-whatsappBg" />
              </DropdownMenuContent>
            </DropdownMenu>
          </button>

          <button className='mr-2'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVerticalIcon height={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='dark:bg-whatsappBg2 p-4 mr-6'>
                <DropdownMenuItem>Report {member.name}</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDeleteChannel}
                  className="text-red-400">Delete Conversation</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </button>
        </div>
      </div>
    </>
  )
}