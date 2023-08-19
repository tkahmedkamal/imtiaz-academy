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
  } = data?.student || {};

  const handleSubmit = values => {
    const data = {
      id: studentId,
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
          namePr: namePr || '',
          nameSc: nameSc || '',
          countryPr: countryPr || '',
          countrySc: countrySc || '',
          statePr: statePr || '',
          stateSc: stateSc || '',
          email: email || '',
          phoneNumber: phoneNumber || '',
          nationalId: nationalId || '',
          jobPr: jobPr || '',
          jobSc: jobSc || '',
          addressPr: addressPr || '',
          addressSc: addressSc || '',
          age: age || '',
          gender: isMale ? 'male' : 'female',
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
                name='namePr'
                placeholder={`${t(
                  'students.form.placeholders.name',
                )} ( English )`}
                label={`${t('global.name')}-en`}
                id='inputNamePr'
                value={values.namePr}
                disabled={isLoadingStudent}
              />
              <Input
                name='nameSc'
                placeholder={`${t(
                  'students.form.placeholders.name',
                )} ( Malaysia )`}
                label={`${t('global.name')}-ml`}
                id='inputNameSc'
                value={values.nameSc}
                disabled={isLoadingStudent}
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
                disabled={isLoadingStudent}
              />
              <Input
                name='countrySc'
                placeholder={`${t(
                  'students.form.placeholders.country',
                )} ( Malaysia )`}
                label={`${t('global.country')}-ml`}
                id='inputCountrySc'
                value={values.countrySc}
                disabled={isLoadingStudent}
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
                disabled={isLoadingStudent}
              />
              <Input
                name='stateSc'
                placeholder={`${t(
                  'students.form.placeholders.state',
                )} ( Malaysia )`}
                label={`${t('students.form.state')}-ml`}
                id='inputStateSc'
                value={values.stateSc}
                disabled={isLoadingStudent}
              />
            </FormControl>

            <FormControl>
              <Input
                name='email'
                placeholder='example@example.com'
                label={t('global.email')}
                id='inputEmail'
                value={values.email}
                disabled={isLoadingStudent}
              />
              <Input
                name='phoneNumber'
                placeholder={t('students.form.placeholders.phone')}
                label={t('global.phone')}
                id='inputPhoneNumber'
                value={values.phoneNumber}
                disabled={isLoadingStudent}
              />
            </FormControl>

            <Input
              name='nationalId'
              placeholder={t('students.form.placeholders.national')}
              label={t('global.national')}
              id='inputNationalId'
              value={values.nationalId}
              disabled={isLoadingStudent}
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
                disabled={isLoadingStudent}
              />
              <Input
                name='jobSc'
                placeholder={`${t(
                  'students.form.placeholders.job',
                )} ( Malaysia )`}
                label={`${t('students.form.job')}-ml`}
                id='inputJobSc'
                value={values.jobSc}
                disabled={isLoadingStudent}
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
                disabled={isLoadingStudent}
              />
              <Input
                name='addressSc'
                placeholder={`${t(
                  'students.form.placeholders.address',
                )} ( Malaysia )`}
                label={`${t('global.address')}-ml`}
                id='inputAddressSc'
                value={values.addressSc}
                disabled={isLoadingStudent}
              />
            </FormControl>

            <FormControl>
              <Select
                label={t('global.gender')}
                name='gender'
                id='inputGender'
                value={values.gender}
                disabled={isLoadingStudent}
              >
                <option value='male'>{t('global.male')}</option>
                <option value='female'>{t('global.female')}</option>
              </Select>
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

            <Input
              name='age'
              placeholder={t('students.form.placeholders.age')}
              label={t('students.form.age')}
              type='number'
              id='inputAge'
              min='5'
              max='100'
              value={values.age}
              disabled={isLoadingStudent}
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
