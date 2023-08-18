import { object, string, number, date } from 'yup';

const studentSchema = object().shape({
  namePr: string()
    .min(3, 'Name must be three or more letters')
    .required('Name is a required field'),
  nameSc: string()
    .min(3, 'Name must be three or more letters')
    .required('Name is a required field'),
  countryPr: string()
    .min(3, 'Country must be three or more letters')
    .required('Country is a required field'),
  countrySc: string()
    .min(3, 'Country must be three or more letters')
    .required('Country is a required field'),
  statePr: string()
    .min(3, 'State must be three or more letters')
    .required('State is a required field'),
  stateSc: string()
    .min(3, 'State must be three or more letters')
    .required('State is a required field'),
  email: string()
    .email('Email is invalid')
    .required('Email is a required field'),
  phoneNumber: string()
    .min(11, 'The phone number must be eleven digits')
    .required('Phone number is a required field'),
  nationalId: string()
    .min(9, 'The nationalId must be eleven digits')
    .required('National-ID is a required field'),
  jobPr: string()
    .min(3, 'Job must be three or more letters')
    .required('Job is a required field'),
  jobSc: string()
    .min(3, 'Job must be three or more letters')
    .required('Job is a required field'),
  addressPr: string()
    .min(3, 'Address must be three or more letters')
    .required('Address is a required field'),
  addressSc: string()
    .min(3, 'Address must be three or more letters')
    .required('Address is a required field'),
  gender: string()
    .oneOf(['male', 'female'], 'The gender must')
    .required('Gender is a required field'),
  age: number()
    .min(5, 'The minimum age is 5')
    .max(100, 'The maximum age is 100')
    .required('Age is a required field'),
});

const paymentTransactionSchema = object().shape({
  amountPaid: number()
    .min(5, 'The amount paid is 5 minimum')
    .required('Amount paid is a required field'),
  paidTime: date().required('Paid time is a required field'),
  referancePaidNumber: string()
    .min(17, 'Paid reference number must not exceed 17 characters')
    .max(17, 'Paid reference number must not exceed 17 characters')
    .required('Reference paid number is a required field'),
});

export { studentSchema, paymentTransactionSchema };
