'use client';
import React, { ReactNode } from 'react';

import { UseChangeBag_Provider } from './change-bag-shopping/change';

export const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <UseChangeBag_Provider>{children}</UseChangeBag_Provider>;
};
