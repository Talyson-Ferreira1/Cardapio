import { BUTTON_RETURN } from '@/constants/acept-button-return';

export const hasButtonReturn = (asPath: string) => {
  const appPublicRoute = Object.values(BUTTON_RETURN.hasButton);
  let lettersOfPath = asPath.split('');
  let counter = 0;
  let newPath: Array<string> = [];

  lettersOfPath.map((letter) => {
    if (counter > 1) return;
    newPath.push(letter);
    if (letter === '/') counter++;
  });

  let path = newPath.join('');

  return appPublicRoute.includes(path);
};
