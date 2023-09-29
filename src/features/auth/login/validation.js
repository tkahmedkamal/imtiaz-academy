import { object, string } from 'yup';

export const loginSchema = object().shape({
  userNamOrEmail: string().required('Username or Email is a required field'),
  password: string().required('Password is a required field'),
});
