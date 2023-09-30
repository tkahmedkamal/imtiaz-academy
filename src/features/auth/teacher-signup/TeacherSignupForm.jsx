import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import {
  FormControl,
  Input,
  LoadingButton,
  Select,
  SelectOption,
} from '../../../ui';
import signupSchema from './validation';
import useSignup from './useSignup';
import { useCountries } from '../../../hooks';

const TeacherSignupForm = () => {
  const { t } = useTranslation();
  const { signup, isLoading } = useSignup();
  const { data } = useCountries();

  const handleSubmit = values => {
    const data = {
      ...values,
      userName:
        values.userName.length === 0
          ? String(values.phoneNumber)
          : values.userName,
      userType: +values.userType,
      countryId: +values.countryId,
      isMale: values.gander === 'male',
      phoneNumber: String(values.phoneNumber),
    };
    delete data.gander;

    signup(data);
  };

  return (
    <div className='w-full space-y-8 rounded-md border border-divider bg-paper p-6 shadow-md dark:border-dark-divider dark:bg-dark-paper'>
      <h2 className='font-publicSans text-xl font-bold text-primary-text dark:text-dark-primary-text/90'>
        {t('teacher_signup.title')}
      </h2>

      <Formik
        initialValues={{
          name: '',
          userName: '',
          email: '',
          password: '',
          phoneNumber: '',
          bankName: '',
          idCardNumber: '',
          nationalId: '',
          nationality: '',
          address: '',
          bankAccountNumber: '',
          certificate: '',
          iban: '',
          age: 5,
          countryId: 0,
          userType: 2,
          isAcceptedPolicies: true,
          gander: false,
        }}
        onSubmit={handleSubmit}
        validationSchema={signupSchema}
      >
        {props => (
          <Form className='space-y-3'>
            <FormControl>
              <Input
                type='text'
                name='name'
                label={t('teacher_signup.form.name')}
                id='inputName'
              />

              <Input
                type='text'
                name='userName'
                label={t('teacher_signup.form.username')}
                id='inputUsername'
              />

              <Input
                type='email'
                name='email'
                label={t('teacher_signup.form.email')}
                id='inputEmail'
              />
            </FormControl>

            <FormControl>
              <Input
                type='password'
                name='password'
                label={t('teacher_signup.form.password')}
                id='inputPassword'
              />

              <Input
                type='number'
                name='phoneNumber'
                label={t('teacher_signup.form.phoneNumber')}
                id='inputPhoneNumber'
              />

              <Input
                type='text'
                name='idCardNumber'
                label={t('teacher_signup.form.idCardNumber')}
                id='inputIdCardNumber'
              />
            </FormControl>

            <FormControl>
              <Select
                type='text'
                name='countryId'
                label={t('teacher_signup.form.countryId')}
                id='inputCountryId'
              >
                {data?.map(item => (
                  <SelectOption
                    key={item.id}
                    value={item.id}
                    label={item.name}
                  />
                ))}
              </Select>

              <Input
                type='text'
                name='nationality'
                label={t('teacher_signup.form.nationality')}
                id='inputNationality'
              />

              <Input
                type='text'
                name='nationalId'
                label={t('teacher_signup.form.nationalId')}
                id='inputNationalId'
              />
            </FormControl>

            <FormControl>
              <Input
                type='text'
                name='address'
                label={t('teacher_signup.form.address')}
                id='inputAddress'
              />

              <Input
                type='text'
                name='certificate'
                label={t('teacher_signup.form.certificate')}
                id='inputCertificate'
              />

              <Select
                type='text'
                name='userType'
                label={t('teacher_signup.form.type')}
                id='inputType'
              >
                {/* <SelectOption value={1} label='Student' /> */}
                <SelectOption value={2} label='Teacher' />
                <SelectOption value={3} label='Accountant Agent' />
                <SelectOption value={4} label='Enrollment Agent' />
              </Select>
            </FormControl>

            <FormControl></FormControl>

            <FormControl>
              <Input
                type='number'
                name='age'
                label={t('teacher_signup.form.age')}
                id='inputAge'
              />

              <Select
                type='text'
                name='gander'
                label={t('teacher_signup.form.gander')}
                id='inputGander'
              >
                <SelectOption value='male' label='Male' />
                <SelectOption value='female' label='Female' />
              </Select>
            </FormControl>

            <FormControl>
              <Input
                type='text'
                name='bankName'
                label={t('teacher_signup.form.bankName')}
                id='inputBankName'
              />
              <Input
                type='text'
                name='iban'
                label={t('teacher_signup.form.iban')}
                id='inputIban'
              />
              <Input
                type='text'
                name='bankAccountNumber'
                label={t('teacher_signup.form.bankAccountNumber')}
                id='inputBankAccountNumber'
              />
            </FormControl>

            <div className='!mt-6 '>
              <LoadingButton
                disabled={isLoading}
                isLoading={isLoading}
                status='success'
              >
                {t('teacher_signup.form.submit')}
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TeacherSignupForm;
