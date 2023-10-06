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
    name,
    numberOfClasses,
    classDurationInMinutes,
    cost,
    discount,
    isPersonal,
    educationalProgramId,
  } = detail;
  const handleSubmit = values => {
    const data = {
      id,
      ...values,
      isPersonal: values.courseType === 'Personal',
    };
    delete data.courseType;
    mutate(data);
  };

  return (
    <>
      <h2 className='font-publicSans text-xl font-medium text-primary-text dark:text-dark-primary-text/75'>
        {t('educational.course.editTitle')}
      </h2>

      <Formik
        initialValues={{
          name: name || '',
          numberOfClasses: numberOfClasses || '',
          classDurationInMinutes,
          cost,
          discount,
          courseType: isPersonal ? 'Personal' : 'Group',
          educationalProgramId,
        }}
        validationSchema={courseSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className='mt-10 space-y-4'>
            <FormControl>
              <Input
                name='name'
                placeholder={`${t(
                  'educational.course.form.placeholders.name',
                )} ( English )`}
                label={`${t('educational.course.texts.name')}`}
                value={values.name}
                id='inputName'
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
                name='cost'
                placeholder={cost}
                label={`${t('educational.course.texts.cost')}`}
                type='number'
                value={values.cost}
                id='inputCost'
              />
              <Input
                name='discount'
                placeholder={discount}
                label={`${t('educational.course.texts.discount')}`}
                type='number'
                value={values.discount}
                id='inputDiscount'
              />
            </FormControl>

            <FormControl>
              <Select
                label={t('educational.course.texts.programType')}
                name='courseType'
                value={values.courseType}
                id='inputCourseType'
              >
                <option value='Personal'>{t('global.personal')}</option>
                <option value='Group'>{t('global.group')}</option>
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
