import {ReactNode} from 'react';
import type {Metadata} from 'next';

import {MainHeader} from '@/app/components/MainHeader';
import {WalletProvider} from '@/app/components/Wallet/WalletProvider';
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
        <link href="https://fonts.googleapis.com/css2?family=Martian+Mono:wght@100..800&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-poppins h-[100vh] overflow-y-scroll flex flex-col">
        <MainHeader />
        <main id="app-main" className="relative overflow-hidden grow order-1 md:order-2">
          <WalletProvider>
            {children}
          </WalletProvider>
        </main>
      </body>
    </html>
  );
}
