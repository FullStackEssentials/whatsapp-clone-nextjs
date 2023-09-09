import { ChatSvg } from "./svg/ChatSvg";

export const NoSelectedChannel = () => (
  <div className='flex flex-col items-center justify-center h-full bg-whatsappBgSelected dark:bg-whatsappBg2'>
    <ChatSvg />
    <p className=' dark:text-gray-300 mt-4'>Start chatting by searching for a friend</p>
  </div>
)