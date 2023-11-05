import { useState } from 'react';
import StudentDetailsTabs from './StudentDetailsTabs';
import { formatIsoDate } from '../../../utils/formatDate';

const StudentTabDetailsItem = ({ info }) => {
  const [tab, setTab] = useState('info');

  if (!info) {
    return null;
  }

  const variants =
    'flex justify-between gap-16 py-3 text-secondary-text dark:text-dark-secondary-text';

  const infoData = [
    { label: 'Name', value: info.name ? info.name : '—' },
    {
      label: 'Date of Birth',
      value: info.dateOfBirth ? formatIsoDate(info.dateOfBirth) : '—',
    },
    { label: 'Nationality', value: info.nationality ? info.nationality : '—' },
    { label: 'Age', value: info.age ? info.age : '—' },
    { label: 'Gender', value: info.isMale ? 'Male' : 'Female' },
    { label: 'job', value: info.job ? info.job : '—' },
    { label: 'Know About Us', value: info.knowAboutUs },
  ];

  const contactData = [
    { label: 'Address', value: info.address ? info.address : '—' },
    { label: 'City', value: info.city ? info.city : '—' },
    { label: 'Email', value: info.email },
    { label: 'Phone Number', value: info.phoneNumber ? info.phoneNumber : '—' },
    { label: 'State', value: info.state ? info.state : '—' },
    { label: 'Post Code', value: info.postCode ? info.postCode : '—' },
  ];

  let studentInfo;

  switch (tab) {
    case 'info':
      studentInfo = infoData.map(({ label, value }, index) => (
        <li className={variants} key={index}>
          <span className='font-semibold'>{label}:</span>
          <span className='text-end'>{value}</span>
        </li>
      ));
      break;

    case 'contact':
      studentInfo = contactData.map(({ label, value }, index) => (
        <li className={variants} key={index}>
          <span className='font-semibold'>{label}:</span>
          <span className='text-end'>{value}</span>
        </li>
      ));
      break;

    default:
  }

  return (
    <>
      <StudentDetailsTabs tab={tab} setTab={setTab} />

      <ul className='mt-6 flex flex-col divide-y divide-divider font-publicSans dark:divide-dark-divider'>
        {studentInfo}
      </ul>
    </>
  );
};

export default StudentTabDetailsItem;
