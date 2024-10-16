import SelectFilter from './SelectFilter';
import useFilter from '../hooks/useFilter';
import { useTranslation } from 'react-i18next';

import {useCoursesDialog} from '../hooks'
const CourseFilter = () => {
  const { term, handler: handleChange } = useFilter('courseId', true);
  const { data } = useCoursesDialog();
  const { t } = useTranslation();

  return (
    <div className='w-[160px]'>
      <SelectFilter
        options={data}
        onChange={handleChange}
        defaultValue={term}
        filterFor={t('global.allCourses')}
      />
    </div>
  );
};

export default CourseFilter;
