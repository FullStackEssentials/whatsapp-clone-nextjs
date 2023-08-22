import { Avatar } from './Avatar';
import { LoggedUser } from '../types';
import { useTheme } from './ThemeProvider';

interface Props {
  user: LoggedUser;
}

export const Navbar: React.FC<Props> = ({ user }) => {

  const { theme, toggleTheme } = useTheme();

  return (
    <nav className='flex bg-whatsappBg2Light dark:bg-whatsappBg2 p-4 flex-auto items-center'>
      <Avatar
        image={user.image || ''}
        name={user.name}
      />

      <div className='ml-auto'>
        <button onClick={toggleTheme}>{theme}</button>
      </div>
    </nav>
  )
}