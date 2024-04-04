import SelectFilter from './SelectFilter';
import useFilter from '../hooks/useFilter';
import { useTranslation } from 'react-i18next';

const SortColumn = ({ data }) => {
  const { handler: handleChange } = useFilter('sortColumn', true, '');
  const { t } = useTranslation();


  return (
    
    <div className='w-[160px]'>
      <SelectFilter
        options={data}
        onChange={handleChange}
        defaultValue=''
        filterFor={t('global.allColumns')}
      />
    </div>
  );
};

export default SortColumn;
