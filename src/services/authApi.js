import { axiosConfigWithoutToken } from '../config/axiosConfig';

export const loginApi = async credential => {
  try {
    const res = await axiosConfigWithoutToken.post(
      '/api/Auth/Login',
      credential,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    localStorage.setItem('im_access_token', res.data.token);
    return res.data;
  } catch (error) {
    const { message, response } = error;

    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(response?.data);
  }
};

export const signupApi = async data => {
  try {
    const res = await axiosConfigWithoutToken.post(
      '/api/Auth/RegisterAsEmployee',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    localStorage.setItem('im_access_token', res.data.token);
    return res.data;
  } catch (error) {
    const { message, response } = error;

    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(response?.data);
  }
};
