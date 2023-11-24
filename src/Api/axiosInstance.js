import axios from 'axios';
import Swal from 'sweetalert2';

const baseURL = 'http://localhost:3001/';
const userBaseURL = baseURL;
const doctorBaseURL = `${baseURL}doctor`;
const adminBaseURL = `${baseURL}admin`;

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 200000,
    timeoutErrorMessage: 'Request Timeout... Please try again!..',
  });
  return instance;
};

const attachToken = (req, tokenName) => {
  let authToken = localStorage.getItem(tokenName);
  if (authToken) {
    req.headers.Authorization = authToken;
  }
  return req;
};


export const userAxiosInstance = createAxiosInstance(userBaseURL);
userAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, 'usertoken');
  return modifiedReq;
});

export const doctorAxiosInstance = createAxiosInstance(doctorBaseURL);
doctorAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, 'doctortoken');
  return modifiedReq;
});

export const adminAxiosInstance = createAxiosInstance(adminBaseURL);
adminAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, 'admintoken');
  return modifiedReq;
});

userAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => handleAxiosError(error),
);

adminAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => handleAxiosError(error),
);

doctorAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => handleAxiosError(error),
);

const handleAxiosError = (error) => {
  // const errorMessage = error.response?error.response.data.message : 'An error occurred while request.';

  if (error.response) {
    if (error.response.status === 404) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'error',
        // title: "404 - Resource Not Found"
        title: error.response.data.message,

      });

    } else if (error.response.status === 401) {

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'error',
        title: error.response.data.message,

      });


    }
    else if (error.response.status === 500) {

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'error',
        // title: "500 - Internal Server Error",
        title: error.response.data.message,
      });

    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'error',
        // title: "error"
        title: error.response.data.message,

      });
    }
  } else {

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'error',
      // title: "error"
      title: error.response.data.message,

    });

  }
};
