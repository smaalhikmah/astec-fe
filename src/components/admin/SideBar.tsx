import { FaShoppingCart, FaSignOutAlt, FaHistory } from 'react-icons/fa';
import Link from 'next/link';
import ThemeButton from '../button/ThemeButton';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import adminWithAuth from '../hoc/adminWithAuth';
import useAdminStore from '@/store/useAdminStore';
import { FileSpreadsheet } from 'lucide-react';
import api from '@/lib/axios-helper';
import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';
import { FaFilm } from 'react-icons/fa6';
import { MdOutlineSportsBasketball } from 'react-icons/md';

export type IconsTypeList = keyof typeof icons;
export default adminWithAuth(Sidebar, 'optional');
function Sidebar() {
  const router = useRouter();
  const logout = useAdminStore.useLogout();

  const handleLogout = () => {
    try {
      logout();
      toast.success('Logout Success');
      router.push('/auth/admin');
    } catch (error) {
      toast.error('Logout Failed');
    }
  };

  async function download() {
    toast.promise(
      api
        .get(`/admin/order/report`, {
          responseType: 'blob',
        })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'report.xlsx');
          document.body.appendChild(link);
          link.click();
        }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Berhasil mendownload data',
      },
    );
  }

  const path = router.pathname;

  return (
    <div className='min-h-screen flex flex-row '>
      <div className='flex flex-col w-56rounded-r-3xl overflow-hidden'>
        <div className='flex items-center justify-center h-24 shadow-md'>
          <h1 className='text-2xl uppercase text-indigo-500'>Astec Admin</h1>
          <ThemeButton />
        </div>
        <div className='flex flex-col justify-between h-full'>
          <ul className='flex flex-col py-4'>
            {links.map(({ href, label, icon }) => {
              if (!icons[icon as IconsTypeList]) return;
              const current = icons[icon as IconsTypeList];
              return (
                <li key={`${href}${label}`}>
                  <div className='transform hover:translate-x-2 transition-transform ease-in duration-200'>
                    <Link
                      href={href}
                      passHref
                      legacyBehavior
                      className='flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800'
                    >
                      <>
                        <span
                          className={`inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 ${
                            path === href ? 'text-indigo-500' : ''
                          }`}
                        >
                          <current.icon />
                        </span>
                        <a
                          href={href}
                          className={`text-sm font-medium ${
                            path === href ? 'text-indigo-500' : ''
                          }`}
                        >
                          {label}
                        </a>
                      </>
                    </Link>
                  </div>
                </li>
              );
            })}
            <li>
              <div
                onClick={() => download()}
                className='flex cursor-pointer flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800'
              >
                <>
                  <span className='inline-flex items-center justify-center h-12 w-12 text-lg text-green-500'>
                    <FileSpreadsheet />
                  </span>
                  <span className='text-sm font-medium'>Download</span>
                </>
              </div>
            </li>
          </ul>

          <div className='flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800'>
            <span className='inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400'>
              <FaSignOutAlt />
            </span>
            <button onClick={handleLogout} className='text-sm font-medium'>
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const links = [
  { href: '/admin', label: 'Competition', icon: 'user' },
  { href: '/admin/talkshow', label: 'Film Talk', icon: 'order' },
  { href: '/admin/history', label: 'Competition History', icon: 'history' },
  {
    href: '/admin/history/filmtalk',
    label: 'Film Talk History',
    icon: 'filmhistory',
  },
];
const icons = {
  user: {
    icon: MdOutlineSportsBasketball,
  },
  order: {
    icon: FaShoppingCart,
  },
  history: {
    icon: FaHistory,
  },
  filmhistory: {
    icon: FaFilm,
  },
};
