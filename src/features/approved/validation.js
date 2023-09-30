import { object, date, ref } from 'yup';

const approveSchema = object().shape({
  contractStartDate: date().required('Contract start date is a required field'),
  contractEndDate: date()
    .min(
      ref('contractStartDate'),
      "Contract end date can't be before contract start date",
    )
    .required('Contract end date is a required field'),
});

export default approveSchema;
