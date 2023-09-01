import { APP_SECTIONS } from '@/constants/app-section';

export const hasButtonHome = (asPath: string) => {
  const appPublicRoute = Object.values(APP_SECTIONS.hasButton);

  return appPublicRoute.includes(asPath);
};
