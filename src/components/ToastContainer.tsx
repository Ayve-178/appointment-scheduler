import { Toast } from "flowbite-react";

interface ToastContainerProps {
  status: "success" | "danger" | "info";
  icon: React.ReactNode;
  message: string;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  status,
  icon,
  message,
}) => {
  const statusStyles = {
    success:
      "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200",
    danger: "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200",
    info: "bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200",
  };

  return (
    <Toast className="w-[320px]">
      <div
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${statusStyles[status]}`}
      >
        {icon}
      </div>
      <div className="ml-3 text-sm w-full font-semibold">{message}</div>
      <Toast.Toggle />
    </Toast>
  );
};

export default ToastContainer;
