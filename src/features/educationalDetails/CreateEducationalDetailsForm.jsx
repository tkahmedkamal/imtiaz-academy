import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import { LoadingButton, Input, FormControl, Select } from '../../ui';
import { educationalDetailsSchema } from './validation';
import useAddEducationalDetails from './useAddEducationalDetails';

const CreateEducationalDetailsForm = ({ programId, closeModal }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useAddEducationalDetails(closeModal);

  const handleSubmit = values => {
    const data = {
      ...values,
      programTypeId: values.programTypeId === 'true',
    };

    mutate(data);
  };

  return (
    <>
      <h2 className='font-publicSans text-xl font-medium text-primary-text dark:text-dark-primary-text/75'>
        {t('educational.details.addTitle')}
      </h2>

      <Formik
        initialValues={{
          subProgramNamePr: '',
          subProgramNameSc: '',
          numberOfClasses: '',
          classDurationInMinutes: '',
          programCost: '',
          discount: '0',
          programTypeId: '',
          educationalProgramId: programId,
        }}
        validationSchema={educationalDetailsSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className='mt-10 space-y-4'>
            <FormControl>
              <Input
                name='subProgramNamePr'
                placeholder={`${t(
                  'educational.details.form.placeholders.sub',
                )} ( English )`}
                label={`${t('educational.details.texts.sub')}-en`}
                id='inputSubProgramPr'
              />
              <Input
                name='subProgramNameSc'
                placeholder={`${t(
                  'educational.details.form.placeholders.sub',
                )} ( Malaysia )`}
                label={`${t('educational.details.texts.sub')}-ml`}
                id='inputSubProgramSc'
              />
            </FormControl>

            <FormControl>
              <Input
                name='numberOfClasses'
                placeholder='0'
                label={`${t('educational.details.texts.numOfClasses')}`}
                type='number'
                id='inputNumberOfClasses'
              />
              <Input
                name='classDurationInMinutes'
                placeholder='0'
                label={`${t('educational.details.texts.minutes')}`}
                type='number'
                id='inputClassDurationInMinutes'
              />
            </FormControl>

            <FormControl>
              <Input
                name='programCost'
                placeholder='0'
                label={`${t('educational.details.texts.cost')}`}
                type='number'
                id='inputProgramCost'
              />
              <Input
                name='discount'
                placeholder='0'
                label={`${t('educational.details.texts.discount')}`}
                type='number'
                id='inputDiscount'
              />
            </FormControl>

            <FormControl>
              <Select
                label={t('educational.details.texts.programType')}
                name='programTypeId'
                id='inputProgramTypeId'
              >
                <option value='true'>{t('global.personal')}</option>
                <option value='false'>{t('global.collective')}</option>
              </Select>
            </FormControl>

            <div className='!mt-6 '>
              <LoadingButton
                disabled={isLoading}
                isLoading={isLoading}
                status='success'
              >
                {t('educational.details.buttons.add')}
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateEducationalDetailsForm;
