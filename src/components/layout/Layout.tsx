import React from 'react';
import Header from './Header';
import { Toaster } from 'react-hot-toast';

interface Page {
  children: React.ReactNode;
  header?: string;
  className?: string;
}
export default function Layout({ children, header, className }: Page) {
  return (
    <>
      <Toaster />
      <Header header={header} className={className} />

      {children}
    </>
  );
}
