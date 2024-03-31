import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import { LoadingButton, Input, FormControl } from '../../ui';
import useAddPaymentTransaction from './useAddPaymentTransaction.js';
import { paymentTransactionSchema } from './validation';

const AddPaymentTransactionForm = ({ studentId,studentEnrollmentId, closeModal }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useAddPaymentTransaction(closeModal);

  const handleSubmit = values => {
    mutate({
      ...values,
      studentId,
      addTime: new Date().toISOString(),
      paidTime: new Date(values.paidTime).toISOString(),
    });
  };

  return (
    <>
      <h2 className='font-publicSans text-xl font-medium text-primary-text dark:text-dark-primary-text/75'>
        {t('students.transaction.title')}
      </h2>

      <Formik
        initialValues={{
          studentId: studentId,
          amountPaid: '',
          paidTime: new Date().toISOString(),
          referencePaidNumber: '',
          studentEnrollmentId:studentEnrollmentId,
           notes: ''
          // PeriodStartDate: new Date().toISOString(),
          // PeriodEndDate: new Date().toISOString(),
        }}
        validationSchema={paymentTransactionSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className='mt-10 space-y-4'>
            <FormControl>
              <Input
                name='amountPaid'
                placeholder='5'
                label={t('students.transaction.form.amount')}
                type='number'
                id='inputAmountPaid'
              />
              <Input
                name='paidTime'
                label={t('students.transaction.form.paidTime')}
                type='date'
                id='inputPaidTime'
                placeholder = {new Date().toISOString()}
              />
            </FormControl>
            {/* <FormControl>
              <Input
                name='PeriodStartDate'
                label={t('students.transaction.form.periodStartDate')}
                type='date'
                id='inputPeriodStartDate'
              />
              <Input
                name='PeriodEndDate'
                label={t('students.transaction.form.periodEndDate')}
                type='date'
                id='inputPeriodEndDate'
              />
            </FormControl> */}
            <FormControl>
              <Input
                name='referencePaidNumber'
                placeholder={t(
                  'students.transaction.form.placeholders.refPaidNum',
                )}
                label={t('students.transaction.form.refPaidNum')}
                id='inputReferencePaidNumber'
              />
            </FormControl>
            <FormControl>
              <Input
                name='notes'
                placeholder={t(
                  'students.transaction.form.placeholders.refPaidNum',
                )}
                label={t('students.transaction.form.refNotes')}
                id='notes'
              />
            </FormControl>

            <div className='!mt-6 '>
              <LoadingButton
                disabled={isLoading}
                isLoading={isLoading}
                status='success'
              >
                {t('students.transaction.buttons.add')}
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddPaymentTransactionForm;
