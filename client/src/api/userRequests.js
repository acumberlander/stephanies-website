import axios from "axios";

export const fetchUserByUid = async (uid) => {
  const { data } = await axios.get(`/api/users/${uid}`);
  if (!data) {
    return { _id: "false" };
  }
  return data;
};
