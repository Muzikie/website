import {ReactNode} from 'react';
import type {Metadata} from 'next';
import NextImage from 'next/image';

import {Routes} from '@/app/config/routes';
import {Icon} from '@/app/components/Elements';
import {Link} from '@/app/components/Polyfills';
import logo from '@/public/images/logo.svg';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Muzikie',
  description: 'Empowering artists, connecting superfans',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        </head>
      <body className="font-poppins h-[100vh] overflow-y-scroll flex flex-col">
        <header className="flex flex-row nowrap justify-between py-4 px-6">
          <div className="flex flex-row nowrap justify-center items-center">
            <NextImage src={logo} alt="Muzikie" width="32" />
            <h1 className="font-poppins text-primaryString text-lg font-normal tracking-wider pl-4">MUZIKIE</h1>
          </div>
          <nav className="flex flex-row justify-end gap-4">
            <Link to={{screen: Routes.Home}} className="block w-[50px] h-[50px] p-[13px]"><Icon name="Home" size={28} color="#453248" /></Link>
            <Link to={{screen: Routes.Profile}} className="block w-[50px] h-[50px] p-[13px]"><Icon name="Profile" size={28} color="#453248" /></Link>
            <Link to={{screen: Routes.Logout}} prefetch={false} className="block w-[50px] h-[50px] p-[13px]"><Icon name="logout" size={28} color="#453248" /></Link>
          </nav>
        </header>
        <main id="app-main" className="relative overflow-hidden grow order-1 md:order-2">
          {children}
        </main>
      </body>
    </html>
  );
}
