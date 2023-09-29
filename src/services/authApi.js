import axiosConfig from '../config/axiosConfig';

export const loginApi = async credential => {
  try {
    const res = await axiosConfig.post('/api/Auth/Login', credential, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    localStorage.setItem('im_access_token', res.data.token);
    return res.data;
  } catch ({ message }) {
    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(message);
  }
};

export const signupApi = async data => {
  try {
    const res = await axiosConfig.post('/api/Auth/RegisterAsEmployee', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    localStorage.setItem('im_access_token', res.data.token);
    return res.data;
  } catch ({ message }) {
    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(message);
  }
};
