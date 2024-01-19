import { useState } from 'react';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import { LoadingButton, Input, FormControl, Select } from '../../ui';
import { useCoursesDialog } from '../../hooks';
import { useTeachersDialog } from '../../hooks';
import useAddStudentEnrollment from './useAddStudentEnrollment';
import { enrollStudentSchema } from './validation';

const AddEnrollmentStudentForm = ({ studentId, closeModal }) => {
  const [isSpecialDiscount, setIsSpecialDiscount] = useState(false);
  const [isPersonal, setIsPersonal] = useState(false);
  const [isFullTimeSpecialCost, setIsFullTimeSpecialCost] = useState(false);
  const { t } = useTranslation();

  const { data: teachers, isLoading: isTeachersLoading } = useTeachersDialog();
  const { data: courses, isLoading: isCoursesLoading } = useCoursesDialog();
  const { mutate, isLoading: isAdding } = useAddStudentEnrollment(closeModal);

  const handleSubmit = values => {
    const data = {
      ...values,
      studentId,
      courseId: +values.courseId,
      enrollmentDate: new Date().toISOString(),
      studyStartDate: new Date(values.studyStartDate).toISOString(),
      studyEndDate: new Date(values.studyEndDate).toISOString(),
      CostIsMonthlyPerClass: isPersonal,
      isFullTimeSpecialCost,
    };
    mutate(data);
  };

  return (
    <>
      <h2 className='font-publicSans text-xl font-medium text-primary-text dark:text-dark-primary-text/75'>
        {t('students.enrollment.title')}
      </h2>

      <Formik
        initialValues={{
          teacherId: '',
          courseId: '',
          enrollmentCost: 0,
          numberOfClasses: 4,
          // classDuration: 10,
          studyStartDate: '',
          studyEndDate: '',
        }}
        validationSchema={enrollStudentSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className='mt-10 space-y-4'>
            <FormControl>
              <Select
                name='courseId'
                label={t('educational.course.title')}
                type='number'
                id='inputCourseId'
                disabled={isCoursesLoading}
              >
                {courses?.map(({ id, name }) => (
                  <option value={id} key={id}>
                    {name}
                  </option>
                ))}
              </Select>

              <Select
                name='teacherId'
                label={t('teacher.title')}
                type='number'
                id='inputTeacherId'
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
                type='date'
                name='studyStartDate'
                label={t('global.from')}
                id='inputStartDate'
              />

              <Input
                type='date'
                name='studyEndDate'
                label={t('global.to')}
                id='inputEndDate'
              />
            </FormControl>

            <div className='text-md flex items-center gap-2 font-publicSans font-medium text-dark-secondary-text'>
              <input
                type='checkbox'
                id='inputIsPersonal'
                onChange={e => {
                  const isChecked = e.target.checked;
                  setIsPersonal(isChecked);
                }}
              />
              <label htmlFor='inputIsPersonal'>
                {t('students.enrollment.changeNumberOfClasses')}
              </label>
            </div>

            {isPersonal && (
              <FormControl>
                <Input
                  type='number'
                  name='numberOfClasses'
                  placeholder='min 4 max 31'
                  label={t('students.enrollment.numberOfMeetingsPerMonth')}
                  id='inputNumberOfMeetingsPerMonth'
                  autoFocus
                />

                {/* <Input
                  type='number'
                  name='classDuration'
                  placeholder='min 10 minuets'
                  label={t('students.enrollment.classDurationPerMinuets')}
                  id='inputClassDurationPerMinuets'
                /> */}
              </FormControl>
            )}

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

            <div className='!mt-6 '>
              <LoadingButton
                disabled={isAdding}
                isLoading={isAdding}
                status='success'
              >
                {t('students.enrollment.buttons.add')}
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddEnrollmentStudentForm;
