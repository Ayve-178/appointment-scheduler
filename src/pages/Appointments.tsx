import { Table } from "flowbite-react";
import { MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdPendingActions } from "react-icons/md";
import { TbClockCancel } from "react-icons/tb";
import { LuCalendarCheck2 } from "react-icons/lu";

interface AppointmentsProps {
  isCompleted: boolean;
  isScheduled: boolean;
  isInvited: boolean;
}

const Appointments: React.FC<AppointmentsProps> = ({
  isCompleted = true,
  isScheduled = false,
  isInvited = false,
}) => {
  console.log(isCompleted, isScheduled, isInvited);

  return (
    <div className="overflow-x-auto p-10">
      <Table hoverable>
        <Table.Head>
          {(isCompleted || isInvited) && (
            <Table.HeadCell>Scheduler</Table.HeadCell>
          )}
          {(isCompleted || isScheduled) && (
            <Table.HeadCell>Holder</Table.HeadCell>
          )}
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Time</Table.HeadCell>
          <Table.HeadCell>Duration</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white">
            {(isCompleted || isInvited) && (
              <Table.Cell>ayve178</Table.Cell>
            )}
            {(isCompleted || isScheduled) && (
              <Table.Cell>abir123</Table.Cell>
            )}
            <Table.Cell>Test Appointment</Table.Cell>
            <Table.Cell>23-10-204</Table.Cell>
            <Table.Cell>10:00 AM</Table.Cell>
            <Table.Cell>15m</Table.Cell>
            <Table.Cell className="flex gap-x-1">
              <span className="flex text-green-500 border rounded-sm border-green-500 px-2 py-1 gap-x-1"><MdOutlineDone className="w-5 h-5" /><span>Accept</span></span>
              <span className="flex text-red-600 border rounded-sm border-red-600 px-2 py-1 gap-x-1"><IoClose className="w-5 h-5" />Decline</span>
            </Table.Cell>
          </Table.Row>
          
          <Table.Row className="bg-white">
            {(isCompleted || isInvited) && (
              <Table.Cell>ayve111</Table.Cell>
            )}
            {(isCompleted || isScheduled) && (
              <Table.Cell>abir111</Table.Cell>
            )}
            <Table.Cell>Test Appointment</Table.Cell>
            <Table.Cell>23-10-204</Table.Cell>
            <Table.Cell>10:00 AM</Table.Cell>
            <Table.Cell>15m</Table.Cell>
            <Table.Cell className="flex gap-x-1">
              <span className="flex text-blue-500 border rounded-sm border-blue-500 px-2 py-1 gap-x-1"><MdPendingActions className="w-5 h-5" /><span>Pending</span></span>
              <span className="flex text-gray-600 border rounded-sm border-gray-600 px-2 py-1 gap-x-1"><TbClockCancel className="w-5 h-5" />Cancel</span>
            </Table.Cell>
          </Table.Row>

          <Table.Row className="bg-white">
            {(isCompleted || isInvited) && (
              <Table.Cell>ayve178</Table.Cell>
            )}
            {(isCompleted || isScheduled) && (
              <Table.Cell>abir123</Table.Cell>
            )}
            <Table.Cell>Test Appointment</Table.Cell>
            <Table.Cell>23-10-204</Table.Cell>
            <Table.Cell>10:00 AM</Table.Cell>
            <Table.Cell>15m</Table.Cell>
            <Table.Cell className="flex gap-x-1">
              <span className="flex text-purple-600 border rounded-sm border-purple-600 px-2 py-1 gap-x-1"><LuCalendarCheck2 className="w-5 h-5" /><span>Completed</span></span>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default Appointments;
