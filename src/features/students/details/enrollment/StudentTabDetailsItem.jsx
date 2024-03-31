import { useState } from 'react';
import StudentDetailsTabs from './StudentDetailsTabs';
import { formatIsoDate } from '../../../../utils/formatDate';
import StudentDetailsEnrollment from './StudentDetailsEnrollment';
import { useTranslation } from 'react-i18next';

const knowAboutUs = new Map();
knowAboutUs.set(1, 'Facebook');
knowAboutUs.set(2, 'Instagram');
knowAboutUs.set(3, 'Friends');
knowAboutUs.set(4, 'Whatsapp');
knowAboutUs.set(5, 'Telegram');
knowAboutUs.set(6, 'Other');

const StudentTabDetailsItem = ({ info, enrollments }) => {
  const [tab, setTab] = useState('info');
  const { t } = useTranslation();
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
    { label: t('global.nationality'), value: info.nationality ? info.nationality : '—' },
    { label: t('global.age'), value: info.age ? info.age : '—' },
    { label: t('global.gender'), value: info.isMale ? 'Male' : 'Female' },
    { label: 'job', value: info.job ? info.job : '—' },
    { label: 'Know About Us', value: knowAboutUs.get(info.knowAboutUs) },
  ];

  const contactData = [
    { label: 'Phone Number', value: info.phoneNumber ? info.phoneNumber : '—' },
    { label: 'Email', value: info.email },
    { label: 'Address', value: info.address ? info.address : '—' },
    { label: 'Post Code', value: info.postCode ? info.postCode : '—' },
    { label: 'City', value: info.city ? info.city : '—' },
    { label: 'State', value: info.state ? info.state : '—' },
    { label: 'Country', value: info.country ? info.country : '—' },
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
