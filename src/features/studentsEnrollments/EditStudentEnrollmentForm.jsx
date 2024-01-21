import React from 'react';
import { useState } from 'react';

import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import {
  LoadingButton,
  Input,
  FormControl,
  Select,
  SelectOption,
} from '../../ui/index.js';

import { enrollStudentSchema } from '../students/validation';
import useStudentEnrollment from './useStudentEnrollment.js';
import useEditStudentEnrollment from './useEditStudentEnrollment.js';
import { useTeachersDialog } from '../../hooks/index.js';
import { useCoursesDialog } from '../../hooks/index.js';

const EditStudentEnrollmentForm = ({ enrollmentId, studentName,closeModal }) => {

  
  const { data, isLoading: isLoadingStudent } = useStudentEnrollment(enrollmentId);
  const { mutate, isLoading } = useEditStudentEnrollment(closeModal);

  // const [isSpecialDiscount, setIsSpecialDiscount] = useState(false);
  // const [isPersonal, setIsPersonal] = useState(false);
  const [isFullTimeSpecialCost, setIsFullTimeSpecialCost] = useState(false);
  const [isSpecialDiscount, setIsSpecialDiscount] = useState(false);

  const { t } = useTranslation();

  const {
    id,
    numberOfClasses,
    additionalMeetings,
    enrollmentDate,
    enrollmentCost,
    year,
    month,
    studentId,
    courseId,
    teacherId,
    quarterId,
    costIsMonthlyPerClass,
    isCompleted,
    isActive,
    studyStartDate,
    studyEndDate,
    createdBy,
    updatedBy,
  } = data?.data || {};


  const { data: teachers, isLoading: isTeachersLoading } = useTeachersDialog();
  const { data: courses, isLoading: isCoursesLoading } = useCoursesDialog();

  const handleSubmit = values => {

    const data = {
      id:values.id,
      numberOfClasses: values.numberOfClasses,
      additionalMeetings: values.additionalMeetings,
      enrollmentDate: values.enrollmentDate,
      enrollmentCost: values.enrollmentCost,
      year: values.year,
      month: values.month,
      studentId: values.studentId,
      courseId: values.courseId,
      teacherId: values.teacherId,
      quarterId: values.quarterId,
      costIsMonthlyPerClass: values.costIsMonthlyPerClass,
      isCompleted: values.programStatus === 'Completed',
      isActive: values.studyStatus === 'Active',
      isFullTimeSpecialCost: values.isFullTimeSpecialCost,
      createdBy: values.createdBy,
      updatedBy: values.updatedBy,
      studyStartDate: new Date(values.studyStartDate).toISOString().split('T')[0],//new Date(newStudyStartDate).toISOString(),
      studyEndDate:new Date(values.studyEndDate).toISOString().split('T')[0] ,//new Date(newStudyEndDate).toISOString()
    };

    // Additional cleanup or modifications if needed

    mutate(data);
  };

  return (
    <>
      <h2 className='font-publicSans text-xl font-medium text-primary-text dark:text-dark-primary-text/75'>
        {t('studentEnr.title')} : {studentName}
      </h2>

      <Formik
        initialValues={{
          id: id ||'',
          numberOfClasses: numberOfClasses || '',
          additionalMeetings: additionalMeetings || '',
          enrollmentDate: enrollmentDate || '',
          enrollmentCost: enrollmentCost || '',
          year: year || '',
          month: month || '',
          studentId: studentId || '',
          courseId: courseId || '',
          teacherId: teacherId || '',
          quarterId: quarterId || '',
          costIsMonthlyPerClass: costIsMonthlyPerClass,
          isActive: isActive,
          isFullTimeSpecialCost: isFullTimeSpecialCost,
          studyStartDate: data?.data?.studyStartDate ? new Date(data.data.studyStartDate).toISOString().split('T')[0] : '',
          studyEndDate: data?.data?.studyEndDate ? new Date(data.data.studyEndDate).toISOString().split('T')[0] : '',
          createdBy: createdBy || '',
          updatedBy: updatedBy || '',
          studyStatus : isActive ? 'Active' : 'Pending..',
          programStatus: isCompleted ? 'Completed' : 'In Study'
        }}
        validationSchema={enrollStudentSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => (
          <Form className='mt-10 space-y-4'>
            <FormControl>
              <Select
                name='courseId'
                label={t('educational.course.title')}
                type='number'
                id='inputCourseId'
                selected={values.courseId}
                disabled={isCoursesLoading}
              >
                {courses?.map(({ id, name }) => (
                  <option value={id} key={name}>
                    {name}
                  </option>
                ))}
              </Select>

              <Select
                name='teacherId'
                label={t('teacher.title')}
                type='number'
                id='inputTeacherId'
                selected={values.teacherId}
                disabled={isTeachersLoading}
              >
                {teachers?.map(({ id, name }) => (
                  <option value={id} key={id}>
                    {name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <Input
                name='numberOfClasses'
                label={t('students.enrollment.numberOfMeetingsPerMonth')}
                id='inputNumberOfClasses'
                value={values.numberOfClasses}
                disabled={isLoadingStudent}
              />
              <Input
                name='additionalMeetings'
                label={t('students.enrollment.additionalMeetings')}
                id='inputNumberOfClasses'
                value={values.additionalMeetings}
                disabled={isLoadingStudent}
              />
            </FormControl>

            <FormControl>
              <Input
                value={values.studyStartDate}
                type = 'date'
                name='studyStartDate'
                label={t('global.from')}
                id='inputStudyStartDate'
                // disabled={true}
              />
              <Input
              value={values.studyEndDate}
              type = 'date'
                name='studyEndDate'
                label={t('global.to')}
                id='inputStudyEndDate'
              />
            </FormControl>

            <FormControl>
              <Select
                name='studyStatus'
                label={t('global.studyStatus')}
                id='inputIsActive'
                selected={values.studyStatus}
                disabled={isLoadingStudent}
              >
                <SelectOption value='Active' label='Active' />
                <SelectOption value='Pending..' label='Pending..' />
              </Select>
              <Select
                name='programStatus'
                label={t('global.programStatus')}
                id='inputIsActive'
                selected={values.programStatus}
                disabled={isLoadingStudent}
              >
                <SelectOption value='Completed' label='Completed' />
                <SelectOption value='In Study' label='In Study' />
              </Select>
            </FormControl>

            <div className='text-md flex items-center gap-2 font-publicSans font-medium text-dark-secondary-text'>
              <input
                type='checkbox'
                id='inputSpecialDiscount'
                onChange={e => {
                  const isChecked = e.target.checked;
                  setIsSpecialDiscount(isChecked);
                  setIsFullTimeSpecialCost(false);
                }}
              />
              <label htmlFor='inputSpecialDiscount'>
                {t('students.enrollment.discountCheckbox')}
              </label>
            </div>
            {isSpecialDiscount && (
              <FormControl>
                <Input
                  type='number'
                  name='enrollmentCost'
                  placeholder='0'
                  label={t('students.enrollment.totalRegistrationCost')}
                  id='inputRegistrationCost'
                  autoFocus
                  value={0}
                />
                <div className='text-md flex items-center gap-2 font-publicSans font-medium text-dark-secondary-text'>
                  <input
                    type='checkbox'
                    id='inputIsFullTimeSpecialCost'
                    onChange={e => {
                      const isChecked = e.target.checked;
                      setIsFullTimeSpecialCost(isChecked);
                      if (isChecked) {
                        alert(
                          'This cost will be apply for all student lessons until end program!!',
                        );
                      }
                    }}
                  />
                  <label htmlFor='inputIsFullTimeSpecialCost'>
                    {t('students.enrollment.isFullTimeSpecialCost')}
                  </label>
                </div>
              </FormControl>
            )}


            <div className='!mt-6'>
              <LoadingButton
                disabled={isLoading}
                isLoading={isLoading}
                status='success'
              >
                {t('students.buttons.edit')}
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditStudentEnrollmentForm;
