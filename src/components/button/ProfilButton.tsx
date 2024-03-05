import { cn } from '@/lib/utils';
import Link from 'next/link';
import * as react from 'react';
import { FaCircleUser } from 'react-icons/fa6';
interface Myprops extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  className?: string;
}
const ProfilButton: react.FC<Myprops> = ({
  children,
  href,
  className,
  ...rest
}) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <div
        className={cn(
          'rounded-l-xl w-32 h-10 pl-2 text-white h1 cursor-pointer flex justify-start items-center space-x-2 text-base text-center',
          className,
        )}
      >
        <FaCircleUser size={20} className='bg-transparent' />
        <a href={href} {...rest}>
          {children}
        </a>
      </div>
    </Link>
  );
};

export default ProfilButton;
