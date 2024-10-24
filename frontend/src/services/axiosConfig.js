import axios from 'axios';

export const setupAxiosInterceptor = () => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        alert('Session expired. You have been logged out.');
        window.location.href = '/';  // Redirect to the home page
      }
      return Promise.reject(error);
    }
  );
};
