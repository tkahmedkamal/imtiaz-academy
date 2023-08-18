import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import { LoadingButton, Input, FormControl, Select } from '../../ui';
import { courseSchema } from './validation';
import useAddCourse from './useAddCourse';

const CreateCourseForm = ({ programId, closeModal }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useAddCourse(closeModal);

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
        {t('educational.course.addTitle')}
      </h2>

      <Formik
        initialValues={{
          namePr: '',
          nameSc: '',
          numberOfClasses: '',
          classDurationInMinutes: '',
          programCost: '',
          discount: '0',
          programTypeId: '',
          educationalProgramId: programId,
        }}
        validationSchema={courseSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className='mt-10 space-y-4'>
            <FormControl>
              <Input
                name='namePr'
                placeholder={`${t(
                  'educational.course.form.placeholders.name',
                )} ( English )`}
                label={`${t('educational.course.texts.name')}-en`}
                id='inputNamePr'
              />
              <Input
                name='nameSc'
                placeholder={`${t(
                  'educational.course.form.placeholders.name',
                )} ( Malaysia )`}
                label={`${t('educational.course.texts.name')}-ml`}
                id='inputSNameSc'
              />
            </FormControl>

            <FormControl>
              <Input
                name='numberOfClasses'
                placeholder='0'
                label={`${t('educational.course.texts.numOfClasses')}`}
                type='number'
                id='inputNumberOfClasses'
              />
              <Input
                name='classDurationInMinutes'
                placeholder='0'
                label={`${t('educational.course.texts.minutes')}`}
                type='number'
                id='inputClassDurationInMinutes'
              />
            </FormControl>

            <FormControl>
              <Input
                name='programCost'
                placeholder='0'
                label={`${t('educational.course.texts.cost')}`}
                type='number'
                id='inputProgramCost'
              />
              <Input
                name='discount'
                placeholder='0'
                label={`${t('educational.course.texts.discount')}`}
                type='number'
                id='inputDiscount'
              />
            </FormControl>

            <FormControl>
              <Select
                label={t('educational.course.texts.programType')}
                name='programTypeId'
                id='inputProgramTypeId'
              >
                <option value='true'>{t('global.personal')}</option>
                <option value='false'>{t('global.group')}</option>
              </Select>
            </FormControl>

            <div className='!mt-6 '>
              <LoadingButton
                disabled={isLoading}
                isLoading={isLoading}
                status='success'
              >
                {t('educational.course.buttons.add')}
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateCourseForm;
