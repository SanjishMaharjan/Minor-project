import axios from "axios";


export const getNotification = async () => {
  const notification = await axios.get(`/api/notification`);
//   console.log(notification);
  return notification.data;
};
