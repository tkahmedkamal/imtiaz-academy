import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../../features/auth/login/LoginForm';
import { Logo } from '../../ui';

const Login = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('im_access_token');

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  return (
    <div className='flex h-screen w-full items-center justify-center px-6'>
      <div className='space-y-10'>
        <div className='flex justify-center'>
          <Logo />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
