'use client';
import React, { ReactNode } from 'react';

import { SearchProvider } from './user/user';

export const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <SearchProvider>{children}</SearchProvider>;
};
