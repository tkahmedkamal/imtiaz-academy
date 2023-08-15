import { createContext, useContext, useState } from 'react';

const EducationalContext = createContext({
  length: 0,
  pageCount: 0,
});

const EducationalProvider = ({ children }) => {
  const [length, setLength] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  return (
    <EducationalContext.Provider
      value={{ length, pageCount, setLength, setPageCount }}
    >
      {children}
    </EducationalContext.Provider>
  );
};

export const useEducationalCtx = () => {
  const { length, pageCount, setLength, setPageCount } =
    useContext(EducationalContext);

  return {
    length,
    pageCount,
    setLength,
    setPageCount,
  };
};

export default EducationalProvider;
