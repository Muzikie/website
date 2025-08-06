'use server'

import NextImage from 'next/image';
import {cookies} from 'next/headers';
import {FC} from 'react';

import {AUTH_COOKIE} from '@/app/config/constants';
import {Routes} from '@/app/config/routes';
import {Icon} from '@/app/components/Elements';
import {Link, Span} from '@/app/components/Polyfills';
import logo from '@/public/images/logo.svg';
import {MenuItemAttrs} from './types';


const MenuItem: FC<MenuItemAttrs> = ({name, screen}) => (
  <Link
    to={{screen}}
    className="block h-[50px] p-[13px] flex flex-row flex-nowrap items-center justify-center gap-[4px]"
  >
    <Icon name={name} size={18} color="#453248" />
    <Span className="capitalize text-primaryStrong font-normal">{name}</Span>
  </Link>
);

export const MainHeader = async () => {
  const awaitedCookies = await cookies();
   const savedCookie = awaitedCookies.get(AUTH_COOKIE);

  return (
    <header className="flex flex-row nowrap justify-between py-4 px-6">
      <Link to={{screen: Routes.Home}} className="flex flex-row nowrap justify-center items-center">
        <NextImage src={logo} alt="Muzikie" width="32" />
        <h1 className="font-poppins text-primaryString text-lg font-normal tracking-wider pl-4">MUZIKIE</h1>
      </Link>
      <div className="flex flex-row justify-end gap-2">
        <MenuItem screen={Routes.Home} name="home"  />
        {
          savedCookie ? (
            <MenuItem screen={Routes.Profile} name="profile"  />
          ) : null
        }
        <MenuItem screen={savedCookie ? Routes.Logout: Routes.Login} name={savedCookie ? 'logout': 'login'} />
      </div>
    </header>
  )
};
