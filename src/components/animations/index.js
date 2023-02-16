import { notification } from "antd";

const openNotificationWithIcon = (type, action) => {
  const curentType = type;
  const curentActions = action;
  notification[type]({
    message: curentType.toUpperCase(),
    description:
      curentActions,
  });
};
export default openNotificationWithIcon;
