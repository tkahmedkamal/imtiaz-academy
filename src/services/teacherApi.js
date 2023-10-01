import axiosConfig from '../config/axiosConfig';

export const getTeachers = async (page, filter) => {
  const token = localStorage.getItem('im_access_token');

  try {
    const res = await axiosConfig.get(
      `/api/teacher?searchString=${filter}&pageNumber=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.data.status === 406) {
      return Promise.reject(Error(res.data?.msg));
    }
    return res.data;
  } catch ({ message }) {
    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(message);
  }
};
