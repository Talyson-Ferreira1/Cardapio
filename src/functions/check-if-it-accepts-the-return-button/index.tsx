import { BUTTON_RETURN } from '@/constants/acept-button-return';

export const hasButtonReturn = (asPath: string) => {
  const appPublicRoute = Object.values(BUTTON_RETURN.hasButton);

  return appPublicRoute.includes(asPath);
};
