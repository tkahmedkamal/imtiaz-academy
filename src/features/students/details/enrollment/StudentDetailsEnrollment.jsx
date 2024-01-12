import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Tag } from '../../../../ui';

const StudentDetailsEnrollment = ({ enrollments }) => {
  const { t } = useTranslation();

  if (!enrollments) {
    return null;
  }

  return (
    <>
      <div className='h-[500px] overflow-auto'>
        {enrollments.length > 0 && (
          <Table>
            <Table.Thead>
              <Table.Th>{t('global.index')}</Table.Th>
              <Table.Th>{t('studentEnr.teacher')}</Table.Th>
              <Table.Th>{t('studentEnr.startDate')}</Table.Th>
              <Table.Th>{t('studentEnr.endDate')}</Table.Th>
              <Table.Th>{t('studentEnr.course')}</Table.Th>
              <Table.Th>{t('global.status')}</Table.Th>
            </Table.Thead>

            <Table.Tbody
              data={enrollments}
              render={(enrollment, index) => (
                <Table.Tr key={index}>
                  <Table.Td classes='font-bold'>#{index + 1}</Table.Td>
                  <Table.Td>{enrollment.teacherName}</Table.Td>
                  <Table.Td>{enrollment.startDay}/{enrollment.startMonth}/{enrollment.startYear}</Table.Td>
                  <Table.Td>{enrollment.endDay}/{enrollment.endMonth}/{enrollment.endYear}</Table.Td>
                  <Table.Td>{enrollment.courseName}</Table.Td>
                  <Table.Td>
                    {enrollment.isCompletedStudy === 'Completed' ? (
                      <Tag
                        label={enrollment.isCompletedStudy}
                        status='success'
                      />
                    ) : (
                      <Tag label={enrollment.isCompletedStudy} status='warn' />
                    )}
                  </Table.Td>
                </Table.Tr>
              )}
            />
          </Table>
        )}

        {enrollments.length === 0 && (
          <p className='font-publicSans font-medium text-secondary-text dark:text-dark-secondary-text'>
            There are no registration details for this student 😞
          </p>
        )}
      </div>
    </>
  );
};

export default StudentDetailsEnrollment;
