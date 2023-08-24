import React, { ReactNode, createContext, useState } from 'react';

export const ChangeBag_Context = createContext({
  handleBag: {},
  setHandleBag: (_a: boolean) => {},
});

export const UseChangeBag_Provider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [handleBag, setHandleBag] = useState<boolean>(false);

  return (
    <ChangeBag_Context.Provider value={{ handleBag, setHandleBag }}>
      {children}
    </ChangeBag_Context.Provider>
  );
};
