import { create } from "zustand";
import { v4 as uuid } from "uuid";

type AppNotification = {
  message: string;
  type: "success" | "error" | "warning";
  notificationId?: string;
};

type AppNotifications = AppNotification[];

type NotificationStore = {
  notifications: AppNotifications;
};

export const useNotificationStore = create<NotificationStore>(() => ({
  notifications: [],
}));

export const notify = (notification: AppNotification) => {
  const store = useNotificationStore;
  const state = store.getState();

  if (state.notifications.find((n) => n.message === notification.message && n.type === "error")) return;

  const notificationId = uuid();
  store.setState({ notifications: [...state.notifications, { ...notification, notificationId }] });

  setTimeout(() => {
    store.setState({
      notifications: store.getState().notifications.filter((n) => n.notificationId !== notificationId),
    });
  }, 3000);
};

export const clearNotification = (notificationId: string) =>
  useNotificationStore.setState((state) => ({ notifications: state.notifications.filter((n) => n.notificationId !== notificationId) }));
