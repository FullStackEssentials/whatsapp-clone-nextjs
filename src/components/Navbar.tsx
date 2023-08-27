import { Avatar } from './Avatar';
import { LoggedUser } from '../types';
import { useTheme } from './ThemeProvider';
import { MoonIcon, SunIcon } from 'lucide-react';
import { UserResponse } from 'stream-chat';

interface Props {
  user: UserResponse;
}

export const Navbar: React.FC<Props> = ({ user }) => {

  const { theme, toggleTheme } = useTheme();
  console.log({user})
  return (
    <nav className='flex bg-whatsappBg2Light dark:bg-whatsappBg2 p-4 flex-auto items-center h-16'>
      <Avatar
        image={user.image || ''}
        name={user.name}
      />

      <div className='ml-auto'>
        <button onClick={toggleTheme}>
          {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
    </nav>
  )
}