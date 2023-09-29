import { useState } from 'react';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import { LoadingButton, Input, FormControl, Select } from '../../ui';
import useCourse from '../course/useCourse';
import useTeachers from '../teachers/useTeachers';
import { useConfig } from '../../context/ConfigContext';

const AddEnrollmentStudentForm = ({ studentId, closeModal }) => {
  const [isSpecialDiscount, setIsSpecialDiscount] = useState(false);
  const [courseId, setCourseId] = useState('0');
  const { t } = useTranslation();
  const { lng } = useConfig();

  const { data: coursesResponse, isLoading: isLoadingCourses } = useCourse();
  const { data: teachersResponse, isLoading: isLoadingTeachers } =
    useTeachers();

  const courses = coursesResponse?.pagedResponse?.data || [];
  const teachers = teachersResponse?.pagedResponse?.data || [];

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
                disabled={isLoadingCourses}
                set={setCourseId}
              >
                {courses?.map(({ id, namePr, nameSc }) => (
                  <option value={id} key={id}>
                    {lng === 'en' ? namePr : nameSc}
                  </option>
                ))}
              </Select>
              <Select
                name='teacherId'
                label={t('teacher.title')}
                type='number'
                id='inputTeacherId'
                disabled={isLoadingTeachers}
              >
                {teachers?.map(({ id, namePr, nameSc }) => (
                  <option value={id} key={id}>
                    {lng === 'en' ? namePr : nameSc}
                  </option>
                ))}
              </Select>
            </FormControl>

            {isSpecialDiscount && (
              <FormControl>
                <Input
                  name='registrationCost'
                  placeholder='0'
                  label={t('students.enrollment.registrationCost')}
                  id='inputRegistrationCost'
                  autoFocus
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
