'use server'

import NextImage from 'next/image';
import {cookies} from 'next/headers';

import {AUTH_COOKIE} from '@/app/config/constants';
import {Routes} from '@/app/config/routes';
import {Icon} from '@/app/components/Elements';
import {Link} from '@/app/components/Polyfills';
import logo from '@/public/images/logo.svg';

export const MainHeader = async () => {
  const awaitedCookies = await cookies();
   const savedCookie = awaitedCookies.get(AUTH_COOKIE);

  return (
    <header className="flex flex-row nowrap justify-between py-4 px-6">
      <Link to={{screen: Routes.Home}} className="flex flex-row nowrap justify-center items-center">
        <NextImage src={logo} alt="Muzikie" width="32" />
        <h1 className="font-poppins text-primaryString text-lg font-normal tracking-wider pl-4">MUZIKIE</h1>
      </Link>
      <nav className="flex flex-row justify-end gap-4">
        <Link to={{screen: Routes.Home}} className="block w-[50px] h-[50px] p-[13px]"><Icon name="Home" size={28} color="#453248" /></Link>
        {
          savedCookie ? (
            <Link to={{screen: Routes.Profile}} className="block w-[50px] h-[50px] p-[13px]"><Icon name="Profile" size={28} color="#453248" /></Link>
          ) : null
        }
        <Link to={{screen: Routes.Logout}} prefetch={false} className="block w-[50px] h-[50px] p-[13px]"><Icon name="logout" size={28} color="#453248" /></Link>
      </nav>
    </header>
  )
};
