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
  const queryFn = async () => {
    const notification = await axios.get(`/api/notification/count`);

    return notification.data;
  };
  const user = client.getQueryData(["user"]);
  // if (!user) return 0;

  return client.fetchQuery(["notificationCount"], queryFn, {
    staleTime: 1000 * 3,
  });
};
