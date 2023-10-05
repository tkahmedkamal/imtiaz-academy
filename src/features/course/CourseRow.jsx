import { useTranslation } from 'react-i18next';
import { BiEdit } from 'react-icons/bi';

import { Table, ActionBtn, Modal, Tag } from '../../ui';
import EditCourseForm from './EditCourseForm';
import { useConfig } from '../../context/ConfigContext';

const CourseRow = ({ index, detail }) => {
  const { t } = useTranslation();
  const {
    id,
    numberOfClasses,
    classDurationInMinutes,
    cost,
    discount,
    costAfterDiscount,
    name,
    programType,
    isPersonal,
  } = detail;

  return (
    <Table.Tr>
      <Table.Td classes='font-bold'>#{index + 1}</Table.Td>
      <Table.Td>{name}</Table.Td>
      <Table.Td>{numberOfClasses}</Table.Td>
      <Table.Td>{classDurationInMinutes}</Table.Td>
      <Table.Td>{`${cost} MYR`}</Table.Td>
      <Table.Td>
        {discount > 0 ? `${discount}%` : <span>&mdash;</span>}
      </Table.Td>
      <Table.Td>{`${costAfterDiscount} MYR`}</Table.Td>
      <Table.Td>
        {isPersonal ? (
          <Tag
            label={programType}
            status='warn'
          />
        ) : (
          <Tag
            label={programType}
            status='info'
          />
        )}
      </Table.Td>
      <Table.Td classes='flex item-center gap-3'>
        <div className='flex w-full justify-center'>
          <Modal>
            <Modal.Open opens={`edit-educational-${id}`}>
              <ActionBtn
                title={t('global.edit')}
                icon={<BiEdit />}
                status='primary'
              />
            </Modal.Open>

            <Modal.Window name={`edit-educational-${id}`}>
              <EditCourseForm detail={detail} />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Td>
    </Table.Tr>
  );
};

export default CourseRow;
