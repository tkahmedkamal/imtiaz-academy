import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Logo } from '../../ui';
import StudentSignupForm from '../../features/auth/student-signup/StudentSignupForm';

const StudentSignup = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('im_access_token');

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  return (
    <div className='mx-auto flex w-full justify-center py-12 xs:px-6 md:px-0'>
      <div className='space-y-10'>
        <div className='flex justify-center'>
          <Logo />
        </div>
        <StudentSignupForm />
      </div>
    </div>
  );
};

export default StudentSignup;
