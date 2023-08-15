import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import { LoadingButton, Input, FormControl } from '../../ui';
import { educationalSchema } from './validation';
import useEditEducational from './useEditEducational';

const EditEducationalForm = ({ program, closeModal }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useEditEducational(closeModal);

  const { id, namePr, nameSc } = program;
  const handleSubmit = values => mutate({ ...values, id });

  return (
    <>
      <h2 className='font-publicSans text-xl font-medium text-primary-text dark:text-dark-primary-text/75'>
        {t('educational.editTitle')}
      </h2>

      <Formik
        initialValues={{
          namePr,
          nameSc,
        }}
        validationSchema={educationalSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className='mt-10 space-y-4'>
            <FormControl>
              <Input
                name='namePr'
                placeholder={`${t(
                  'educational.form.placeholders.name',
                )} ( English )`}
                id={`${t('global.name')}-en`}
                value={values.namePr}
              />
              <Input
                name='nameSc'
                placeholder={`${t(
                  'educational.form.placeholders.name',
                )} ( Malaysia )`}
                id={`${t('global.name')}-ml`}
                value={values.nameSc}
              />
            </FormControl>

            <div className='!mt-6 '>
              <LoadingButton
                disabled={isLoading}
                isLoading={isLoading}
                status='success'
              >
                {t('educational.buttons.edit')}
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditEducationalForm;
