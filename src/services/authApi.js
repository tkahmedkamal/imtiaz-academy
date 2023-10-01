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
  } catch (error) {
    const { message, response } = error;

    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    const errors =
      response?.data?.errors instanceof Object
        ? JSON.stringify(response?.data?.errors)
        : response?.data;

    throw new Error(errors);
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
  } catch (error) {
    const { message, response } = error;

    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    const errors =
      response?.data?.errors instanceof Object
        ? JSON.stringify(response?.data?.errors)
        : response?.data;

    throw new Error(errors);
  }
};

export const signupStudentApi = async data => {
  const token = localStorage.getItem('im_access_token');

  try {
    const res = await axiosConfig.post('/api/Auth/RegisterAsStudent', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    const { message, response } = error;

    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    const errors =
      response?.data?.errors instanceof Object
        ? JSON.stringify(response?.data?.errors)
        : response?.data;

    throw new Error(errors);
  }
};
