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
      setUser(null);

      console.log(message);

      if (message.startsWith('{') && message.endsWith('}')) {
        const errors = JSON.parse(message);

        for (const key in errors) {
          if (errors.hasOwnProperty(key)) {
            const array = errors[key];

            array.forEach((item, index) => {
              toast.error(item);
            });
          }
        }

        return;
      }

      toast.error(message);
    },
  });

  return {
    login,
    isLoading,
  };
};

export default useLogin;
