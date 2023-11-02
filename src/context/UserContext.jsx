import { createContext, useContext, useState } from 'react';

const UserContext = createContext({
  length: 0,
  pageCount: 0,
});

const UsersProvider = ({ children }) => {
  const [length, setLength] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  return (
    <UserContext.Provider
      value={{ length, pageCount, setLength, setPageCount }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsersCtx = () => {
  const { length, pageCount, setLength, setPageCount } =
    useContext(UserContext);

  return {
    length,
    pageCount,
    setLength,
    setPageCount,
  };
};

export default UsersProvider;
