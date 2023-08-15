import { object, string } from 'yup';

const educationalSchema = object().shape({
  namePr: string()
    .min(3, 'Name must be three or more letters')
    .required('Name is a required field'),
  nameSc: string()
    .min(3, 'Name must be three or more letters')
    .required('Name is a required field'),
});

export { educationalSchema };
