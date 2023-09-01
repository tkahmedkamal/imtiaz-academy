import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import { FormControl, Input, LoadingButton } from '../../ui';
import { loginSchema } from './validation';

const LoginForm = () => {
  const { t } = useTranslation();

  const handleSubmit = values => {};

  return (
    <div className='w-96 space-y-8 rounded-md border border-divider bg-paper p-6 shadow-md dark:border-dark-divider dark:bg-dark-paper'>
      <h2 className='font-publicSans text-xl font-bold text-primary-text dark:text-dark-primary-text/90'>
        {t('login.title')}
      </h2>

      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
      >
        {props => (
          <Form className='space-y-3'>
            <FormControl>
              <Input
                type='email'
                name='email'
                placeholder='example@example.com'
                label={t('global.email')}
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
                disabled={false}
                isLoading={false}
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
