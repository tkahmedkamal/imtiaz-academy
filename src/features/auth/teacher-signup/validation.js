import { object, string } from 'yup';

const signupSchema = object().shape({
  name: string().required('Name is a required field'),
  email: string()
    .email('Email is not valid').nullable() 
    .transform((value, originalValue) => {
      if (originalValue === null || originalValue === undefined || originalValue.trim() === '') {
        return null;
      }
      return value;
    }),
  password: string().required('Password is a required field'),
  phoneNumber: string().required('Phone number is a required field'),
  userType: string().required('User Type is a required field'),
});

export default signupSchema;
