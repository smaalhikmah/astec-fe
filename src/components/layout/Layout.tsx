import React from 'react';
import Header from './Header';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

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
      <Head>
        <title>Astec</title>
        <meta name='description' content='Astec' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {children}
    </>
  );
}
