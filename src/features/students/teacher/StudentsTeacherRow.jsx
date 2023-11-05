import { Table, Tag } from '../../../ui';

const StudentsTeacherRow = ({ index, student }) => {
  const {
    name,
    email,
    phoneNumber,
    country,
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
