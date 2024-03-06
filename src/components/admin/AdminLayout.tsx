import { Toaster } from 'react-hot-toast';
import SideBar from './SideBar';

interface Page {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: Page) => {
  return (
    <>
      <Toaster />
      <div className='flex flex-row relative'>
        <SideBar />
        <div className='w-full'>{children}</div>
      </div>
    </>
  );
};
