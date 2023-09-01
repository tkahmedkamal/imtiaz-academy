import LoginForm from '../features/login/LoginForm';
import { Logo } from '../ui';

const Login = () => {
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
