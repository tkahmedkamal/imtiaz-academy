import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import { LoadingButton, Input, FormControl, Select } from '../../ui';
import { educationalDetailsSchema } from './validation';
import useEditEducationalDetails from './useEditEducationalDetails';

const EditEducationalDetailsForm = ({ detail, closeModal }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useEditEducationalDetails(closeModal);

  const {
    id,
    subProgramNamePr,
    subProgramNameSc,
    numberOfClasses,
    classDurationInMinutes,
    programCost,
    discount,
    programTypeId,
    educationalProgramId,
  } = detail;
  const handleSubmit = values => {
    const data = {
      ...values,
      id,
      programTypeId: values.programTypeId === 'true',
    };

    mutate(data);
  };

  return (
    <>
      <h2 className='font-publicSans text-xl font-medium text-primary-text dark:text-dark-primary-text/75'>
        {t('educational.details.editTitle')}
      </h2>

      <Formik
        initialValues={{
          subProgramNamePr,
          subProgramNameSc,
          numberOfClasses,
          classDurationInMinutes,
          programCost,
          discount,
          programTypeId,
          educationalProgramId,
        }}
        validationSchema={educationalDetailsSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className='mt-10 space-y-4'>
            <FormControl>
              <Input
                name='subProgramNamePr'
                placeholder={`${t(
                  'educational.details.form.placeholders.sub',
                )} ( English )`}
                label={`${t('educational.details.texts.sub')}-en`}
                value={values.subProgramNamePr}
                id='inputSubProgramNamePr'
              />
              <Input
                name='subProgramNameSc'
                placeholder={`${t(
                  'educational.details.form.placeholders.sub',
                )} ( Malaysia )`}
                label={`${t('educational.details.texts.sub')}-ml`}
                value={values.subProgramNameSc}
                id='inputSubProgramNameSc'
              />
            </FormControl>

            <FormControl>
              <Input
                name='numberOfClasses'
                placeholder='0'
                label={`${t('educational.details.texts.numOfClasses')}`}
                type='number'
                value={values.numberOfClasses}
                id='inputNumberOfClasses'
              />
              <Input
                name='classDurationInMinutes'
                placeholder='0'
                label={`${t('educational.details.texts.minutes')}`}
                type='number'
                value={values.classDurationInMinutes}
                id='inputClassDurationInMinutes'
              />
            </FormControl>

            <FormControl>
              <Input
                name='programCost'
                placeholder='0'
                label={`${t('educational.details.texts.cost')}`}
                type='number'
                value={values.programCost}
                id='inputProgramCost'
              />
              <Input
                name='discount'
                placeholder='0'
                label={`${t('educational.details.texts.discount')}`}
                type='number'
                value={values.discount}
                id='inputDiscount'
              />
            </FormControl>

            <FormControl>
              <Select
                label={t('educational.details.texts.programType')}
                name='programTypeId'
                value={values.programTypeId}
                id='inputProgramTypeId'
              >
                <option value={true}>{t('global.personal')}</option>
                <option value={false}>{t('global.group')}</option>
              </Select>
            </FormControl>

            <div className='!mt-6 '>
              <LoadingButton
                disabled={isLoading}
                isLoading={isLoading}
                status='success'
              >
                {t('educational.details.buttons.edit')}
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditEducationalDetailsForm;
