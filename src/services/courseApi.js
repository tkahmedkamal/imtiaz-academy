import axiosConfig from '../config/axiosConfig';

export const getCourse = async (page, filter) => {
  const token = localStorage.getItem('im_access_token');

  try {
    const res = await axiosConfig.get(
      `/api/course?searchString=${filter}&pageNumber=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch ({ message }) {
    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(message);
  }
};

export const addCourse = async details => {
  const token = localStorage.getItem('im_access_token');

  try {
    const { data } = await axiosConfig.post('/api/course/add', details, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.status === 406) {
      return Promise.reject(Error(data.msg));
    }

    return data;
  } catch ({ message }) {
    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(message);
  }
};

export const editCourse = async details => {
  const token = localStorage.getItem('im_access_token');

  try {
    const { data } = await axiosConfig.post('/api/course/edit', details, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.status === 406) {
      return Promise.reject(Error(data.msg));
    }

    return data;
  } catch (err) {
    if (err.message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(err.message);
  }
};
