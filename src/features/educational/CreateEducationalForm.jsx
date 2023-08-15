import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import { LoadingButton, Input, FormControl } from '../../ui';
import { educationalSchema } from './validation';
import useAddEducational from './useAddEducational';

const CreateEducationalForm = ({ closeModal }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useAddEducational(closeModal);

  const handleSubmit = values => mutate(values);

  return (
    <>
      <h2 className='font-publicSans text-xl font-medium text-primary-text dark:text-dark-primary-text/75'>
        {t('educational.addTitle')}
      </h2>

      <Formik
        initialValues={{
          namePr: '',
          nameSc: '',
        }}
        validationSchema={educationalSchema}
        onSubmit={handleSubmit}
      >
        {props => (
          <Form className='mt-10 space-y-4'>
            <FormControl>
              <Input
                name='namePr'
                placeholder={`${t(
                  'educational.form.placeholders.name',
                )} ( English )`}
                id={`${t('global.name')}-en`}
              />
              <Input
                name='nameSc'
                placeholder={`${t(
                  'educational.form.placeholders.name',
                )} ( Malaysia )`}
                id={`${t('global.name')}-ml`}
              />
            </FormControl>

            <div className='!mt-6 '>
              <LoadingButton
                disabled={isLoading}
                isLoading={isLoading}
                status='success'
              >
                {t('educational.buttons.add')}
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateEducationalForm;
