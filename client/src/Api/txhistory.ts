import axios from "axios";
const BASE_API = process.env.REACT_APP_BASE_API;

export const getUserTxHistory = async () => {
  return await axios.get(BASE_API + "/api/getUserTxHistory", {
    withCredentials: true,
  });
};

export const saveNewTransaction = async (data: any) => {
  return await axios.post(
    BASE_API + "/api/newTransaction",
    {
      data: data,
    },
    {
      withCredentials: true,
    }
  );
};
