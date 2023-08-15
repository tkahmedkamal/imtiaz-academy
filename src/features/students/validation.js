import * as yup from 'yup';

const studentSchema = yup.object().shape({
  namePr: yup
    .string()
    .min(3, 'Name must be three or more letters')
    .required('Name is a required field'),
  nameSc: yup
    .string()
    .min(3, 'Name must be three or more letters')
    .required('Name is a required field'),
  countryPr: yup
    .string()
    .min(3, 'Country must be three or more letters')
    .required('Country is a required field'),
  countrySc: yup
    .string()
    .min(3, 'Country must be three or more letters')
    .required('Country is a required field'),
  statePr: yup
    .string()
    .min(3, 'State must be three or more letters')
    .required('State is a required field'),
  stateSc: yup
    .string()
    .min(3, 'State must be three or more letters')
    .required('State is a required field'),
  email: yup
    .string()
    .email('Email is invalid')
    .required('Email is a required field'),
  phoneNumber: yup
    .string()
    .min(11, 'The phone number must be eleven digits')
    .required('Phone number is a required field'),
  nationalId: yup
    .string()
    .min(9, 'The nationalId must be eleven digits')
    .required('National-ID is a required field'),
  jobPr: yup
    .string()
    .min(3, 'Job must be three or more letters')
    .required('Job is a required field'),
  jobSc: yup
    .string()
    .min(3, 'Job must be three or more letters')
    .required('Job is a required field'),
  addressPr: yup
    .string()
    .min(3, 'Address must be three or more letters')
    .required('Address is a required field'),
  addressSc: yup
    .string()
    .min(3, 'Address must be three or more letters')
    .required('Address is a required field'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'The gender must')
    .required('Gender is a required field'),
  age: yup
    .number()
    .min(5, 'The minimum age is 5')
    .max(100, 'The maximum age is 100')
    .required('Age is a required field'),
});

export { studentSchema };
