import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TeacherSignupForm from '../../features/auth/teacher-signup/TeacherSignupForm';
import { Logo } from '../../ui';

const TeacherSignup = () => {
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
        <TeacherSignupForm />
      </div>
    </div>
  );
};

export default TeacherSignup;
