import { object, string, number, date } from 'yup';

const studentSchema = object().shape({
  name: string()
    .min(3, 'Name must be three or more letters')
    .required('Name is a required field'),
  country: string()
    .min(3, 'Country must be three or more letters')
    .required('Country is a required field'),
  phoneNumber: string()
    .min(11, 'The phone number must be eleven digits')
    .required('Phone number is a required field'),
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
