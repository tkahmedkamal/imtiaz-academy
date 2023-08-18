import axiosConfig from '../config/axiosConfig';

export const getCourse = async (page, filter) => {
  try {
    const res = await axiosConfig.get(
      `/api/course?searchString=${filter}&pageNumber=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
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
  try {
    const { data } = await axiosConfig.post('/api/course/add', details, {
      headers: {
        'Content-Type': 'application/json',
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
  try {
    const { data } = await axiosConfig.post('/api/course/edit', details, {
      headers: {
        'Content-Type': 'application/json',
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
