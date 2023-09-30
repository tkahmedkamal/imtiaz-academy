import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { loginApi } from '../../../services/authApi';
import { useAuthCtx } from '../../../context/authContext';

const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthCtx();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: credential => loginApi(credential),

    onSuccess: ({ message, ...data }) => {
      toast.success(message);
      setUser(data);
      navigate('/dashboard', { replace: true });
    },
    onError: ({ message }) => {
      toast.error(message);
      setUser(null);
    },
  });

  return {
    login,
    isLoading,
  };
};

export default useLogin;
