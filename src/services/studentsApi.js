import axiosConfig from '../config/axiosConfig';

export const getStudents = async (page, filter) => {
  try {
    const res = await axiosConfig.get(
      `/api/student?searchString=${filter}&pageNumber=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
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

export const addStudent = async student => {
  try {
    const { data } = await axiosConfig.post('/api/student/add', student, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (data.status === 406) {
      return Promise.reject(Error(data?.msg));
    }

    return data;
  } catch ({ message }) {
    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(message);
  }
};

export const editStudent = async student => {
  try {
    const { data } = await axiosConfig.post('/api/student/edit', student, {
      headers: {
        'Content-Type': 'application/json',
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
  try {
    const { data } = await axiosConfig.delete(`/api/student/delete/${id}`, {
      headers: {
        'Content-Type': 'application/json',
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
  try {
    const { data } = await axiosConfig.post(
      `/api/student/fee`,
      studentPaymentTrans,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log(data);

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
  try {
    const { data } = await axiosConfig.post(
      `/api/student/archiveStatus/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
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
