import SelectFilter from './SelectFilter';
import useFilter from '../hooks/useFilter';
import { useTranslation } from 'react-i18next';

import {useTeachersDialog} from '../hooks'
const TeacherFilter = () => {
  const { term, handler: handleChange } = useFilter('teacherId', true);
  const { data } = useTeachersDialog();
  const { t } = useTranslation();

  return (
    <div className='w-[160px]'>
      <SelectFilter
        options={data}
        onChange={handleChange}
        defaultValue={term}
        filterFor={t('global.allTeachers')}
      />
    </div>
  );
};

export default TeacherFilter;
