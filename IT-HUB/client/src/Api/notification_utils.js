import axios from "axios";
import { client } from "./queryClient";

export const getNotification = async () => {
  const notification = await axios.get(`/api/notification`);

  client.invalidateQueries(["notificationCount"]);

  const oldNotification = client.getQueryData(["notificationCount"]);
  if (oldNotification) {
    oldNotification.count = 0;
  }

  client.setQueryData(["notificationCount"], oldNotification);

  return notification.data.reverse();
};

export const getNotificationCount = async () => {
  try {
    const notification = await axios.get(`/api/notification/count`);
    console.log(notification.data);

    return notification.data;
  } catch (error) {
    return { count: 0 };
  }
};
