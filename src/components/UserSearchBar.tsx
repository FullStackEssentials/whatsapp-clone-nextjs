import { SearchIcon } from 'lucide-react'
import { Input } from './ui/input'

interface Props {
  searchText: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export const UserSearchBar: React.FC<Props> = ({
  searchText,
  onSearchChange,
}) => {
  return (
    <div className='p-4 relative text-gray-400 block'>

      <SearchIcon
        className='pointer-events-none w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-6'
      />

      <Input
        placeholder='Search for users or conversations'
        className='indent-8 bg-whatsappBg2'
        value={searchText}
        onChange={onSearchChange}
      />
    </div>
  )
}