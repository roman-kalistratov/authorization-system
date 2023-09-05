import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const authApi = {
  register: async (data) => {
    try {
      const response = await publicClient.post("auth/register", data);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  login: async (data) => {
    try {
      const response = await publicClient.post("auth/login", data);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  sendLoginCode: async (data) => {
    try {
      const response = await publicClient.post("auth/send-code", data);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  loginWithCode: async (data) => {
    try {
      const response = await publicClient.post("auth/login-with-code", data);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  logout: async () => {
    try {
      const response = await privateClient.post(`auth/logout`);

      return response;
    } catch (err) {
      return { err };
    }
  },
};

export default authApi;
