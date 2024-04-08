import { useTranslation } from 'react-i18next';
import { BiEdit } from 'react-icons/bi';

import { Table, ActionBtn, Modal, Tag, Confirm } from '../../ui';
import EditStudentEnrollmentForm from './EditStudentEnrollmentForm';
import useDeleteStudentEnrollment from './useDeleteStudentEnrollment';
import { Archive } from '../../assets';
import { useAuthCtx } from '../../context/authContext';
import { MdPayment } from 'react-icons/md';
import AddPaymentTransactionForm from '../students/AddPaymentTransactionForm';
import { TbInfoSquare } from 'react-icons/tb';

import StudentDetails from '../students/details/accountant/StudentDetails';

const StudentsEnrollmentsRow = ({ index, student }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useDeleteStudentEnrollment();
  const { user } = useAuthCtx();

  const {
    studentId,
    studentName,
    studentPhoneNumber,
    enrollmentStatus,
    //teacherName,
    courseName,
    //teacherId,
    studentEnrollmentId,
    //courseId,
    //studyStartDate,
    // studyEndDate,
    // isCompletedStudy,
    // startDay,
    // startMonth,
    // startYear,
    // endDay,
    // endMonth,
    // endYear,
    enrollmentCost,
    numberOfClasses,
    paidAmountForCourse,
    studentCredit = enrollmentCost - paidAmountForCourse,
  } = student;

  return (
    <Table.Tr>
      <Table.Td classes='font-bold'>#{index + 1}</Table.Td>
      <Table.Td>{studentName}</Table.Td>
      <Table.Td>{courseName}</Table.Td>
      <Table.Td>{numberOfClasses}</Table.Td>

      {user.roles.includes('AccountantAgent') && (
        <>
        <Table.Td><Tag label={enrollmentCost} status='info'/></Table.Td>
          <Table.Td>
            {paidAmountForCourse > enrollmentCost ? (
              <Tag label={paidAmountForCourse} status='warn' />
            ) : paidAmountForCourse === 0 ? (
              <Tag label={paidAmountForCourse} status='error' />
            ) : paidAmountForCourse === enrollmentCost ? (
              <Tag label={paidAmountForCourse} status='success' />
            ) : paidAmountForCourse < enrollmentCost ? (
              <Tag label={paidAmountForCourse} status='error' />
            ) : (
              ''
            )}
          </Table.Td>
          <Table.Td>
             {studentCredit > enrollmentCost ? (
              <Tag label={studentCredit} status='warn' />
            ) : studentCredit === 0 ? (
              <Tag label={studentCredit} status='success' />
            ) : studentCredit === enrollmentCost ? (
              <Tag label={studentCredit} status='error' />
            ) : studentCredit < enrollmentCost ? (
              <Tag label={studentCredit} status='error' />
            ) : (
              ''
            )}
          </Table.Td>
        </>
      )}
<Table.Td>
  {enrollmentStatus === 1 ? (
    <Tag label={t(`global.active`)} status='success' />
  ) : enrollmentStatus === 2 ? (
    <Tag label={t(`global.pending`)} status='warn' />
  ) : enrollmentStatus === 4 ? (
    <Tag label={t(`global.completed`)} status='danger' />
  ) : enrollmentStatus === 3 ? (
    <Tag label={t('global.stopped')} status='success' />
  ) : (
    ''
  )}
</Table.Td>

      <Table.Td>{studentPhoneNumber}</Table.Td>

      <Table.Td classes='flex item-center gap-3'>
        <Modal>
          {/* <Modal.Open opens={`info-student-${studentId}`}>
            <ActionBtn
              title={t('global.info')}
              icon={<TbInfoSquare />}
              status='primary'
            />
          </Modal.Open>

          <Modal.Open opens={`enrollment-student-${studentId}`}>
            <ActionBtn
              title={t('global.enrollment')}
              icon={<TfiWrite />}
              status='primary'
            />
          </Modal.Open>

          <Modal.Open opens={`archive-student-${studentId}`}>
            <ActionBtn
              title={t('global.delete')}
              icon={<LuDelete />}
              status='danger'
            />
          </Modal.Open> */}
          <Modal.Open opens={`edit-student-${studentEnrollmentId}`}>
                <ActionBtn
                  title={t('global.edit')}
                  icon={<BiEdit />}
                  status='primary'
                />
              </Modal.Open>
              <Modal.Window name={`edit-student-${studentEnrollmentId}`}>
                <EditStudentEnrollmentForm
                  enrollmentId={studentEnrollmentId}
                  studentName={studentName}
                />
              </Modal.Window>
          {/* {user.roles.includes('EnrollmentAgent') && (
            <>
            
            </>
          )} */}

          {user.roles.includes('AccountantAgent') && (
            <>
              <Modal.Open opens={`add-student-transaction-${studentId}`}>
                <ActionBtn
                  title={t('students.transaction.title')}
                  icon={<MdPayment />}
                  status='primary'
                />
              </Modal.Open>
              <Modal.Window name={`add-student-transaction-${studentId}`}>
                <AddPaymentTransactionForm
                  studentId={studentId}
                  studentEnrollmentId={studentEnrollmentId}
                />
              </Modal.Window>
            </>
          )}
  <Modal.Open opens={`info-student-${studentId}`}>
            <ActionBtn
              title={t('global.info')}
              icon={<TbInfoSquare />}
              status='primary'
            />
          </Modal.Open>
          <Modal.Window name={`archive-student-${studentId}`}>
            <Confirm
              label={t('archive.label')}
              message={t('archive.message')}
              statusBtn='warn'
              icon={Archive}
              isLoading={isLoading}
              handleConfirm={() => mutate(studentId)}
            />
          </Modal.Window>

          <Modal.Window name={`info-student-${studentId}`} large>
            <StudentDetails studentId={studentId} />
          </Modal.Window>

        </Modal>
      </Table.Td>
    </Table.Tr>
  );
};

export default StudentsEnrollmentsRow;
