import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import { LoadingButton, Input, FormControl, Select } from '../../ui';
import { studentSchema } from './validation';
import useEditStudent from './useEditStudent';

const EditStudentForm = ({ student, closeModal }) => {
  const { mutate, isLoading } = useEditStudent(closeModal);
  const { t } = useTranslation();

  const {
    namePr,
    nameSc,
    countryPr,
    countrySc,
    statePr,
    stateSc,
    email,
    phoneNumber,
    nationalId,
    jobPr,
    jobSc,
    addressPr,
    addressSc,
    isMale,
    isActive,
    age,
  } = student;

  const handleSubmit = values => {
    const data = {
      ...student,
      ...values,
      isMale: values.gender === 'male' ? true : false,
      isActive: values.active === 'active' ? true : false,
    };
    delete data.active;
    delete data.gender;

    mutate(data);
  };

  return (
    <>
      <h2 className='font-publicSans text-xl font-medium text-primary-text dark:text-dark-primary-text/75'>
        {t('students.editTitle')}
      </h2>

      <Formik
        initialValues={{
          namePr,
          nameSc,
          countryPr,
          countrySc,
          statePr,
          stateSc,
          email,
          phoneNumber,
          nationalId,
          jobPr,
          jobSc,
          addressPr,
          addressSc,
          age,
          gender: isMale ? 'male' : 'female',
          active: isActive ? 'active' : 'inactive',
        }}
        validationSchema={studentSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className='mt-10 space-y-4'>
            <FormControl>
              <Input
                name='namePr'
                placeholder={`${t(
                  'students.form.placeholders.name',
                )} ( English )`}
                id={`${t('global.name')}-en`}
                value={values.namePr}
              />
              <Input
                name='nameSc'
                placeholder={`${t(
                  'students.form.placeholders.name',
                )} ( Malaysia )`}
                id={`${t('global.name')}-ml`}
                value={values.nameSc}
              />
            </FormControl>

            <FormControl>
              <Input
                name='countryPr'
                placeholder={`${t(
                  'students.form.placeholders.country',
                )} ( English )`}
                id={`${t('global.country')}-en`}
                value={values.countryPr}
              />
              <Input
                name='countrySc'
                placeholder={`${t(
                  'students.form.placeholders.country',
                )} ( Malaysia )`}
                id={`${t('global.country')}-ml`}
                value={values.countrySc}
              />
            </FormControl>

            <FormControl>
              <Input
                name='statePr'
                placeholder={`${t(
                  'students.form.placeholders.state',
                )} ( English )`}
                id={`${t('students.form.state')}-en`}
                value={values.statePr}
              />
              <Input
                name='stateSc'
                placeholder={`${t(
                  'students.form.placeholders.state',
                )} ( Malaysia )`}
                id={`${t('students.form.state')}-ml`}
                value={values.stateSc}
              />
            </FormControl>

            <FormControl>
              <Input
                name='email'
                placeholder='example@example.com'
                id={t('global.email')}
                value={values.email}
              />
              <Input
                name='phoneNumber'
                placeholder={t('students.form.placeholders.phone')}
                id={t('global.phone')}
                value={values.phoneNumber}
              />
            </FormControl>

            <Input
              name='nationalId'
              placeholder={t('students.form.placeholders.national')}
              id={t('global.national')}
              value={values.nationalId}
            />

            <FormControl>
              <Input
                name='jobPr'
                placeholder={`${t(
                  'students.form.placeholders.job',
                )} ( English )`}
                id={`${t('students.form.job')}-en`}
                value={values.jobPr}
              />
              <Input
                name='jobSc'
                placeholder={`${t(
                  'students.form.placeholders.job',
                )} ( Malaysia )`}
                id={`${t('students.form.job')}-ml`}
                value={values.jobSc}
              />
            </FormControl>

            <FormControl>
              <Input
                name='addressPr'
                placeholder={`${t(
                  'students.form.placeholders.address',
                )} ( English )`}
                id={`${t('global.address')}-en`}
                value={values.addressPr}
              />
              <Input
                name='addressSc'
                placeholder={`${t(
                  'students.form.placeholders.address',
                )} ( Malaysia )`}
                id={`${t('global.address')}-ml`}
                value={values.addressSc}
              />
            </FormControl>

            <FormControl>
              <Select
                label={t('global.gender')}
                name='gender'
                value={values.gender}
              >
                <option value='male'>{t('global.male')}</option>
                <option value='female'>{t('global.female')}</option>
              </Select>
              <Select
                label={t('global.status')}
                name='active'
                value={values.active}
              >
                <option value='active'>{t('global.active')}</option>
                <option value='inactive'>{t('global.inactive')}</option>
              </Select>
            </FormControl>

            <Input
              name='age'
              placeholder={t('students.form.placeholders.age')}
              id={t('students.form.age')}
              type='number'
              min='5'
              max='100'
              value={values.age}
            />

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
