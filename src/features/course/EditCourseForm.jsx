import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import { LoadingButton, Input, FormControl, Select } from '../../ui';
import { courseSchema } from './validation';
import useEditCourse from './useEditCourse';

const EditCourseForm = ({ detail, closeModal }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useEditCourse(closeModal);

  const {
    id,
    namePr,
    nameSc,
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
        {t('educational.course.editTitle')}
      </h2>

      <Formik
        initialValues={{
          namePr,
          nameSc,
          numberOfClasses,
          classDurationInMinutes,
          programCost,
          discount,
          programTypeId,
          educationalProgramId,
        }}
        validationSchema={courseSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className='mt-10 space-y-4'>
            <FormControl>
              <Input
                name='namePr'
                placeholder={`${t(
                  'educational.course.form.placeholders.name',
                )} ( English )`}
                label={`${t('educational.course.texts.name')}-en`}
                value={values.subProgramNamePr}
                id='inputNamePr'
              />
              <Input
                name='nameSc'
                placeholder={`${t(
                  'educational.course.form.placeholders.name',
                )} ( Malaysia )`}
                label={`${t('educational.course.texts.name')}-ml`}
                value={values.subProgramNameSc}
                id='inputNameSc'
              />
            </FormControl>

            <FormControl>
              <Input
                name='numberOfClasses'
                placeholder='0'
                label={`${t('educational.course.texts.numOfClasses')}`}
                type='number'
                value={values.numberOfClasses}
                id='inputNumberOfClasses'
              />
              <Input
                name='classDurationInMinutes'
                placeholder='0'
                label={`${t('educational.course.texts.minutes')}`}
                type='number'
                value={values.classDurationInMinutes}
                id='inputClassDurationInMinutes'
              />
            </FormControl>

            <FormControl>
              <Input
                name='programCost'
                placeholder='0'
                label={`${t('educational.course.texts.cost')}`}
                type='number'
                value={values.programCost}
                id='inputProgramCost'
              />
              <Input
                name='discount'
                placeholder='0'
                label={`${t('educational.course.texts.discount')}`}
                type='number'
                value={values.discount}
                id='inputDiscount'
              />
            </FormControl>

            <FormControl>
              <Select
                label={t('educational.course.texts.programType')}
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
                {t('educational.course.buttons.edit')}
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditCourseForm;
