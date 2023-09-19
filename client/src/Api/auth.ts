import axios from "axios";
const BASE_API = process.env.REACT_APP_BASE_API;

export const getProfileApi = async () => {
  return await axios.get(BASE_API + "/api/getUserData", {
    withCredentials: true,
  });
};

export const updateProfileApi = async (newUserData: any) => {
  // const storage_jwt_token = localStorage.getItem("login_jwt_token");
  return await axios.post(
    BASE_API + "/api/updateUserData",
    {
      newUserData: newUserData,
    },
    {
      // headers: {
      //   Authorization: `Bearer ${storage_jwt_token}`,
      // },
      withCredentials: true,
    }
  );
};
