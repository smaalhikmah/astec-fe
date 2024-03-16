import React from 'react';
import Header from './Header';
import { Toaster } from 'react-hot-toast';
import HomeHeader from './HomeHeader';

interface Page {
  children: React.ReactNode;
  header?: string;
  className?: string;
}
export default function Layout({ children, header }: Page) {
  return (
    <>
      <Toaster />
      {header === 'home' ? <HomeHeader /> : <Header />}
      {children}
    </>
  );
}
