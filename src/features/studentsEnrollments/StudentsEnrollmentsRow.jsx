import { useTranslation } from 'react-i18next';
import { BiEdit } from 'react-icons/bi';
import { LuArchive } from 'react-icons/lu';
import { TbInfoSquare } from 'react-icons/tb';
import { TfiWrite } from 'react-icons/tfi';

import { Table, ActionBtn, Modal, Tag, Confirm } from '../../ui';
import EditStudentEnrollmentForm from './EditStudentEnrollmentForm';
import useDeleteStudentEnrollment from './useDeleteStudentEnrollment';
import { Archive } from '../../assets';

const StudentsEnrollmentsRow = ({ index, student }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useDeleteStudentEnrollment();

  const {
    studentId,
    studentName,
    studentPhoneNumber,
    enrollmentDate,
    isCompleted,
    teacherName,
    courseName,
    teacherId,
    studentEnrollmentsId,
    courseId,
    studyStartDate,
    studyEndDate,
    isCompletedStudy,
    startDay,
    startMonth,
    startYear,
    endDay,
    endMonth,
    endYear,
    numberOfClasses
  } = student;

  return (
    <Table.Tr>
      <Table.Td classes='font-bold'>#{index + 1}</Table.Td>
      <Table.Td>{studentName}</Table.Td>
      <Table.Td>{courseName}</Table.Td>
      <Table.Td>{numberOfClasses}</Table.Td>
      {/* <Table.Td>{teacherName}</Table.Td> */}
      <Table.Td>
        {isCompleted ? (
          <Tag label={'Completed'} status='success' />
        ) : (
          <Tag label={'Active'} status='warn' />
        )}
      </Table.Td>
      <Table.Td>{studentPhoneNumber}</Table.Td>

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

          <Modal.Open opens={`enrollment-student-${studentId}`}>
            <ActionBtn
              title={t('global.enrollment')}
              icon={<TfiWrite />}
              status='primary'
            />
          </Modal.Open>

          <Modal.Open opens={`archive-student-${studentId}`}>
            <ActionBtn
              title={t('global.archive')}
              icon={<LuArchive />}
              status='danger'
            />
          </Modal.Open>

          <Modal.Window name={`edit-student-${studentId}`}>
            <EditStudentEnrollmentForm studentId={studentId} />
          </Modal.Window>

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
        </Modal>
      </Table.Td>
    </Table.Tr>
  );
};

export default StudentsEnrollmentsRow;
