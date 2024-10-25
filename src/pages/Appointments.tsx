/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useLocation } from "react-router-dom";
import { Table } from "flowbite-react";
import { MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdPendingActions } from "react-icons/md";
import { TbClockCancel } from "react-icons/tb";
import AppointmentStatus from "../components/AppointmentStatus";
import { useState } from "react";
import { getAppointmentsByCondition } from "../config/firestoreConfig";
import { useAuth } from "../contexts/AuthContext";

const Appointments: React.FC = () => {
  const location = useLocation();
  const { category } = location.state || {}; 
  const {currentUser} = useAuth();
  const [appointmentList, setAppointmentList] = useState([]);
  console.log(category, appointmentList, "---------ap-----------");

  const fetchAppointments = async () => {
    const fetchedAppointments = await getAppointmentsByCondition(
      category,
      currentUser.uid,
    );
    //@ts-ignore
    setAppointmentList(fetchedAppointments);
  };

  if (category) {
    fetchAppointments();
  }

  return (
    <div className="overflow-x-auto p-10">
      <Table hoverable>
        <Table.Head>
          {(category === "completed" || category === "invited") && (
            <Table.HeadCell>Scheduler</Table.HeadCell>
          )}
          {(category === "completed" || category === "invited") && (
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
            {(category === "completed" || category === "invited") && <Table.Cell>ayve178</Table.Cell>}
            {(category === "completed" || category === "scheduled") && <Table.Cell>abir123</Table.Cell>}
            <Table.Cell>Test Appointment</Table.Cell>
            <Table.Cell>23-10-204</Table.Cell>
            <Table.Cell>10:00 AM</Table.Cell>
            <Table.Cell>15m</Table.Cell>
            <Table.Cell className="flex gap-x-1">
              <span className="flex text-green-500 border rounded-sm border-green-500 px-2 py-1 gap-x-1">
                <MdOutlineDone className="w-5 h-5" />
                <span>Accept</span>
              </span>
              <span className="flex text-red-600 border rounded-sm border-red-600 px-2 py-1 gap-x-1">
                <IoClose className="w-5 h-5" />
                Decline
              </span>
            </Table.Cell>
          </Table.Row>

          <Table.Row className="bg-white">
            {(category === "completed" || category === "invited") && <Table.Cell>ayve111</Table.Cell>}
            {(category === "completed" || category === "scheduled") && <Table.Cell>abir111</Table.Cell>}
            <Table.Cell>Test Appointment</Table.Cell>
            <Table.Cell>23-10-204</Table.Cell>
            <Table.Cell>10:00 AM</Table.Cell>
            <Table.Cell>15m</Table.Cell>
            <Table.Cell className="flex gap-x-1">
              <span className="flex text-blue-500 border rounded-sm border-blue-500 px-2 py-1 gap-x-1">
                <MdPendingActions className="w-5 h-5" />
                <span>Pending</span>
              </span>
              <span className="flex text-gray-600 border rounded-sm border-gray-600 px-2 py-1 gap-x-1">
                <TbClockCancel className="w-5 h-5" />
                Cancel
              </span>
            </Table.Cell>
          </Table.Row>

          <Table.Row className="bg-white">
            {(category === "completed" || category === "invited") && <Table.Cell>ayve178</Table.Cell>}
            {(category === "completed" || category === "scheduled") && <Table.Cell>abir123</Table.Cell>}
            <Table.Cell>Test Appointment</Table.Cell>
            <Table.Cell>23-10-204</Table.Cell>
            <Table.Cell>10:00 AM</Table.Cell>
            <Table.Cell>15m</Table.Cell>
            <Table.Cell className="flex gap-x-1">
              <AppointmentStatus status="completed" />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default Appointments;
