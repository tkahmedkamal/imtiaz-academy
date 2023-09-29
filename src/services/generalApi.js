import axiosConfig from '../config/axiosConfig';

export const getLoggedInUser = async () => {
  const token = localStorage.getItem('im_access_token');

  try {
    const res = await axiosConfig.get(`/api/user/getMe?userToken=${token}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.data.length === 0) {
      localStorage.removeItem('im_access_token');
      throw Error('Your session has expired, login again');
    }

    return res.data;
  } catch ({ message }) {
    if (message.includes('Network Error')) {
      localStorage.removeItem('im_access_token');
      throw Error('Something went wrong, please try again');
    }

    throw Error(message);
  }
};

export const getCountries = async () => {
  try {
    const res = await axiosConfig.get('/api/GeneralAccess/GetAllCountries', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.data;
  } catch ({ message }) {
    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(message);
  }
};
