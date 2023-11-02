import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import {
  LoadingButton,
  Input,
  FormControl,
  Select,
  SelectOption,
} from '../../ui';
import { userSchema } from './validation';
import useAddUser from './useAddUser';
import { useCountries } from '../../hooks';

const CreateUserForm = ({ closeModal }) => {
  const [withCustomRegistrationCost, setWithCustomRegistrationCost] =
    useState(false);
  const { t } = useTranslation();
  const { mutate, isLoading } = useAddUser(closeModal);
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
        {t('users.addTitle')}
      </h2>

      <Formik
        initialValues={{
          name: '',
          userName: '',
          email: '',
          password: 'ImtiazAcademy',
          city: '',
          postcode: '',
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
          customRegistrationCost: 0.0,
        }}
        validationSchema={userSchema}
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
                name='phoneNumber'
                label={t('global.phone')}
                id='inputPhoneNumber'
              />
            </FormControl>

            <FormControl>
              <Input
                name='nationalId'
                label={t('global.national')}
                id='inputNationalId'
              />
              <Input name='job' label={t('users.form.job')} id='inputJob' />
            </FormControl>
            <FormControl>
              <Input
                name='address'
                label={t('global.address')}
                id='inputAddress'
              />
            </FormControl>

            <FormControl>
              <Input
                name='postCode'
                label={t('global.postCode')}
                id='inputPostCode'
              />
              <Input name='city' label={t('global.city')} id='inputCity' />
            </FormControl>

            <FormControl>
              <Input
                name='state'
                label={t('users.form.state')}
                id='inputState'
              />
              <Select
                name='countryId'
                label={t('global.country')}
                id='inputCountryId'
              >
                {data?.map(({ id, name }) => (
                  <SelectOption key={id} value={id} label={name} />
                ))}
              </Select>
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
              <Input
                type='date'
                name='dateOfBirth'
                label={t('users.form.dateOfBirth')}
                id='inputDateOfBirth'
              />
              <Select
                type='text'
                name='knowAboutUs'
                label={t('users.form.knowAboutUs')}
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
            <div className='text-md flex items-center gap-2 font-publicSans font-medium text-dark-secondary-text'>
              <input
                type='checkbox'
                id='withCustomRegistrationCost'
                onChange={e => {
                  const isChecked = e.target.checked;
                  setWithCustomRegistrationCost(isChecked);
                }}
              />
              <label htmlFor='withCustomRegistrationCost'>
                {t('users.customRegistrationCost')}
              </label>
            </div>
            {withCustomRegistrationCost && (
              <FormControl>
                <Input
                  name='customRegistrationCost'
                  placeholder='0'
                  label={t('users.enrollment.registrationCost')}
                  id='inputCustomRegistrationCost'
                  autoFocus
                />
              </FormControl>
            )}

            <div className='!mt-6 '>
              <LoadingButton
                disabled={isLoading}
                isLoading={isLoading}
                status='success'
              >
                {t('users.buttons.add')}
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateUserForm;
