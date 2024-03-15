import { cn } from '@/lib/utils';
import Link from 'next/link';
import * as react from 'react';
import { FaCircleChevronRight } from 'react-icons/fa6';
interface Myprops extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  className?: string;
  variant?: 'button' | 'link';
  onClick?: () => void;
}
const ArrowButton: react.FC<Myprops> = ({
  children,
  href,
  className,
  variant,
  onClick,
  ...rest
}) => {
  return (
    <>
      {variant === 'button' ? (
        <button onClick={onClick}>
          <div
            className={cn(
              'rounded-xl border h1 max-w-36 cursor-pointer p-2 flex justify-center items-center space-x-2 text-base text-center',
              className,
            )}
          >
            <p>{children}</p>
            <FaCircleChevronRight size={20} className='bg-transparent' />
          </div>
        </button>
      ) : (
        <Link href={href} passHref legacyBehavior>
          <div
            className={cn(
              'rounded-xl border h1 max-w-32 cursor-pointer p-2 flex justify-center items-center space-x-2 text-base text-center',
              className,
            )}
          >
            <a href={href} {...rest}>
              {children}
            </a>
            <FaCircleChevronRight size={20} className='bg-transparent' />
          </div>
        </Link>
      )}
    </>
  );
};

export default ArrowButton;
