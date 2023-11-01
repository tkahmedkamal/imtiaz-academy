import { useTranslation } from 'react-i18next';
import { BiEdit } from 'react-icons/bi';
import { LuArchive } from 'react-icons/lu';
import { TbInfoSquare } from 'react-icons/tb';
import { TfiWrite } from 'react-icons/tfi';

import { Table, ActionBtn, Modal, Tag, Confirm } from '../../../ui';
import useArchiveStudent from '../useArchiveStudent';

const StudentsTeacherRow = ({ index, student }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useArchiveStudent();

  const {
    name,
    studentId,
    email,
    phoneNumber,
    country,
    teacherId,
    isCompleted,
    studyStartMonth,
    studyStartYear,
    studyStartDay,
    studyEndDate,
    studyEndMonth,
    studyEndYear,
    studyEndDay,
    courseName,
    studentEnrollmentId,
    isActive,
  } = student;

  return (
    <Table.Tr>
      <Table.Td classes='font-bold'>#{index + 1}</Table.Td>
      <Table.Td>{name}</Table.Td> 
      <Table.Td>{country}</Table.Td>
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

    </Table.Tr>
  );
};

export default StudentsTeacherRow;
