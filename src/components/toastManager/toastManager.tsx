import { toast } from "react-toastify";

export const successToast = (message: string) => {
  toast.success(message, { className: "text-lg" });
};

export const errorToast = (message: string) => {
  toast.error(message, { className: "text-lg" });
};

export const infoToast = (message: string) => {
  toast.info(message, { className: "text-lg" });
};

export const warningToast = (message: string) => {
  toast.warn(message);
};
