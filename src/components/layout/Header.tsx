import Image from 'next/image';
import React from 'react';
import Links from '../button/Links';
import ProfilButton from '../button/ProfilButton';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import useAuthStore from '@/store/useAuthStore';
import ThemeButton from '../button/ThemeButton';
import Link from 'next/link';

interface Header {
  header?: string;
  className?: string;
}

export default function Header({ header, className }: Header) {
  const user = useAuthStore.useUser();
  const animation = {
    hidden: {
      x: '200',
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
    hidden2: {
      x: '-200',
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
    visible: {
      x: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
    },
  };
  return (
    <nav
      className={cn(
        'w-full h-[82px] flex bg-transparent z-10 overflow-hidden ',
        header,
        className,
      )}
    >
      <div className='flex justify-between w-full'>
        <motion.div
          initial='hidden2'
          animate='visible'
          variants={animation}
          className='flex space-x-4 md:pl-20 justify-center items-center'
        >
          <div className='w-16 md:w-36'>
            <Image
              alt='logo'
              src='/images/logonobg.png'
              height='120'
              width='120'
            />
          </div>
        </motion.div>

        <motion.div
          initial='hidden'
          animate='visible'
          variants={animation}
          className='flex items-center '
        >
          <div className='flex items-end justify-center '>
            <ul className='font-bold flex justify-center md:space-x-4 space-x-2 items-center '>
              {links.map(({ href, label }) => (
                <li key={`${href}${label}`}>
                  <Links href={href}>{label}</Links>
                </li>
              ))}
            </ul>
          </div>
          <ThemeButton />
          {user != null && user ? (
            <ProfilButton user={user} className='bg-yellow-900'>
              {user.name}
            </ProfilButton>
          ) : (
            <ProfilButton className='bg-yellow-900'>
              <Link href='/auth' passHref legacyBehavior>
                Log in
              </Link>
            </ProfilButton>
          )}
        </motion.div>
      </div>
    </nav>
  );
}
const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
];
