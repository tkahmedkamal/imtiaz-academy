import SelectFilter from './SelectFilter';
import useFilter from '../hooks/useFilter';
import {useCoursesDialog} from '../hooks'
const CourseFilter = () => {
  const { term, handler: handleChange } = useFilter('courseName', true);
  const { data } = useCoursesDialog();

  return (
    <div className='w-[160px]'>
      <SelectFilter
        options={data}
        onChange={handleChange}
        defaultValue={term}
      />
    </div>
  );
};

export default CourseFilter;
