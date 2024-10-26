import { MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdPendingActions } from "react-icons/md";
import { TbClockCancel } from "react-icons/tb";
import { LuCalendarCheck2 } from "react-icons/lu";

interface AppointmentStatusProps {
  status: string;
  id: string;
  updateStatus: any;
}

const AppointmentStatus: React.FC<AppointmentStatusProps> = ({
  status = "pending",
  id,
  updateStatus,
}) => {
  console.log(status, id);

  return (
    <>
      {(status === "pending" && (
        <span className="flex text-blue-500 border rounded-sm border-blue-500 px-2 py-1 gap-x-1">
          <MdPendingActions className="w-5 h-5" />
          <span>Pending</span>
        </span>
      )) ||
        (status === "accept" && (
          <span onClick={() => updateStatus(id, 'accepted')} className="flex text-green-500 border rounded-sm border-green-500 px-2 py-1 gap-x-1 cursor-pointer hover:bg-green-100">
            <MdOutlineDone className="w-5 h-5" />
            <span>Accept</span>
          </span>
        )) ||
        (status === "accepted" && (
          <span className="flex text-green-500 border rounded-sm border-green-500 px-2 py-1 gap-x-1">
            <MdOutlineDone className="w-5 h-5" />
            <span>Accepted</span>
          </span>
        )) ||
        (status === "decline" && (
          <span onClick={() => updateStatus(id, 'declined')} className="flex text-red-600 border rounded-sm border-red-600 px-2 py-1 gap-x-1 cursor-pointer hover:bg-red-100">
            <IoClose className="w-5 h-5" />
            Decline
          </span>
        )) ||
        (status === "declined" && (
          <span className="flex text-red-600 border rounded-sm border-red-600 px-2 py-1 gap-x-1">
            <IoClose className="w-5 h-5" />
            Declined
          </span>
        )) ||
        (status === "cancel" && (  
          <span onClick={() => updateStatus(id, 'cancelled')} className="flex text-gray-600 border rounded-sm border-gray-600 px-2 py-1 gap-x-1 cursor-pointer  hover:bg-gray-100">
            <TbClockCancel className="w-5 h-5" />
            Cancel
          </span>
        )) ||
        (status === "cancelled" && (
          <span className="flex text-gray-600 border rounded-sm border-gray-600 px-2 py-1 gap-x-1">
            <TbClockCancel className="w-5 h-5" />
            Cancelled
          </span>
        )) ||
        (status === "completed" && (
          <span className="flex text-purple-600 border rounded-sm border-purple-600 px-2 py-1 gap-x-1">
            <LuCalendarCheck2 className="w-5 h-5" />
            <span>Completed</span>
          </span>
        ))}
    </>
  );
};

export default AppointmentStatus;
