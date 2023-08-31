import React, { ReactNode, createContext, useState } from 'react';

export const AuthContext = createContext({
  user: false,
  setUser: (_user: boolean) => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(false);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
