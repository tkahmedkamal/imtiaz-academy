import axiosConfig from '../config/axiosConfig';

export const getEducationalDetails = async (page, filter) => {
  try {
    const res = await axiosConfig.get(
      `/api/educationalProgramDetails?searchString=${filter}&pageNumber=${page}`,
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

export const addEducationalDetails = async details => {
  try {
    const { data } = await axiosConfig.post(
      '/api/educationalProgramDetails/add',
      details,
      {
        headers: {
          'Content-Type': 'application/json',
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

export const editEducationalDetails = async details => {
  try {
    const { data } = await axiosConfig.post(
      '/api/educationalProgramDetails/edit',
      details,
      {
        headers: {
          'Content-Type': 'application/json',
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

// export const archiveEducational = async id => {
//   try {
//     const { data } = await axiosConfig.post(
//       `/api/educationalProgram/archiveStatus/${id}`,
//       {},
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
//     );

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
