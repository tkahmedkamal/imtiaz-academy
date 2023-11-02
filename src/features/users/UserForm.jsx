import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import useUser from './useUser';
import { LoadingButton, Input, FormControl } from '../../ui';
import userSchema from './validation';

const UserForm = ({ userId, closeModal }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useUser();

  const handleSubmit = values => {
    const data = {
      id: userId,
      ...values,
      contractStartDate: new Date(values.contractStartDate).toISOString(),
      contractEndDate: new Date(values.contractEndDate).toISOString(),
      UserData: new Date().toISOString(),
      salary: +values.salary,
    };

    mutate(data, {
      onSettled: () => closeModal(),
    });
  };

  return (
    <>
      <h2 className='font-publicSans text-xl font-medium text-primary-text dark:text-dark-primary-text/75'>
        {t('user.title')}
      </h2>

      <Formik
        initialValues={{
          contractStartDate: '',
          contractEndDate: '',
          salary: 0,
        }}
        validationSchema={userSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className='mt-10 space-y-4'>
            <FormControl>
              <Input
                type='date'
                name='contractStartDate'
                label={`${t('user.form.contractStartDate')}`}
                id='inputStartDate'
              />
              <Input
                type='date'
                name='contractEndDate'
                label={`${t('user.form.contractEndDate')}`}
                id='inputEndDate'
              />
            </FormControl>

            <FormControl>
              <Input
                type='number'
                name='salary'
                label={`${t('user.form.salary')}`}
                id='inputSalary'
              />
            </FormControl>

            <div className='!mt-6 '>
              <LoadingButton
                disabled={isLoading}
                isLoading={isLoading}
                status='success'
              >
                {t('user.form.submit')}
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UserForm;
