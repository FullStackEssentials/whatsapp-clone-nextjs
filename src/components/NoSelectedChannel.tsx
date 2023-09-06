import { ChatSvg } from "./svg/ChatSvg";

export const NoSelectedChannel = () => (
  <div className='flex flex-col items-center justify-center h-full'>
    <ChatSvg />
    <p className='text-gray-300 mt-4'>Start chatting by searching for a friend</p>
  </div>
)