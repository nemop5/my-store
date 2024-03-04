import axios from "axios";

export const inventar = (params) => {
  return axios(params).catch((error) => {
    const statusCode = error.response.status;

    if (statusCode === 401) {
      document.cookie = "access_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      window.location.reload();
    }

    if (statusCode === 403) {
      alert(error.response.data.message);
    }

    throw error;
  });
};
