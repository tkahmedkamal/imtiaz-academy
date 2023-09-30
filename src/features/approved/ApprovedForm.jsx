import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import useApprove from './useApprove';
import { LoadingButton, Input, FormControl } from '../../ui';
import approveSchema from './validation';

const ApprovedForm = ({ userId, closeModal }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useApprove();

  const handleSubmit = values => {
    const data = {
      id: userId,
      ...values,
      contractStartDate: new Date(values.contractStartDate).toISOString(),
      contractEndDate: new Date(values.contractEndDate).toISOString(),
      ApproveData: new Date().toISOString(),
      salary: +values.salary,
    };

    mutate(data, {
      onSettled: () => closeModal(),
    });
  };

  return (
    <>
      <h2 className='font-publicSans text-xl font-medium text-primary-text dark:text-dark-primary-text/75'>
        {t('approve.title')}
      </h2>

      <Formik
        initialValues={{
          contractStartDate: '',
          contractEndDate: '',
          salary: 0,
        }}
        validationSchema={approveSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className='mt-10 space-y-4'>
            <FormControl>
              <Input
                type='date'
                name='contractStartDate'
                label={`${t('approve.form.contractStartDate')}`}
                id='inputStartDate'
              />
              <Input
                type='date'
                name='contractEndDate'
                label={`${t('approve.form.contractEndDate')}`}
                id='inputEndDate'
              />
            </FormControl>

            <FormControl>
              <Input
                type='number'
                name='salary'
                label={`${t('approve.form.salary')}`}
                id='inputSalary'
              />
            </FormControl>

            <div className='!mt-6 '>
              <LoadingButton
                disabled={isLoading}
                isLoading={isLoading}
                status='success'
              >
                {t('approve.form.submit')}
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ApprovedForm;
