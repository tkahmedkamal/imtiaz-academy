import { useTranslation } from 'react-i18next';
import { BiEdit } from 'react-icons/bi';
import { LuFileArchive } from 'react-icons/lu';
import { MdPayment } from 'react-icons/md';
import { TbInfoSquare } from 'react-icons/tb';

import { Table, ActionBtn, Modal, Tag, Confirm } from '../../ui';
import EditStudentForm from './EditStudentForm';
import { useConfig } from '../../context/ConfigContext';
import useArchiveStudent from './useArchiveStudent';
import AddPaymentTransactionForm from './AddPaymentTransactionForm.jsx';
import { Archive } from '../../assets';

const StudentRow = ({ index, student }) => {
  const { t } = useTranslation();
  const { lng } = useConfig();
  const { mutate, isLoading } = useArchiveStudent();

  const {
    id,
    namePr,
    nameSc,
    countryPr,
    countrySc,
    phoneNumber,
    isActive,
    statusTypePr,
    statusTypeSc,
    credit,
  } = student;

  return (
    <Table.Tr>
      <Table.Td classes='font-bold'>#{index + 1}</Table.Td>
      <Table.Td>{lng === 'en' ? namePr : nameSc}</Table.Td>
      <Table.Td>{lng === 'en' ? countryPr : countrySc}</Table.Td>
      <Table.Td>{phoneNumber}</Table.Td>
      <Table.Td>
        {credit < 0 ? (
          <Tag label={credit} status='info' />
        ) : credit === 0 ? (
          <Tag label={credit} status='success' />
        ) : credit > 0 ? (
          <Tag label={credit} status='error' />
        ) : (
          ''
        )}
      </Table.Td>
      <Table.Td>
        {isActive ? (
          <Tag
            label={lng === 'en' ? statusTypePr : statusTypeSc}
            status='success'
          />
        ) : (
          <Tag
            label={lng === 'en' ? statusTypePr : statusTypeSc}
            status='warn'
          />
        )}
      </Table.Td>

      <Table.Td classes='flex item-center gap-3'>
        <Modal>
          <Modal.Open opens={`edit-student-${id}`}>
            <ActionBtn
              title={t('global.edit')}
              icon={<BiEdit />}
              status='primary'
            />
          </Modal.Open>

          <Modal.Open opens={`add-student-transaction-${id}`}>
            <ActionBtn
              title={t('students.transaction.title')}
              icon={<MdPayment />}
              status='primary'
            />
          </Modal.Open>

          <Modal.Open opens={`info-student-${id}`}>
            <ActionBtn
              title={t('global.info')}
              icon={<TbInfoSquare />}
              status='primary'
            />
          </Modal.Open>

          <Modal.Open opens={`archive-student-${id}`}>
            <ActionBtn
              title={t('global.archive')}
              icon={<LuFileArchive />}
              status='warn'
            />
          </Modal.Open>

          <Modal.Window name={`edit-student-${id}`}>
            <EditStudentForm student={student} />
          </Modal.Window>

          <Modal.Window name={`add-student-transaction-${id}`}>
            <AddPaymentTransactionForm studentId={id} />
          </Modal.Window>

          <Modal.Window name={`archive-student-${id}`}>
            <Confirm
              label={t('archive.label')}
              message={t('archive.message')}
              statusBtn='warn'
              icon={Archive}
              isLoading={isLoading}
              handleConfirm={() => mutate(id)}
            />
          </Modal.Window>
        </Modal>
      </Table.Td>
    </Table.Tr>
  );
};

export default StudentRow;
