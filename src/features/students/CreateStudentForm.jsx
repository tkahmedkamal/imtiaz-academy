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
        {props => (
          <Form className='mt-10 space-y-4'>
            <FormControl>
              <Input
                name='namePr'
                placeholder={`${t(
                  'students.form.placeholders.name',
                )} ( English )`}
                id={`${t('global.name')}-en`}
              />
              <Input
                name='nameSc'
                placeholder={`${t(
                  'students.form.placeholders.name',
                )} ( Malaysia )`}
                id={`${t('global.name')}-ml`}
              />
            </FormControl>

            <FormControl>
              <Input
                name='countryPr'
                placeholder={`${t(
                  'students.form.placeholders.country',
                )} ( English )`}
                id={`${t('global.country')}-en`}
              />
              <Input
                name='countrySc'
                placeholder={`${t(
                  'students.form.placeholders.country',
                )} ( Malaysia )`}
                id={`${t('global.country')}-ml`}
              />
            </FormControl>

            <FormControl>
              <Input
                name='statePr'
                placeholder={`${t(
                  'students.form.placeholders.state',
                )} ( English )`}
                id={`${t('students.form.state')}-en`}
              />
              <Input
                name='stateSc'
                placeholder={`${t(
                  'students.form.placeholders.state',
                )} ( Malaysia )`}
                id={`${t('students.form.state')}-ml`}
              />
            </FormControl>

            <FormControl>
              <Input
                name='email'
                placeholder='example@example.com'
                id={t('global.email')}
              />
              <Input
                name='phoneNumber'
                placeholder={t('students.form.placeholders.phone')}
                id={t('global.phone')}
              />
            </FormControl>

            <Input
              name='nationalId'
              placeholder={t('students.form.placeholders.national')}
              id={t('global.national')}
            />

            <FormControl>
              <Input
                name='jobPr'
                placeholder={`${t(
                  'students.form.placeholders.job',
                )} ( English )`}
                id={`${t('students.form.job')}-en`}
              />
              <Input
                name='jobSc'
                placeholder={`${t(
                  'students.form.placeholders.job',
                )} ( Malaysia )`}
                id={`${t('students.form.job')}-ml`}
              />
            </FormControl>

            <FormControl>
              <Input
                name='addressPr'
                placeholder={`${t(
                  'students.form.placeholders.address',
                )} ( English )`}
                id={`${t('global.address')}-en`}
              />
              <Input
                name='addressSc'
                placeholder={`${t(
                  'students.form.placeholders.address',
                )} ( Malaysia )`}
                id={`${t('global.address')}-ml`}
              />
            </FormControl>

            <FormControl>
              <Select label={t('global.gender')} name='gender'>
                <option value='male'>{t('global.male')}</option>
                <option value='female'>{t('global.female')}</option>
              </Select>
              <Select label={t('global.status')} name='active'>
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
