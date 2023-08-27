
export const EmptyConversations: React.FC = () => { 
  return (
    <div className='flex flex-col items-center justify-center h-full p-4 text-center'>
      <h1 className='text-2xl font-bold text-gray-400'>No Conversations Yet</h1>
      <p className='text-gray-400'>Start a new conversation or search for someone to chat with</p>
    </div>
  )
}