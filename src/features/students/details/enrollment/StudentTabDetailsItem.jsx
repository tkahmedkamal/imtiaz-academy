import { useState } from 'react';
import StudentDetailsTabs from './StudentDetailsTabs';
import { formatIsoDate } from '../../../../utils/formatDate';
import StudentDetailsEnrollment from './StudentDetailsEnrollment';

const knowAboutUs = new Map();
knowAboutUs.set(1, 'Facebook');
knowAboutUs.set(2, 'Instagram');
knowAboutUs.set(3, 'Friends');
knowAboutUs.set(4, 'Whatsapp');
knowAboutUs.set(5, 'Telegram');
knowAboutUs.set(6, 'Other');

const StudentTabDetailsItem = ({ info, enrollments }) => {
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
    { label: 'Know About Us', value: knowAboutUs.get(info.knowAboutUs) },
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

    case 'enrollment':
      studentInfo = (
        <li>
          <StudentDetailsEnrollment enrollments={enrollments} />
        </li>
      );
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
