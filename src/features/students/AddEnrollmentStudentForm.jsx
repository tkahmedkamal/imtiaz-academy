import { useState } from 'react';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import { LoadingButton, Input, FormControl, Select } from '../../ui';
import { useCoursesDialog } from '../../hooks';
import { useTeachersDialog } from '../../hooks';

const AddEnrollmentStudentForm = ({ studentId, closeModal }) => {
  const [isSpecialDiscount, setIsSpecialDiscount] = useState(false);
  const [isPersonal, setIsPersonal] = useState(false);
  const [courseId, setCourseId] = useState('0');
  const [teacherId, setTeacherId] = useState('1');
  const { t } = useTranslation();

  const { data: teachers, isTeachersLoading } = useTeachersDialog();

  const { data: courses, isCoursesLoading } = useCoursesDialog();

  const handleSubmit = values => {};

  return (
    <>
      <h2 className='font-publicSans text-xl font-medium text-primary-text dark:text-dark-primary-text/75'>
        {t('students.enrollment.title')}
      </h2>

      <Formik
        initialValues={{
          teacherId: '',
          courseId: '',
          registrationCost: '',
        }}
        // validationSchema={paymentTransactionSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange }) => (
          <Form className='mt-10 space-y-4'>
            <FormControl>
              <Select
                name='courseId'
                label={t('educational.course.title')}
                type='number'
                id='inputCourseId'
                set={setCourseId}
                onChange={e => setCourseId(e.target.value)}
              >
                {courses?.map(({ courseId, courseName }) => (
                  <option value={courseId} key={courseId}>
                    {courseName}
                  </option>
                ))}
              </Select>
              <Select
                name='teacherId'
                label={t('teacher.title')}
                type='number'
                id='inputTeacherId'
                set={setTeacherId}
                onChange={e => setTeacherId(e.target.value)}
              >
                {teachers?.map(({ teacherId, teacherName }) => (
                  <option value={teacherId} key={teacherId}>
                    {teacherName}
                  </option>
                ))}
              </Select>
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
                {t('students.enrollment.isPersonal')}
              </label>
            </div>
            {(isPersonal && !isSpecialDiscount) && (
              <FormControl>
                <Input
                  name='numberOfMeetingsPerMonth'
                  placeholder='min 4 max 31'
                  label={t('students.enrollment.numberOfMeetingsPerMonth')}
                  id='inputNumberOfMeetingsPerMonth'
                  autoFocus
                />
                <Input
                  name='classDurationPerMinuets'
                  placeholder='min 10 minuets'
                  label={t('students.enrollment.classDurationPerMinuets')}
                  id='inputClassDurationPerMinuets'
                  
                />
              
              </FormControl>
            )}
            {(isPersonal && isSpecialDiscount) && (
              <FormControl>
                <Input
                  name='numberOfMeetingsPerMonth'
                  placeholder='min 4 max 31'
                  label={t('students.enrollment.numberOfMeetingsPerMonth')}
                  id='inputNumberOfMeetingsPerMonth'
                  autoFocus
                />
                <Input
                  name='classDurationPerMinuets'
                  placeholder='min 10 minuets'
                  label={t('students.enrollment.classDurationPerMinuets')}
                  id='inputClassDurationPerMinuets'
                  
                />
              
              </FormControl>
            )}

            <div className='text-md flex items-center gap-2 font-publicSans font-medium text-dark-secondary-text'>
              <input
                type='checkbox'
                id='inputSpecialDiscount'
                onChange={e => {
                  const isChecked = e.target.checked;
                  setIsSpecialDiscount(isChecked);
                }}
              />
              <label htmlFor='inputSpecialDiscount'>
                {t('students.enrollment.discountCheckbox')}
              </label>
            </div>
            {(isSpecialDiscount && !isPersonal) && (
              <FormControl>
                <Input
                  name='registrationCost'
                  placeholder='0'
                  label={t('students.enrollment.totalRegistrationCost')}
                  id='inputRegistrationCost'
                  autoFocus
                />
              </FormControl>
            )}
            {(isSpecialDiscount && isPersonal) && (
              <FormControl>
                <Input
                  name='registrationCost'
                  placeholder='0'
                  label={t('students.enrollment.registrationCostPerClass')}
                  id='inputRegistrationCost'
                  autoFocus
                />
              </FormControl>
            )}


            <div className='!mt-6 '>
              <LoadingButton
                disabled={false}
                isLoading={false}
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
