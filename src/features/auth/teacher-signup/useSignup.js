import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { signupApi } from '../../../services/authApi';
import { useAuthCtx } from '../../../context/authContext';

const useSignup = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthCtx();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: data => signupApi(data),

    onSuccess: ({ message, ...data }) => {
      toast.success(message);
      setUser(data);
      navigate('/dashboard');
    },
    onError: ({ message }) => {
      toast.error(message);
      setUser(null);
    },
  });

  return {
    signup,
    isLoading,
  };
};

export default useSignup;
