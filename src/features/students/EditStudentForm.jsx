import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import { LoadingButton, Input, FormControl, Select } from '../../ui';
import { studentSchema } from './validation';
import useStudent from './useStudent.js';
import useEditStudent from './useEditStudent';

const EditStudentForm = ({ studentId, closeModal }) => {
  const { data, isLoading: isLoadingStudent } = useStudent(studentId);
  const { mutate, isLoading } = useEditStudent(closeModal);
  const { t } = useTranslation();

  const { name, country, phoneNumber, isActive } = data?.student || {};

  const handleSubmit = values => {
    const data = {
      id: studentId,
      ...values,
      isActive: values.active === 'active',
    };
    delete data.active;

    mutate(data);
  };

  return (
    <>
      <h2 className='font-publicSans text-xl font-medium text-primary-text dark:text-dark-primary-text/75'>
        {t('students.editTitle')}
      </h2>

      <Formik
        initialValues={{
          name: name || '',
          country: country || '',
          phoneNumber: phoneNumber || '',
          active: isActive ? 'active' : 'inactive',
        }}
        validationSchema={studentSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => (
          <Form className='mt-10 space-y-4'>
            <FormControl>
              <Input
                name='name'
                placeholder={`${t('students.form.placeholders.name')}`}
                label={`${t('global.name')}`}
                id='inputName'
                value={values.name}
                disabled={isLoadingStudent}
              />
              <Input
                name='country'
                placeholder={`${t('students.form.placeholders.country')}`}
                label={`${t('global.country')}`}
                id='inputCountry'
                value={values.country}
                disabled={isLoadingStudent}
              />
            </FormControl>

            <FormControl>
              <Input
                name='phoneNumber'
                placeholder={t('students.form.placeholders.phone')}
                label={t('global.phone')}
                id='inputPhoneNumber'
                value={values.phoneNumber}
                disabled={isLoadingStudent}
              />

              <Select
                label={t('global.status')}
                name='active'
                id='inputStatus'
                value={values.active}
                disabled={isLoadingStudent}
              >
                <option value='active'>{t('global.active')}</option>
                <option value='inactive'>{t('global.inactive')}</option>
              </Select>
            </FormControl>

            <div className='!mt-6 '>
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

export default EditStudentForm;
