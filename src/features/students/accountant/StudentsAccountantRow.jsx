import { useTranslation } from 'react-i18next';
import { LuArchive } from 'react-icons/lu';
import { MdPayment } from 'react-icons/md';
import { TbInfoSquare } from 'react-icons/tb';

import { Table, ActionBtn, Modal, Tag, Confirm } from '../../../ui';
import useArchiveStudent from '../useArchiveStudent';
import AddPaymentTransactionForm from '../AddPaymentTransactionForm';
import { Archive } from '../../../assets';

const StudentsAccountantRow = ({ index, student }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useArchiveStudent();

  const {
    id,
    name,
    country,
    phoneNumber,
    totalPaidAmount,
    totalEnrollmentCost,
    isActive,
    statusType,
    credit,
  } = student;

  return (
    <Table.Tr>
      <Table.Td classes='font-bold'>#{index + 1}</Table.Td>
      <Table.Td>{name}</Table.Td>
      <Table.Td>{country}</Table.Td>
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
      <Table.Td>{totalPaidAmount}</Table.Td>
      <Table.Td>{totalEnrollmentCost}</Table.Td>
      <Table.Td>
        {isActive ? (
          <Tag label={statusType} status='success' />
        ) : (
          <Tag label={statusType} status='warn' />
        )}
      </Table.Td>

      <Table.Td classes='flex item-center gap-3'>
        <Modal>
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
              icon={<LuArchive />}
              status='danger'
            />
          </Modal.Open>

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

export default StudentsAccountantRow;
