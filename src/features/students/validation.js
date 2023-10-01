import { object, string, number, date } from 'yup';

const studentSchema = object().shape({
  name: string()
    .max(
      60,
      'The field Name must be a string or array type with a maximum length of 60',
    )
    .required('Name is a required field'),
  userName: string().max(
    100,
    'The field Username must be a string with a maximum length of 100.',
  ),
  password: string()
    .max(
      256,
      'The field Password must be a string with a maximum length of 256.',
    )
    .required('Phone number is a required field'),
  phoneNumber: string().required('Phone number is a required field'),
  nationalId: string().max(
    100,
    'The field National-Id must be a string with a maximum length of 100.',
  ),
  nationality: string().max(
    50,
    'The field Nationality must be a string with a maximum length of 50.',
  ),
  age: number()
    .min(5, 'The minimum age is 5')
    .max(100, 'The maximum age is 100'),
  job: string().max(
    50,
    'The field Job must be a string with a maximum length of 50.',
  ),
  address: string().max(
    500,
    'The field Address must be a string with a maximum length of 509.',
  ),
  dateOfBirth: string().required('Date of birth is a required field'),
});

const paymentTransactionSchema = object().shape({
  amountPaid: number()
    .min(5, 'The amount paid is 5 minimum')
    .required('Amount paid is a required field'),
  paidTime: date().required('Paid time is a required field'),
  referencePaidNumber: string()
    .min(17, 'Paid reference number must not exceed 17 characters')
    .max(17, 'Paid reference number must not exceed 17 characters')
    .required('Reference paid number is a required field'),
});

export { studentSchema, paymentTransactionSchema };
