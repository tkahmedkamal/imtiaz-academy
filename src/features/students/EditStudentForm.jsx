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
      isMale: values.gender === 'male',
      isActive: values.active === 'active',
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
                label={`${t('global.name')}-en`}
                id='inputNamePr'
                value={values.namePr}
              />
              <Input
                name='nameSc'
                placeholder={`${t(
                  'students.form.placeholders.name',
                )} ( Malaysia )`}
                label={`${t('global.name')}-ml`}
                id='inputNameSc'
                value={values.nameSc}
              />
            </FormControl>

            <FormControl>
              <Input
                name='countryPr'
                placeholder={`${t(
                  'students.form.placeholders.country',
                )} ( English )`}
                label={`${t('global.country')}-en`}
                id='inputCountryPr'
                value={values.countryPr}
              />
              <Input
                name='countrySc'
                placeholder={`${t(
                  'students.form.placeholders.country',
                )} ( Malaysia )`}
                label={`${t('global.country')}-ml`}
                id='inputCountrySc'
                value={values.countrySc}
              />
            </FormControl>

            <FormControl>
              <Input
                name='statePr'
                placeholder={`${t(
                  'students.form.placeholders.state',
                )} ( English )`}
                label={`${t('students.form.state')}-en`}
                id='inputStatePr'
                value={values.statePr}
              />
              <Input
                name='stateSc'
                placeholder={`${t(
                  'students.form.placeholders.state',
                )} ( Malaysia )`}
                label={`${t('students.form.state')}-ml`}
                id='inputStateSc'
                value={values.stateSc}
              />
            </FormControl>

            <FormControl>
              <Input
                name='email'
                placeholder='example@example.com'
                label={t('global.email')}
                id='inputEmail'
                value={values.email}
              />
              <Input
                name='phoneNumber'
                placeholder={t('students.form.placeholders.phone')}
                label={t('global.phone')}
                id='inputPhoneNumber'
                value={values.phoneNumber}
              />
            </FormControl>

            <Input
              name='nationalId'
              placeholder={t('students.form.placeholders.national')}
              label={t('global.national')}
              id='inputNationalId'
              value={values.nationalId}
            />

            <FormControl>
              <Input
                name='jobPr'
                placeholder={`${t(
                  'students.form.placeholders.job',
                )} ( English )`}
                label={`${t('students.form.job')}-en`}
                id='inputJobPr'
                value={values.jobPr}
              />
              <Input
                name='jobSc'
                placeholder={`${t(
                  'students.form.placeholders.job',
                )} ( Malaysia )`}
                label={`${t('students.form.job')}-ml`}
                id='inputJobSc'
                value={values.jobSc}
              />
            </FormControl>

            <FormControl>
              <Input
                name='addressPr'
                placeholder={`${t(
                  'students.form.placeholders.address',
                )} ( English )`}
                label={`${t('global.address')}-en`}
                id='inputAddressPr'
                value={values.addressPr}
              />
              <Input
                name='addressSc'
                placeholder={`${t(
                  'students.form.placeholders.address',
                )} ( Malaysia )`}
                label={`${t('global.address')}-ml`}
                id='inputAddressSc'
                value={values.addressSc}
              />
            </FormControl>

            <FormControl>
              <Select
                label={t('global.gender')}
                name='gender'
                id='inputGender'
                value={values.gender}
              >
                <option value='male'>{t('global.male')}</option>
                <option value='female'>{t('global.female')}</option>
              </Select>
              <Select
                label={t('global.status')}
                name='active'
                id='inputStatus'
                value={values.active}
              >
                <option value='active'>{t('global.active')}</option>
                <option value='inactive'>{t('global.inactive')}</option>
              </Select>
            </FormControl>

            <Input
              name='age'
              placeholder={t('students.form.placeholders.age')}
              label={t('students.form.age')}
              type='number'
              id='inputAge'
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
