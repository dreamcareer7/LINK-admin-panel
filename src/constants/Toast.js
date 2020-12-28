import {notify} from "react-notify-toast";
import {
    ERROR_TOAST_COLOR, TOAST_TIMEOUT,
    TOAST_TYPE,
    SUCCESS_TOAST_COLOR,
    WARNING_TOAST_COLOR
} from "./AppContants";


export const successNotification = (message) => {
    notify.show(message, TOAST_TYPE.success,TOAST_TIMEOUT, SUCCESS_TOAST_COLOR);
};
export const errorNotification = (message) => {
    notify.show(message, TOAST_TYPE.error,TOAST_TIMEOUT, ERROR_TOAST_COLOR);
};

export const warningNotification = (message) => {
    notify.show(message, TOAST_TYPE.warning,TOAST_TIMEOUT, WARNING_TOAST_COLOR);
};