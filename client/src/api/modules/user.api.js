import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userApi = {
  forgotPassword: async (data) => {
    try {
      const response = await publicClient.post(`user/forgot-password`, data);

      return { response };
    } catch (err) {
      return { err };
    }
  },  
  resetPassword: async (data, token) => {
    try {
      const response = await publicClient.post(
        `user/reset-password/${token}`,
        data
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  auth: async (user) => {
    try {     
      const response = await privateClient.get("user/auth", user);

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default userApi;
