import { useTranslation } from 'react-i18next';
import { BiEdit } from 'react-icons/bi';
import { LuArchive } from 'react-icons/lu';
import { MdPayment } from 'react-icons/md';
import { TbInfoSquare } from 'react-icons/tb';
import { TfiWrite } from 'react-icons/tfi';

import { Table, ActionBtn, Modal, Tag, Confirm } from '../../../ui';
import EditStudentForm from '../EditStudentForm';
import useArchiveStudent from '../useArchiveStudent';
import AddPaymentTransactionForm from '../AddPaymentTransactionForm';
import AddEnrollmentStudentForm from '../AddEnrollmentStudentForm';
import { Archive } from '../../../assets';

const StudentsEnrollmentRow = ({ index, student }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useArchiveStudent();

  const {
    id,
    name,
    country,
    phoneNumber,
    age,
    registrationDay,
    registrationMonth,
    registrationYear,
    isActive,
    state,
  } = student;

  return (
    <Table.Tr>
      <Table.Td classes='font-bold'>#{index + 1}</Table.Td>
      <Table.Td>{name}</Table.Td>
      <Table.Td>{country}</Table.Td>
      <Table.Td>{phoneNumber}</Table.Td>
      <Table.Td>{age}</Table.Td>
      <Table.Td>
        {registrationDay}/{registrationMonth}/{registrationYear}
      </Table.Td>
      <Table.Td>
        {isActive ? (
          <Tag label={state} status='success' />
        ) : (
          <Tag label={state} status='warn' />
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

          <Modal.Open opens={`enrollment-student-${id}`}>
            <ActionBtn
              title={t('global.enrollment')}
              icon={<TfiWrite />}
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

          <Modal.Window name={`edit-student-${id}`}>
            <EditStudentForm studentId={id} />
          </Modal.Window>

          <Modal.Window name={`add-student-transaction-${id}`}>
            <AddPaymentTransactionForm studentId={id} />
          </Modal.Window>

          <Modal.Window name={`enrollment-student-${id}`}>
            <AddEnrollmentStudentForm studentId={id} />
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

export default StudentsEnrollmentRow;
