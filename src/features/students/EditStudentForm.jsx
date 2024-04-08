import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import {
  LoadingButton,
  Input,
  FormControl,
  Select,
  SelectOption,
} from '../../ui';
import { editStudentSchema } from './validation';
import useStudent from './useStudent.js';
import useEditStudent from './useEditStudent';
import { formatIsoDate } from '../../utils/formatDate';
import { useCountries } from '../../hooks';

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
    applicationUser,
  } = data?.student || {};
  const { data: countries, isLoadingCountries } = useCountries();

  const handleSubmit = values => {
    const data = {
      id,
      userId,
      registrationDate: registrationDate,
      isCompleteStudy: isCompleteStudy,
      ...values,
      knowAboutUs: +values.knowAboutUs,
      applicationUser: {
        ...values.applicationUser,
        userName:
          values.applicationUser.userName.length > 0
            ? values.applicationUser.userName
            : values.applicationUser.phoneNumber,
        age: +values.applicationUser.age,
        isMale: values.applicationUser.gender === 'male',
        isActive: values.applicationUser.active === 'active',
        countryId: +values.applicationUser.countryId,
        dateOfBirth: new Date(values.applicationUser.dateOfBirth).toISOString(),
        normalizedUserName: applicationUser?.normalizedUserName,
        normalizedEmail: applicationUser?.normalizedEmail,
        passwordHash: applicationUser?.passwordHash,
        securityStamp: applicationUser?.securityStamp,
        concurrencyStamp: applicationUser?.concurrencyStamp,
        phoneNumberConfirmed: applicationUser?.phoneNumberConfirmed,
        twoFactorEnabled: applicationUser?.twoFactorEnabled,
        lockoutEnd: applicationUser?.lockoutEnd,
        lockoutEnabled: applicationUser?.lockoutEnabled,
        accessFailedCount: applicationUser?.accessFailedCount,
        emailConfirmed: applicationUser?.emailConfirmed,
        isApproved: applicationUser?.isApproved,
        isArchive: applicationUser?.isArchive,
        profileImagePath: applicationUser?.profileImagePath,
        isAcceptedPolicies: applicationUser?.isAcceptedPolicies,
        address: applicationUser?.address,
        nationalId:applicationUser?.nationalId,
        nationality: applicationUser?.nationality,
        userType: applicationUser?.userType,
        theme: applicationUser?.theme,
        userLanguage: applicationUser?.userLanguage,
        id: applicationUser?.id,
        email: applicationUser?.email,
        phoneNumber: applicationUser?.phoneNumber, 
      },
    };
    delete data.applicationUser.active;
    delete data.applicationUser.gender;

    mutate(data);
  };

  return (
    <>
      <h2 className='font-publicSans text-xl font-medium text-primary-text dark:text-dark-primary-text/75'>
        {t('students.editTitle')}
      </h2>

      <Formik
        initialValues={{
          job: job || '',
          postCode: postCode || '',
          city: city || '',
          state: state || '',
          knowAboutUs: knowAboutUs || '',
          applicationUser: {
            name: applicationUser?.name || '',
            userName: applicationUser?.userName || '',
            email: applicationUser?.email || '',
            phoneNumber: applicationUser?.phoneNumber || '',
            nationalId: applicationUser?.nationalId || '',
            address: applicationUser?.address || '',
            countryId: applicationUser?.countryId || 0,
            gender: applicationUser?.isMale ? 'male' : 'female',
            age: applicationUser?.age || '',
            dateOfBirth: formatIsoDate(applicationUser?.dateOfBirth),
          },
        }}
        validationSchema={editStudentSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => (
          <Form className='mt-10 space-y-4'>
            <FormControl>
              <Input
                name='applicationUser.name'
                label={t('global.name')}
                id='inputName'
                value={values.applicationUser.name}
                disabled={isLoadingStudent}
              />

              <Input
                name='applicationUser.userName'
                label={t('global.username')}
                id='inputUsername'
                value={values.applicationUser.userName}
                disabled={isLoadingStudent}
              />
            </FormControl>

            <FormControl>
              <Input
                name='applicationUser.email'
                label={t('global.email')}
                id='inputEmail'
                value={values.applicationUser.email}
                disabled={isLoadingStudent}
              />

              <Input
                name='applicationUser.phoneNumber'
                label={t('global.phone')}
                id='inputPhoneNumber'
                value={values.applicationUser.phoneNumber}
                disabled={isLoadingStudent}
              />
            </FormControl>

            <FormControl>
              <Input
                name='applicationUser.nationalId'
                label={t('global.national')}
                id='inputNationalId'
                value={values.applicationUser.nationalId}
                disabled={isLoadingStudent}
              />
              <Input
                name='job'
                label={t('students.form.job')}
                id='inputJob'
                value={values.job}
                disabled={isLoadingStudent}
              />
            </FormControl>

            <FormControl>
              <Input
                name='applicationUser.address'
                label={t('global.address')}
                id='inputAddress'
                value={values.applicationUser.address}
                disabled={isLoadingStudent}
              />
            </FormControl>

            <FormControl>
              <Input
                name='postCode'
                label={t('global.postCode')}
                id='inputPostCode'
                value={values.postCode}
                disabled={isLoadingStudent}
              />
              <Input
                name='city'
                label={t('global.city')}
                id='inputCity'
                value={values.city}
                disabled={isLoadingStudent}
              />
            </FormControl>

            <FormControl>
              <Input
                name='state'
                label={t('students.form.state')}
                id='inputState'
                value={values.state}
                disabled={isLoadingStudent}
              />
              <Select
                name='applicationUser.countryId'
                label={t('global.country')}
                id='inputCountryId'
                selected={values.applicationUser.countryId}
                disabled={isLoadingCountries}
              >
                {countries?.map(({ id, name }) => (
                  <SelectOption key={id} value={id} label={name} />
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <Select
                name='applicationUser.gender'
                label={t('global.gender')}
                id='inputGender'
                selected={values.applicationUser.gender}
                disabled={isLoadingStudent}
              >
                <SelectOption value='male' label='Male' />
                <SelectOption value='female' label='Female' />
              </Select>

              <Input
                type='number'
                name='applicationUser.age'
                label={t('global.age')}
                id='inputAge'
                value={values.applicationUser.age}
                disabled={isLoadingStudent}
              />
            </FormControl>

            <FormControl>
              <Input
                type='date'
                name='applicationUser.dateOfBirth'
                label={t('students.form.dateOfBirth')}
                id='inputDateOfBirth'
                value={values.applicationUser.dateOfBirth}
                disabled={isLoadingStudent}
              />
              <Select
                type='text'
                name='knowAboutUs'
                label={t('students.form.knowAboutUs')}
                id='inputKnowAboutUs'
                selected={values.knowAboutUs}
                disabled={isLoadingStudent}
              >
                <SelectOption value={1} label='Facebook' />
                <SelectOption value={2} label='Instagram' />
                <SelectOption value={3} label='Friends' />
                <SelectOption value={4} label='Whatsapp' />
                <SelectOption value={5} label='Telegram' />
                <SelectOption value={6} label='Google' />
                <SelectOption value={7} label='Other' />
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
