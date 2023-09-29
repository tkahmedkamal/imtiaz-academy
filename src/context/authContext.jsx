import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const memoValues = useMemo(
    () => ({
      user,
    }),
    [user],
  );

  return (
    <AuthContext.Provider
      value={{
        ...memoValues,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthCtx = () => {
  const { user, setUser } = useContext(AuthContext);

  return {
    user,
    setUser,
  };
};
