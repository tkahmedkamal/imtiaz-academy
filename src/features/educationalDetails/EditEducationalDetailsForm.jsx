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
      programTypeId: values.programTypeId === 'true' ? true : false,
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
                id={`${t('educational.details.texts.sub')}-en`}
                value={values.subProgramNamePr}
              />
              <Input
                name='subProgramNameSc'
                placeholder={`${t(
                  'educational.details.form.placeholders.sub',
                )} ( Malaysia )`}
                id={`${t('educational.details.texts.sub')}-ml`}
                value={values.subProgramNameSc}
              />
            </FormControl>

            <FormControl>
              <Input
                name='numberOfClasses'
                placeholder='0'
                id={`${t('educational.details.texts.numOfClasses')}`}
                type='number'
                value={values.numberOfClasses}
              />
              <Input
                name='classDurationInMinutes'
                placeholder='0'
                id={`${t('educational.details.texts.minutes')}`}
                type='number'
                value={values.classDurationInMinutes}
              />
            </FormControl>

            <FormControl>
              <Input
                name='programCost'
                placeholder='0'
                id={`${t('educational.details.texts.cost')}`}
                type='number'
                value={values.programCost}
              />
              <Input
                name='discount'
                placeholder='0'
                id={`${t('educational.details.texts.discount')}`}
                type='number'
                value={values.discount}
              />
            </FormControl>

            <FormControl>
              <Select
                label={t('educational.details.texts.programType')}
                name='programTypeId'
                value={values.programTypeId}
              >
                <option value={true}>{t('global.personal')}</option>
                <option value={false}>{t('global.collective')}</option>
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
