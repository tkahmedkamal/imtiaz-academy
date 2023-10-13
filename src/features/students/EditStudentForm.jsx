import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { useCountries } from '../../hooks';

import {
  LoadingButton,
  Input,
  FormControl,
  Select,
  SelectOption,
} from '../../ui';
import { studentSchema } from './validation';
import useStudent from './useStudent.js';
import useEditStudent from './useEditStudent';

const EditStudentForm = ({ studentId, closeModal }) => {
  const { data, isLoading: isLoadingStudent } = useStudent(studentId);
  const { mutate, isLoading } = useEditStudent(closeModal);
  const { t } = useTranslation();
  const {
    id,
    userId,
    state,
    city,
    postCode,
    job,
    registrationDate,
    isCompleteStudy,
    knowAboutUs,
    applicationUser: {
      name,
      isMale,
      age,
      address,
      nationalId,
      isActive,
      isApproved,
      isArchive,
      profileImagePath,
      dateOfBirth,
      isAcceptedPolicies,
      countryId,
      nationality,
      userType,
      theme,
      userLanguage,
      statusType,
      gender,
      userName,
      normalizedUserName,
      email,
      normalizedEmail,
      emailConfirmed,
      passwordHash,
      securityStamp,
      concurrencyStamp,
      phoneNumber,
      phoneNumberConfirmed,
      twoFactorEnabled,
      lockoutEnd,
      lockoutEnabled,
      accessFailedCount,
    },
  } = data?.student || {};
  const { countries, isLoadingCountries } = useCountries();

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
          userId: userId || '',
          state: state || '',
          city: city || '',
          postCode: postCode || '',
          job: job || '',
          registrationDate: registrationDate,
          isCompleteStudy: isCompleteStudy,
          knowAboutUs: knowAboutUs || '',
          id: id || '',
          userName: userName || '',
          normalizedUserName: normalizedUserName || '',
          email: email || '',
          normalizedEmail: normalizedEmail || '',
          emailConfirmed: emailConfirmed,
          passwordHash: passwordHash,
          securityStamp: securityStamp,
          concurrencyStamp: concurrencyStamp,
          phoneNumber: phoneNumber,
          phoneNumberConfirmed: phoneNumberConfirmed,
          twoFactorEnabled: twoFactorEnabled,
          lockoutEnd: lockoutEnd,
          lockoutEnabled: lockoutEnabled,
          accessFailedCount: accessFailedCount,
          name: name || '',
          isMale: isMale,
          age: age || '',
          address: address || '',
          nationalId: nationalId || '',
          isActive: isActive,
          isApproved: isApproved,
          isArchive: isArchive,
          profileImagePath: profileImagePath || '',
          dateOfBirth: dateOfBirth || '2023-10-12T13:15:27.094Z',
          isAcceptedPolicies: isAcceptedPolicies,
          countryId: countryId || 0,
        }}
        validationSchema={studentSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => (
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
              <Input name='job' label={t('students.form.job')} id='inputJob' />
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
                label={t('students.form.state')}
                id='inputState'
              />
              <Select
                name='countryId'
                label={t('global.country')}
                id='inputCountryId'
              >
                {countries?.map(({ id, name }) => (
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
                label={t('students.form.dateOfBirth')}
                id='inputDateOfBirth'
              />
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
