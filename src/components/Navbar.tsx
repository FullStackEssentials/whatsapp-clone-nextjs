
import { Avatar } from './Avatar';
import { AppUser } from '../types';
import { useTheme } from '../context/ThemeProvider';
import { MoonIcon, SunIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { deleteCookie } from 'cookies-next';


interface Props {
  user: AppUser;
}

export const Navbar: React.FC<Props> = ({ user }) => {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie('username');
    return router.push('/login');
  }

  return (
    <nav className='flex bg-whatsappBg2Light dark:bg-whatsappBg2 p-4 flex-auto items-center h-16 border-r border-whatsappBgBorder dark:border-gray-600'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar
            image={user?.image || ''}
            name={user?.name || ''}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='dark:bg-whatsappBg2 p-4 mr-6'>
          <DropdownMenuLabel className='text-lg'>{user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className='text-red-400'
            onClick={handleLogout}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className='ml-auto'>
        <button onClick={toggleTheme}>
          {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
    </nav>
  )
}