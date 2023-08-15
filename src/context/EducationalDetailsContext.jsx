import { createContext, useContext, useState } from 'react';

const EducationalDetailsContext = createContext({
  length: 0,
  pageCount: 0,
});

const EducationalDetailsProvider = ({ children }) => {
  const [length, setLength] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  return (
    <EducationalDetailsContext.Provider
      value={{ length, pageCount, setLength, setPageCount }}
    >
      {children}
    </EducationalDetailsContext.Provider>
  );
};

export const useEducationalDetailsCtx = () => {
  const { length, pageCount, setLength, setPageCount } = useContext(
    EducationalDetailsContext,
  );

  return {
    length,
    pageCount,
    setLength,
    setPageCount,
  };
};

export default EducationalDetailsProvider;
