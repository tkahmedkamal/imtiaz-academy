import axiosConfig from '../config/axiosConfig';

export const getLoggedInUser = async () => {
  const token = localStorage.getItem('im_access_token');

  try {
    const res = await axiosConfig.get(`/api/user/getMe`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

export const getNotApproved = async (page, filter) => {
  const token = localStorage.getItem('im_access_token');

  try {
    const res = await axiosConfig.get(
      `/api/user?searchString=isApproved=false,${filter}&pageNumber=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (error) {
    const { message, response } = error;

    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(response?.data);
  }
};
export const getUsers = async (page, filter) => {
  const token = localStorage.getItem('im_access_token');

  try {
    const res = await axiosConfig.get(
      `/api/user?${filter}&pageNumber=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (error) {
    const { message, response } = error;

    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(response?.data);
  }
};

export const approved = async data => {
  const token = localStorage.getItem('im_access_token');

  try {
    const res = await axiosConfig.post(
      `/api/AdminsDashBoard/ApproveEmployee`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (error) {
    const { message, response } = error;

    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    if (response?.data.errors) {
      throw Error(response?.data.errors.Id[0]);
    }

    throw Error(response?.data);
  }
};

//#region  Dialogs
export const getCoursesDialog = async () => {
  try {
    const res = await axiosConfig.get('/api/Course/GetDialog', {
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
export const getTeachersDialog = async () => {
  try {
    const res = await axiosConfig.get('/api/Teacher/GetDialog', {
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
//#endregion
