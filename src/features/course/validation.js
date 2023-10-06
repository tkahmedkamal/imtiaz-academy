import { object, string, number, ref } from 'yup';

const courseSchema = object().shape({
  name: string()
    .min(3, 'Sub program name must be three or more letters')
    .required('Sub program name is a required field'),
  numberOfClasses: number()
    .integer()
    .min(1, 'The minimum number of classes is (1)')
    .required('Number of classes is a required field'),
  classDurationInMinutes: number()
    .min(10, 'Minimum 10 minutes')
    .required('Classes duration in minutes is a required field'),
  cost: number()
    .min(50, 'Less cost 50')
    .required('Program cost is a required field'),
  discount: number()
    .min(0, 'Minimum 0')
    .max(
      ref('cost'),
      'Discount must be less than or equal to program cost',
    )
    .required('Discount is a required field'),
    courseType: string()
    .oneOf(['Personal', 'Group'], 'The Program type must')
    .required('Program type is a required field'),
});

export { courseSchema };
