import { Avatar } from './Avatar';
import { AppUser } from '../types';
import { useTheme } from './ThemeProvider';
import { MoonIcon, SunIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { logout } from "../app/api/user";
import { redirect } from "next/navigation";


interface Props {
  user: AppUser;
  onToggleEditProfile: () => void;
}

export const Navbar: React.FC<Props> = ({ user, onToggleEditProfile }) => {
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    redirect('/login');
  }


  return (
    <nav className='flex bg-whatsappBg2Light dark:bg-whatsappBg2 p-4 flex-auto items-center h-16'>
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
            onClick={onToggleEditProfile}>
            Edit profile
          </DropdownMenuItem>
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