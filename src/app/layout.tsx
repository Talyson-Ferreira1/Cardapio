'use client';
import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';

import { checkIsPublicRoute } from '@/functions/check-is-public-route';

import { Providers } from '@/context';
import SearchBar from '@/Components/section-header/SearchBar';
import ButtonToOpenBagShopping from '@/Components/Bag-shopping/button';
import LogoutButton from '@/Components/Logout-button/logOut';
import ReturnToHome from '@/Components/buton-return-to-home/index';

require('dotenv').config();

const inter = Inter({ subsets: ['latin'] });

import './style-page.css';
import PrivateRoute from '@/Components/private-route';
import { hasButton } from '@/functions/check-if-it-accepts-the-home-button';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  const isPublicPage = checkIsPublicRoute(pathName!);
  const acceptsButton = hasButton(pathName);

  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <header>
            <SearchBar />
            <LogoutButton />
            {acceptsButton && <ReturnToHome />}
          </header>
          <ButtonToOpenBagShopping />

          {isPublicPage && children}
          {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}
        </body>
      </html>
    </Providers>
  );
}
