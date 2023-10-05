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
      isPersonal: values.isPersonal === 'true',
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
          name: '',
          numberOfClasses: '',
          classDurationInMinutes: '',
          cost: '',
          discount: '0',
          isPersonal: '',
          educationalProgramId: programId,
        }}
        validationSchema={courseSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className='mt-10 space-y-4'>
            <FormControl>
              <Input
                name='name'
                placeholder={`${t(
                  'educational.course.form.placeholders.name',
                )} ( English )`}
                label={`${t('educational.course.texts.name')}`}
                id='inputName'
              />
            </FormControl>

            <FormControl>
              <Input
                name='numberOfClasses'
                placeholder='min 1 max 30'
                label={`${t('educational.course.texts.numOfClasses')}`}
                type='number'
                id='inputNumberOfClasses'
              />
              <Input
                name='classDurationInMinutes'
                placeholder='min 10 max 180'
                label={`${t('educational.course.texts.minutes')}`}
                type='number'
                id='inputClassDurationInMinutes'
              />
            </FormControl>

            <FormControl>
              <Input
                name='cost'
                placeholder='0'
                label={`${t('educational.course.texts.cost')}`}
                type='number'
                id='inputCost'
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
                name='isPersonal'
                id='inputIsPersonal'
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
