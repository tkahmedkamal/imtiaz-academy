import { object, string } from 'yup';

const loginSchema = object().shape({
  email: string()
    .email('Email is invalid')
    .required('Email is a required field'),
  password: string()
    .min(8, 'Passwords must be at least 8 characters')
    .required('Password is a required field'),
});

export { loginSchema };
