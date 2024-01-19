import { useTranslation } from 'react-i18next';
import { Table,ActionBtn, Modal, Tag } from '../../../ui';
import StudentDetails from '../details/accountant/StudentDetails';
import { BiEdit } from 'react-icons/bi';
import { TbInfoSquare } from 'react-icons/tb';
const StudentsTeacherRow = ({ index, student }) => {
  const { t } = useTranslation();

  const {
    studentId,
    name,
    email,
    phoneNumber,
    studyStartMonth,
    studyStartYear,
    studyStartDay,
    studyEndMonth,
    studyEndYear,
    studyEndDay,
    courseName,
    isActive,
  } = student;

  return (
    <Table.Tr>
      <Table.Td classes='font-bold'>{index + 1}</Table.Td>
      <Table.Td>{name}</Table.Td>
      <Table.Td>{phoneNumber}</Table.Td>
      <Table.Td>{email}</Table.Td>
      <Table.Td>
        {studyStartDay}/{studyStartMonth}/{studyStartYear}
      </Table.Td>
      <Table.Td>
        {studyEndDay}/{studyEndMonth}/{studyEndYear}
      </Table.Td>
      <Table.Td>{courseName}</Table.Td>

      <Table.Td>
        {isActive ? (
          <Tag label={'Active'} status='success' />
        ) : (
          <Tag label={'Pending'} status='warn' />
        )}
      </Table.Td>
      <Table.Td classes='flex item-center gap-3'>
        <Modal>
          <Modal.Open opens={`edit-student-${studentId}`}>
            <ActionBtn
              title={t('global.edit')}
              icon={<BiEdit />}
              status='primary'
            />
          </Modal.Open>

          <Modal.Open opens={`info-student-${studentId}`}>
            <ActionBtn
              title={t('global.info')}
              icon={<TbInfoSquare />}
              status='primary'
            />
          </Modal.Open>
          <Modal.Window name={`info-student-${studentId}`} large>
            <StudentDetails studentId={studentId} />
          </Modal.Window>


        </Modal>
          </Table.Td>
    </Table.Tr>
  );
};

export default StudentsTeacherRow;
