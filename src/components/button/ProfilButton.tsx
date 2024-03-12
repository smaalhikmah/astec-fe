import { cn } from '@/lib/utils';
import Link from 'next/link';
import * as react from 'react';
import { FaCircleUser } from 'react-icons/fa6';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { User } from '@/types/auth';
interface Myprops extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  className?: string;
  user?: User;
}
const ProfilButton: react.FC<Myprops> = ({
  children,
  href,
  className,
  user,
  ...rest
}) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <div
        className={cn(
          'rounded-l-xl md:w-32 w-28 h-10 pl-2 h4 text-white cursor-pointer flex justify-start items-center space-x-2 text-base text-center',
          className,
        )}
      >
        {user ? (
          <Avatar className='p-1'>
            <AvatarImage src={user?.img_url} alt={user?.name} />
            <AvatarFallback className='bg-black'>
              <FaCircleUser size={20} className='bg-transparent' />
            </AvatarFallback>
          </Avatar>
        ) : (
          <FaCircleUser size={20} className='bg-transparent' />
        )}

        <a href={href} {...rest}>
          {children}
        </a>
      </div>
    </Link>
  );
};

export default ProfilButton;
