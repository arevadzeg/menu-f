import React from "react";
import { useAtom, useSetAtom } from "jotai";
import { atom } from "jotai";

export const alertAtom = atom<AlertState>({
  type: null,
  message: "",
  isVisible: false,
});

export enum ALERT_TYPE {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
}

interface AlertState {
  type: ALERT_TYPE.SUCCESS | ALERT_TYPE.ERROR | ALERT_TYPE.WARNING | null;
  message: string;
  isVisible: boolean;
}

export const useAlert = () => {
  const setAlert = useSetAtom(alertAtom);

  const showAlert = (message: string, type: ALERT_TYPE) => {
    setAlert({
      type,
      message,
      isVisible: true,
    });

    setTimeout(() => {
      setAlert({ type: null, message: "", isVisible: false });
    }, 5000);
  };

  return showAlert;
};

const Alert: React.FC = () => {
  const [alertState, setAlertState] = useAtom(alertAtom);

  const closeAlert = () => {
    setAlertState({
      type: null,
      message: "",
      isVisible: false,
    });
  };

  if (!alertState.isVisible) return null;

  let alertStyle = "";

  switch (alertState.type) {
    case "success":
      alertStyle = "bg-green-500 text-white";
      break;
    case "error":
      alertStyle = "bg-red-500 text-white";
      break;
    case "warning":
      alertStyle = "bg-yellow-500 text-white";
      break;
    default:
      break;
  }

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${alertStyle}`}
    >
      <div className="flex justify-between items-center">
        <span>{alertState.message}</span>
        <button onClick={closeAlert} className="ml-4 font-bold">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Alert;
