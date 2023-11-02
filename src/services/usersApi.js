import axiosConfig from '../config/axiosConfig';

export const getUsersAccountant = async (page, filter) => {
  const token = localStorage.getItem('im_access_token');

  try {
    const res = await axiosConfig.get(
      `/api/User/accountant/notArchived?searchString=${filter}&pageNumber=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.data.status === 406) {
      return Promise.reject(Error(res.data.msg));
    }
    return res.data;
  } catch ({ message }) {
    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(message);
  }
};

export const getEmployeeUsers = async (page, filter) => {
  const token = localStorage.getItem('im_access_token');

  try {
    const res = await axiosConfig.get(
      `/api/user/?searchString=userType=!1,${filter}&pageNumber=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.data.status === 406) {
      return Promise.reject(Error(res.data.msg));
    }
    return res.data;
  } catch ({ message }) {
    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(message);
  }
};
export const getUser = async userId => {
  const token = localStorage.getItem('im_access_token');

  try {
    const res = await axiosConfig.get(`/api/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.status === 406) {
      return Promise.reject(Error(res.data.msg));
    }
    return res.data;
  } catch ({ message }) {
    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(message);
  }
};

export const editUser = async user => {
  const token = localStorage.getItem('im_access_token');

  try {
    const { data } = await axiosConfig.post('/api/user/edit', user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.status === 406) {
      return Promise.reject(Error(data?.msg));
    }

    return data;
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

export const deleteUser = async id => {
  const token = localStorage.getItem('im_access_token');

  try {
    const { data } = await axiosConfig.delete(`/api/user/delete/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.status === 406) {
      return Promise.reject(Error(data?.msg));
    }

    return data;
  } catch ({
    message,
    response: {
      data: { status, title },
    },
  }) {
    if (status === 404) {
      throw Error(`User is ${title}`);
    }

    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(message);
  }
};

export const addUserEnrollment = async enrollmentData => {
  const token = localStorage.getItem('im_access_token');

  try {
    const { data } = await axiosConfig.post(
      '/api/userEnrollments/add',
      enrollmentData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (data.status === 406) {
      return Promise.reject(Error(data?.msg));
    }

    return data;
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

export const addPaymentTransaction = async userPaymentTrans => {
  const token = localStorage.getItem('im_access_token');

  try {
    const { data } = await axiosConfig.post(
      `/api/user/fee`,
      userPaymentTrans,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (data.status === 406) {
      return Promise.reject(Error(data?.msg));
    }

    return data;
  } catch ({
    message,
    response: {
      data: { status, title },
    },
  }) {
    if (status === 404) {
      throw Error(`User is ${title}`);
    }

    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(message);
  }
};

export const archiveUser = async id => {
  const token = localStorage.getItem('im_access_token');

  try {
    const { data } = await axiosConfig.post(
      `/api/user/archiveStatus/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (data.status === 406) {
      return Promise.reject(Error(data?.msg));
    }

    return data;
  } catch ({
    message,
    response: {
      data: { status, title },
    },
  }) {
    if (status === 404) {
      throw Error(`User is ${title}`);
    }

    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(message);
  }
};
