import { object, string } from 'yup';

const signupSchema = object().shape({
  name: string().required('Name is a required field'),
  userName: string().required('Username is a required field'),
  email: string()
    .email('Email is not valid')
    .required('Email is a required field'),
  password: string().required('Password is a required field'),
  userType: string().required('User Type is a required field'),
});

export default signupSchema;
