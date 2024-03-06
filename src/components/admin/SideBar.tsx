import { FaUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import withAuth from '../hoc/withAuth';

export type IconsTypeList = keyof typeof icons;
export default withAuth(Sidebar, 'optional');
function Sidebar() {
  // const router = useRouter();
  // const logout = useAuthStore.useLogout();

  // const handleLogout = () => {
  //     try {
  //         logout()
  //         toast.success("Logout Success")
  //         router.push('/')
  //     } catch (error: any) {
  //         toast.error(error)
  //     }

  // }

  return (
    <div className='min-h-screen flex flex-row bg-gray-100'>
      <div className='flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden'>
        <div className='flex items-center justify-center h-24 shadow-md'>
          <h1 className='text-2xl uppercase text-indigo-500'>Astec Admin</h1>
        </div>
        <div className='flex flex-col justify-between h-full'>
          <ul className='flex flex-col py-4'>
            {links.map(({ href, label, icon }) => {
              if (!icons[icon as IconsTypeList]) return;

              const current = icons[icon as IconsTypeList];
              return (
                <li key={`${href}${label}`}>
                  <Link
                    href={href}
                    passHref
                    legacyBehavior
                    className='
                                    flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800'
                  >
                    <>
                      <span className='inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400'>
                        <current.icon />
                      </span>
                      <a href={href} className='text-sm font-medium'>
                        {label}
                      </a>
                    </>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className='flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800'>
            <span className='inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400'>
              <FaSignOutAlt />
            </span>
            {/* <button onClick={handleLogout} className="text-sm font-medium">Log out</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

const links = [
  { href: '/admin', label: 'Users', icon: 'user' },
  { href: '/admin/orders', label: 'Orders', icon: 'order' },
];
const icons = {
  user: {
    icon: FaUser,
  },
  order: {
    icon: FaShoppingCart,
  },
};
