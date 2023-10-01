import axiosConfig from '../config/axiosConfig';

export const getStudentsAccountant = async (page, filter) => {
  const token = localStorage.getItem('im_access_token');

  try {
    const res = await axiosConfig.get(
      `/api/Student/accountant/notArchived?searchString=${filter}&pageNumber=${page}`,
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

export const getStudentsEnrollment = async (page, filter) => {
  const token = localStorage.getItem('im_access_token');

  try {
    const res = await axiosConfig.get(
      `/api/student/enrollment/notArchived?searchString=${filter}&pageNumber=${page}`,
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

export const getStudent = async studentId => {
  const token = localStorage.getItem('im_access_token');

  try {
    const res = await axiosConfig.get(`/api/student/${studentId}`, {
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

export const editStudent = async student => {
  const token = localStorage.getItem('im_access_token');

  try {
    const { data } = await axiosConfig.post('/api/student/edit', student, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.status === 406) {
      return Promise.reject(Error(data?.msg));
    }

    return data;
  } catch (err) {
    if (err.message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(err.message);
  }
};

export const deleteStudent = async id => {
  const token = localStorage.getItem('im_access_token');

  try {
    const { data } = await axiosConfig.delete(`/api/student/delete/${id}`, {
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
      throw Error(`Student is ${title}`);
    }

    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(message);
  }
};

export const addPaymentTransaction = async studentPaymentTrans => {
  const token = localStorage.getItem('im_access_token');

  try {
    const { data } = await axiosConfig.post(
      `/api/student/fee`,
      studentPaymentTrans,
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
      throw Error(`Student is ${title}`);
    }

    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(message);
  }
};

export const archiveStudent = async id => {
  const token = localStorage.getItem('im_access_token');

  try {
    const { data } = await axiosConfig.post(
      `/api/student/archiveStatus/${id}`,
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
      throw Error(`Student is ${title}`);
    }

    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(message);
  }
};
