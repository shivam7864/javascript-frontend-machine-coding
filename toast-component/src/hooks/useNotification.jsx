import { useCallback, useState } from "react";
import Notification from "../component/notification";

let counter = 0;
const useNotification = (position = "top-right") =>{
     const [notifications, setNotifications] = useState([]);

  let timer;

  const triggerNotification = useCallback((notificationProps) => {
    const id = counter++;

    setNotifications((prev) => [
      ...prev,
      { ...notificationProps, id }
    ]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, notificationProps.duration || 3000);
  }, []);

  const NotificationComponent = (
    <div className={`notification-container ${position}`}>
      {notifications.map((notification) => (
        <Notification key={notification.id} {...notification} />
      ))}
    </div>
  );
  return {NotificationComponent, triggerNotification};
}

export default useNotification;
