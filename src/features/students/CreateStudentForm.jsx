import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import { LoadingButton, Input, FormControl, Select } from '../../ui';
import { studentSchema } from './validation';
import useAddStudent from './useAddStudent';

const CreateStudentForm = ({ closeModal }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useAddStudent(closeModal);

  const handleSubmit = values => {
    const data = {
      ...values,
      registrationDate: new Date().toISOString(),
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
        {t('students.addTitle')}
      </h2>

      <Formik
        initialValues={{
          namePr: '',
          nameSc: '',
          countryPr: '',
          countrySc: '',
          statePr: '',
          stateSc: '',
          email: '',
          phoneNumber: '',
          nationalId: '',
          jobPr: '',
          jobSc: '',
          addressPr: '',
          addressSc: '',
          gender: '',
          active: 'active',
          age: '',
        }}
        validationSchema={studentSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className='mt-10 space-y-4'>
            <FormControl>
              <Input
                name='namePr'
                placeholder={`${t(
                  'students.form.placeholders.name',
                )} ( English )`}
                label={`${t('global.name')}-en`}
                id='inputNamePr'
              />
              <Input
                name='nameSc'
                placeholder={`${t(
                  'students.form.placeholders.name',
                )} ( Malaysia )`}
                label={`${t('global.name')}-ml`}
                id='inputNameSc'
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
              />
              <Input
                name='countrySc'
                placeholder={`${t(
                  'students.form.placeholders.country',
                )} ( Malaysia )`}
                label={`${t('global.country')}-ml`}
                id='inputCountrySc'
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
              />
              <Input
                name='stateSc'
                placeholder={`${t(
                  'students.form.placeholders.state',
                )} ( Malaysia )`}
                label={`${t('students.form.state')}-ml`}
                id='inputStateSc'
              />
            </FormControl>

            <FormControl>
              <Input
                name='email'
                placeholder='example@example.com'
                label={t('global.email')}
                id='inputEmail'
              />
              <Input
                name='phoneNumber'
                placeholder={t('students.form.placeholders.phone')}
                label={t('global.phone')}
                id='inputPhoneNumber'
              />
            </FormControl>

            <Input
              name='nationalId'
              placeholder={t('students.form.placeholders.national')}
              label={t('global.national')}
              id='inputNationalId'
            />

            <FormControl>
              <Input
                name='jobPr'
                placeholder={`${t(
                  'students.form.placeholders.job',
                )} ( English )`}
                label={`${t('students.form.job')}-en`}
                id='inputJobPr'
              />
              <Input
                name='jobSc'
                placeholder={`${t(
                  'students.form.placeholders.job',
                )} ( Malaysia )`}
                label={`${t('students.form.job')}-ml`}
                id='inputJobSc'
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
              />
              <Input
                name='addressSc'
                placeholder={`${t(
                  'students.form.placeholders.address',
                )} ( Malaysia )`}
                label={`${t('global.address')}-ml`}
                id='inputAddressSc'
              />
            </FormControl>

            <FormControl>
              <Select label={t('global.gender')} name='gender' id='inputGender'>
                <option value='male'>{t('global.male')}</option>
                <option value='female'>{t('global.female')}</option>
              </Select>
              <Select label={t('global.status')} name='active' id='inputStatus'>
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
            />

            <div className='!mt-6 '>
              <LoadingButton
                disabled={isLoading}
                isLoading={isLoading}
                status='success'
              >
                {t('students.buttons.add')}
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateStudentForm;
