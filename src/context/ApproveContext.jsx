import { createContext, useContext, useState } from 'react';

const ApproveContext = createContext({
  length: 0,
  pageCount: 0,
});

const ApproveProvider = ({ children }) => {
  const [length, setLength] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  return (
    <ApproveContext.Provider
      value={{ length, pageCount, setLength, setPageCount }}
    >
      {children}
    </ApproveContext.Provider>
  );
};

export const useApproveCtx = () => {
  const { length, pageCount, setLength, setPageCount } =
    useContext(ApproveContext);

  return {
    length,
    pageCount,
    setLength,
    setPageCount,
  };
};

export default ApproveProvider;
