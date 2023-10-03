import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import {
  LoadingButton,
  Input,
  FormControl,
  Select,
  SelectOption,
} from '../../../ui';
import { studentSchema } from '../../students/validation';
import useAddStudent from '../../students/useAddStudent';
import { useCountries } from '../../../hooks';

const StudentSignupForm = ({ closeModal }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useAddStudent(closeModal);
  const { data } = useCountries();

  const handleSubmit = values => {
    const data = {
      ...values,
      userName:
        values.userName.length > 0 ? values.userName : values.phoneNumber,
      age: +values.age,
      knowAboutUs: +values.knowAboutUs,
      countryId: +values.countryId,
      registrationDate: new Date().toISOString(),
      isMale: values.gender === 'male',
    };
    delete data.gender;

    mutate(data);
  };

  return (
    <>
      <h2 className='font-publicSans text-xl font-medium text-primary-text dark:text-dark-primary-text/75'>
        {t('teacher_signup.title')}
      </h2>

      <Formik
        initialValues={{
          name: '',
          userName: '',
          email: '',
          password: '',
          nationality: '',
          nationalId: '',
          countryId: '',
          phoneNumber: '',
          state: '',
          job: '',
          gender: '',
          age: 5,
          dateOfBirth: '',
          address: '',
          registrationDate: '',
          knowAboutUs: '',
          isAcceptedPolicies: true,
        }}
        validationSchema={studentSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className='mt-10 space-y-4'>
            <FormControl>
              <Input name='name' label={t('global.name')} id='inputName' />

              <Input
                name='userName'
                label={t('global.username')}
                id='inputUsername'
              />
            </FormControl>

            <FormControl>
              <Input name='email' label={t('global.email')} id='inputEmail' />

              <Input
                name='password'
                label={t('global.password')}
                id='inputPassword'
              />
            </FormControl>

            <FormControl>
              <Input
                name='nationality'
                label={t('global.nationality')}
                id='inputNationality'
              />

              <Input
                name='nationalId'
                label={t('global.national')}
                id='inputNationalId'
              />
            </FormControl>

            <FormControl>
              <Select
                name='countryId'
                label={t('global.country')}
                id='inputCountryId'
              >
                {data?.map(({ id, name }) => (
                  <SelectOption key={id} value={id} label={name} />
                ))}
              </Select>

              <Input
                name='phoneNumber'
                label={t('global.phone')}
                id='inputPhoneNumber'
              />
            </FormControl>

            <FormControl>
              <Select name='gender' label={t('global.gender')} id='inputGender'>
                <SelectOption value='male' label='Male' />
                <SelectOption value='female' label='Female' />
              </Select>

              <Input
                type='number'
                name='age'
                label={t('global.age')}
                id='inputAge'
              />
            </FormControl>

            <FormControl>
              <Select
                name='state'
                label={t('students.form.state')}
                id='inputState'
              >
                <SelectOption value='active' label='Active' />
                <SelectOption value='pending' label='Pending' />
              </Select>

              <Input name='job' label={t('students.form.job')} id='inputJob' />
            </FormControl>

            <FormControl>
              <Input
                type='date'
                name='dateOfBirth'
                label={t('students.form.dateOfBirth')}
                id='inputDateOfBirth'
              />

              <Input
                name='address'
                label={t('global.address')}
                id='inputAddress'
              />
            </FormControl>

            <FormControl>
              <Select
                type='text'
                name='knowAboutUs'
                label={t('students.form.knowAboutUs')}
                id='inputKnowAboutUs'
              >
                <SelectOption value={1} label='Facebook' />
                <SelectOption value={2} label='Instgram' />
                <SelectOption value={3} label='Friends' />
                <SelectOption value={4} label='Whatsapp' />
                <SelectOption value={5} label='Telegram' />
                <SelectOption value={6} label='Other' />
              </Select>
            </FormControl>

            <div className='!mt-6 '>
              <LoadingButton
                disabled={isLoading}
                isLoading={isLoading}
                status='success'
              >
                {t('teacher_signup.title')}
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default StudentSignupForm;
