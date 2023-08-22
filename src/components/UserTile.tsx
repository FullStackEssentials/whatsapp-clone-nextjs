import { User } from '../types'
import { Avatar } from './Avatar'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  user: User
  wasAdded?: boolean
  onUserAdd: () => void
  onUserRemove: () => void
}

export const UserTile: React.FC<Props> = ({
  user,
  onUserAdd,
  onUserRemove,
  wasAdded = false,
  ...props
}) => {

  const handleAddOrRemove = () => wasAdded ? onUserRemove() : onUserAdd()

  const computedClasses = wasAdded ? 'text-red-800' : 'text-green-800'
  const computedText = wasAdded ? 'Remove' : 'Add'

  return (
    <div
      key={user.id}
      className='flex p-4 border-y border-gray-500'
      {...props}
    >
      <div className='mr-4'>
        <Avatar
          image={user.image || ''}
          name={user.name}
        />
      </div>
      <div className='flex'>
        <h2>{user.name}</h2>

        <button
          onClick={handleAddOrRemove}
          className={`ml-4 ${computedClasses}`}
        >
          {computedText}
        </button>
      </div>
    </div>
  )
}