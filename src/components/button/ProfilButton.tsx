import { cn } from '@/lib/utils';
import React, * as react from 'react';
import { FaCircleUser } from 'react-icons/fa6';
import { User } from '@/types/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useRouter } from 'next/router';
import useAuthStore from '@/store/useAuthStore';
import toast from 'react-hot-toast';

interface Myprops extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;

  className?: string;
  user?: User;
}
const ProfilButton: react.FC<Myprops> = ({ children, className, user }) => {
  const router = useRouter();
  const logout = useAuthStore.useLogout();

  const handleLogout = () => {
    try {
      logout();
      toast.success('Logout Success');
      router.push('/');
    } catch (error) {
      toast.error('Logout Failed');
    }
  };
  return (
    <>
      <div
        className={cn(
          'rounded-l-xl md:w-32 w-28 h-10 pl-2 h4 text-white flex justify-start items-center space-x-2 text-base text-center',
          className,
        )}
      >
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className='p-1'>
                <AvatarImage src={user?.img_url} alt={user?.name} />
                <AvatarFallback className='bg-black'>
                  <FaCircleUser size={20} className='bg-transparent' />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/profile')}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <FaCircleUser size={20} className='bg-transparent' />
        )}
        {children}
      </div>
    </>
  );
};

export default ProfilButton;
