import { createContext, useContext, useState } from 'react';

const CourseContext = createContext({
  length: 0,
  pageCount: 0,
});

const CourseProvider = ({ children }) => {
  const [length, setLength] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  return (
    <CourseContext.Provider
      value={{ length, pageCount, setLength, setPageCount }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseCtx = () => {
  const { length, pageCount, setLength, setPageCount } =
    useContext(CourseContext);

  return {
    length,
    pageCount,
    setLength,
    setPageCount,
  };
};

export default CourseProvider;
