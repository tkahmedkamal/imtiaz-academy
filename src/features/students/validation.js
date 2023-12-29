import { object, string, number, date, ref } from 'yup';

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
    .required('Password is a required field'),
  phoneNumber: string().required('Phone number is a required field'),
  nationalId: string().max(
    100,
    'The field National-Id must be a string with a maximum length of 100.',
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

const editStudentSchema = object().shape({
  job: string().max(
    50,
    'The field Job must be a string with a maximum length of 50.',
  ),

  applicationUser: object().shape({
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
    phoneNumber: string().required('Phone number is a required field'),
    nationalId: string().max(
      100,
      'The field National-Id must be a string with a maximum length of 100.',
    ),
    age: number()
      .min(5, 'The minimum age is 5')
      .max(100, 'The maximum age is 100'),
    address: string().max(
      500,
      'The field Address must be a string with a maximum length of 509.',
    ),
    dateOfBirth: string().required('Date of birth is a required field'),
  }),
});

const enrollStudentSchema = object().shape({
  courseId: number().required('Course id is a required field'),
  teacherId: string().required('Teacher id is a required field'),
  numberOfClasses: number()
    .min(4, 'The number of classes is 5 minimum')
    .max(31, 'The number of classes is 31 maximum'),
  classDuration: number().min(10, 'The class duration is 10 minuets minimum'),
  enrollmentCost: number().min(0, 'The enrollment cost is 0 minimum'),
  studyStartDate: date().required('Study start date is a required field'),
  studyEndDate: date()
    .min(ref('studyStartDate'), 'Study end date must be after study start')
    .required('Study end date is a required field'),
});

const paymentTransactionSchema = object().shape({
  amountPaid: number()
    .min(5, 'The amount paid is 5 minimum')
    .required('Amount paid is a required field'),
  paidTime: date().required('Paid time is a required field'),
  referencePaidNumber: string()
    //.min(17, 'Paid reference number must not exceed 17 characters')
    //.max(17, 'Paid reference number must not exceed 17 characters')
    .required('Reference paid number is a required field'),
});

export {
  studentSchema,
  editStudentSchema,
  enrollStudentSchema,
  paymentTransactionSchema,
};
