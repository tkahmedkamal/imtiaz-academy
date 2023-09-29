import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import { FormControl, Input, LoadingButton } from '../../../ui';
import { loginSchema } from './validation';
import useLogin from './useLogin';

const LoginForm = () => {
  const { t } = useTranslation();
  const { login, isLoading } = useLogin();

  const handleSubmit = values => {
    login(values);
  };

  return (
    <div className='w-96 space-y-8 rounded-md border border-divider bg-paper p-6 shadow-md dark:border-dark-divider dark:bg-dark-paper'>
      <h2 className='font-publicSans text-xl font-bold text-primary-text dark:text-dark-primary-text/90'>
        {t('login.title')}
      </h2>

      <Formik
        initialValues={{ userNamOrEmail: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
      >
        {props => (
          <Form className='space-y-3'>
            <FormControl>
              <Input
                type='text'
                name='userNamOrEmail'
                placeholder='Enter username or email'
                label={t('login.form.username_email')}
                id='inputEmail'
              />
            </FormControl>

            <FormControl>
              <Input
                type='password'
                name='password'
                placeholder={t('login.form.password')}
                label={t('global.password')}
                id='inputPassword'
              />
            </FormControl>

            <div className='!mt-6 '>
              <LoadingButton
                disabled={isLoading}
                isLoading={isLoading}
                status='success'
              >
                {t('login.form.submit')}
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
