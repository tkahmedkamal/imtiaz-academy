import { createContext, useContext, useState } from 'react';

const StudentsContext = createContext({
  length: 0,
  pageCount: 0,
});

const StudentsProvider = ({ children }) => {
  const [length, setLength] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  return (
    <StudentsContext.Provider
      value={{ length, pageCount, setLength, setPageCount }}
    >
      {children}
    </StudentsContext.Provider>
  );
};

export const useStudentsCtx = () => {
  const { length, pageCount, setLength, setPageCount } =
    useContext(StudentsContext);

  return {
    length,
    pageCount,
    setLength,
    setPageCount,
  };
};

export default StudentsProvider;
