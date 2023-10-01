import axiosConfig from '../config/axiosConfig';

export const getEducational = async (page, filter) => {
  const token = localStorage.getItem('im_access_token');

  try {
    const res = await axiosConfig.get(
      `/api/educationalProgram?searchString=${filter}&pageNumber=${page}`,
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

export const addEducational = async program => {
  const token = localStorage.getItem('im_access_token');

  try {
    const { data } = await axiosConfig.post(
      '/api/educationalProgram/add',
      program,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (data.status === 406) {
      throw Error(data.msg);
    }

    return data;
  } catch ({ message }) {
    if (message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(message);
  }
};

export const editEducational = async program => {
  const token = localStorage.getItem('im_access_token');

  try {
    const { data } = await axiosConfig.post(
      '/api/educationalProgram/edit',
      program,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (data.status === 406) {
      throw Error(data.msg);
    }

    return data;
  } catch (err) {
    if (err.message.includes('Network Error')) {
      throw Error('Something went wrong, please try again');
    }

    throw Error(err.message);
  }
};

// export const deleteStudent = async id => {
//   try {
//     const { data } = await axiosConfig.delete(`/api/student/delete/${id}`, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (data.status === 406) {
//       throw Error(data.msg);
//     }

//     return data;
//   } catch ({
//     message,
//     response: {
//       data: { status, title },
//     },
//   }) {
//     if (status === 404) {
//       throw Error(`Student is ${title}`);
//     }

//     if (message.includes('Network Error')) {
//       throw Error('Something went wrong, please try again');
//     }

//     throw Error(message);
//   }
// };

export const archiveEducational = async id => {
  const token = localStorage.getItem('im_access_token');

  try {
    const { data } = await axiosConfig.post(
      `/api/educationalProgram/archiveStatus/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (data.status === 406) {
      throw Error(data.msg);
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
