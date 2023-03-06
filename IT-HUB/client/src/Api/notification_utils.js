import axios from "axios";
import { client } from "./queryClient";

export const getNotification = async () => {
  const notification = await axios.get(`/api/notification`);
  //   console.log(notification);

  await client.invalidateQueries(["notificationCount"]);
  return notification.data.reverse();
};

export const getNotificationCount = async () => {
  const queryFn = async () => {
    const notification = await axios.get(`/api/notification/count`);

    console.log(notification.data);
    return notification.data.count;
  };
  const user = client.getQueryData(["user"]);
  if (!user) return 0;

  return client.fetchQuery(["notificationCount"], queryFn);
};
