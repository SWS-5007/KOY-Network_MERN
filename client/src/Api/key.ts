import axios from "axios";
const BASE_API = process.env.REACT_APP_BASE_API;

export const getUserKeys = async () => {
  return await axios.get(BASE_API + "/api/getUserKeys", {
    withCredentials: true,
  });
};

export const saveNewKeys = async (data: any) => {
  return await axios.post(
    BASE_API + "/api/newKeys",
    {
      data: data,
    },
    {
      withCredentials: true,
    }
  );
};
