import axios from 'axios';

export default (data) => {
  const instance = axios.create({
    baseURL: 'http://localhost:3030',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('feathers-jwt')}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return new Promise((resolve, reject) => {
    instance.post('/uploads', data).then((response) => {
      resolve(response.data);
    }).catch((error) => {
      if (error.response) {
        reject(new Error(error.response.status));
      } else if (error.request) {
        reject(new Error('No response was received'));
      } else {
        reject(new Error('Error in request'));
      }
    });
  });
};
