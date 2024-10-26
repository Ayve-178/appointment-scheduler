/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useLocation } from "react-router-dom";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  getPastSessions,
  getReceivedInvitations,
  getScheduledSessions,
  getSentInvitations,
  getUsernameByUid,
} from "../config/firestoreConfig";
import AppointmentStatus from "../components/AppointmentStatus";
import { Timestamp } from "firebase/firestore";
import { updateAppointmentStatusQuery } from "../config/firestoreConfig";
import { Datepicker, Dropdown } from "flowbite-react";

const Appointments: React.FC = () => {
  const location = useLocation();
  const { category } = location.state || {};
  const { currentUser } = useAuth();
  const [username, setUsername] = useState(null);
  const [appointmentList, setAppointmentList] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filteredDate, setFilteredDate] = useState<Date | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("All");


  const getAppointmentStatus = (category: string, appointment: any) => {
    if (category === "past") {
      return (
        <AppointmentStatus
          updateStatus={updateAppointmentStatus}
          id={appointment.id}
          status={appointment.status}
        />
      );
    } else if (category === "scheduled") {
      return (
        <AppointmentStatus
          updateStatus={updateAppointmentStatus}
          id={appointment.id}
          status="accepted"
        />
      );
    } else if (category === "invite_received") {
      if (appointment.status === "pending") {
        return (
          <>
            <AppointmentStatus
              updateStatus={updateAppointmentStatus}
              id={appointment.id}
              status="accept"
            />
            <AppointmentStatus
              updateStatus={updateAppointmentStatus}
              id={appointment.id}
              status="decline"
            />
          </>
        );
      } else {
        return (
          <AppointmentStatus
            updateStatus={updateAppointmentStatus}
            id={appointment.id}
            status={appointment.status}
          />
        );
      }
    } else if (category === "invite_sent") {
      if (appointment.status === "pending") {
        return (
          <>
            <AppointmentStatus
              updateStatus={updateAppointmentStatus}
              id={appointment.id}
              status="pending"
            />
            <AppointmentStatus
              updateStatus={updateAppointmentStatus}
              id={appointment.id}
              status="cancel"
            />
          </>
        );
      } else if (appointment.status === "cancelled") {
        return (
          <AppointmentStatus
            updateStatus={updateAppointmentStatus}
            id={appointment.id}
            status={appointment.status}
          />
        );
      } else {
        return (
          <>
            <AppointmentStatus
              updateStatus={updateAppointmentStatus}
              id={appointment.id}
              status={appointment.status}
            />
            <AppointmentStatus
              updateStatus={updateAppointmentStatus}
              id={appointment.id}
              status="cancel"
            />
          </>
        );
      }
    }
  };

  const fetchPastSessions = async () => {
    //@ts-ignore
    const fetchedAppointments = await getPastSessions(username);
    console.log(fetchedAppointments);
    //@ts-ignore
    setAppointmentList(fetchedAppointments);
  };

  const fetchScheduledSessions = async () => {
    //@ts-ignore
    const fetchedAppointments = await getScheduledSessions(username);
    console.log(fetchedAppointments);
    //@ts-ignore
    setAppointmentList(fetchedAppointments);
  };

  const fetchReceivedInvitations = async () => {
    //@ts-ignore
    const fetchedAppointments = await getReceivedInvitations(username);
    console.log(fetchedAppointments);
    //@ts-ignore
    setAppointmentList(fetchedAppointments);
    //@ts-ignore
    setFilteredAppointments(fetchedAppointments);
  };

  const fetchSentInvitations = async () => {
    //@ts-ignore
    const fetchedAppointments = await getSentInvitations(username);
    console.log(fetchedAppointments);
    //@ts-ignore
    setAppointmentList(fetchedAppointments);
  };

  const getCurrentUserName = async () => {
    //@ts-ignore
    const currentUserName = await getUsernameByUid(currentUser.uid);
    console.log(currentUserName);
    setUsername(currentUserName);
  };

  const getDate = (date: Date | string | Timestamp) => {
    const validDate =
      date instanceof Timestamp
        ? date.toDate()
        : typeof date === "string"
        ? new Date(date)
        : date;
    const dateNew = `${validDate.getFullYear()}-${String(
      validDate.getMonth() + 1
    ).padStart(2, "0")}-${String(validDate.getDate()).padStart(2, "0")}`;
    return dateNew;
  };

  const handleDateChange = (date: Date | null) => {
    setFilteredDate(date);

    //@ts-ignore
    setFilteredAppointments(
      filteredAppointments.filter(
        (appointment) =>
          //@ts-ignore
          appointment.date.toDate().toDateString() === date?.toDateString()
      )
    );
  };

  const updateAppointmentStatus = async (
    appointmentId: string,
    updatedStatus: string
  ) => {
    try {
      await updateAppointmentStatusQuery(appointmentId, updatedStatus);
      console.log(`Status updated to ${updatedStatus}`);

      //@ts-ignore
      setAppointmentList((prevAppointments) =>
        prevAppointments.map((appointment) =>
          //@ts-ignore
          appointment.id === appointmentId
            ? //@ts-ignore
              { ...appointment, status: updatedStatus }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  const onDropDownChange = (status:string) => {
    setSelectedStatus(status);

    console.log('......', status);

    const filteredList = status === "all"
      ? appointmentList
      : filteredAppointments.filter(appointment => appointment.status === status);
    
    setFilteredAppointments(filteredList);
  };


  useEffect(() => {
    if (category === "past") {
      fetchPastSessions();
    } else if (category === "scheduled") {
      fetchScheduledSessions();
    } else if (category === "invite_received") {
      fetchReceivedInvitations();
    } else if (category === "invite_sent") {
      fetchSentInvitations();
    }
  }, [category, username]);

  useEffect(() => {
    getCurrentUserName();
  }, [currentUser]);

  return (
    <div className="overflow-x-auto p-10">
      {(filteredAppointments && filteredAppointments.length > 0 && (
        <div>
          <Datepicker
            name="date"
            placeholder="Select Date"
            value={filteredDate ? new Date(filteredDate) : null}
            onChange={handleDateChange}
          />
          <Dropdown
      label={selectedStatus} // Show current selection in button
      dismissOnClick={false}
      className="bg-gray-900 text-white" // Customize dropdown background and font color
    >
      <Dropdown.Item
        onClick={() => onDropDownChange('all')}     className={selectedStatus === "all" ? "bg-blue-500 text-white" : "text-gray-200"}
      >
        All
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => onDropDownChange('pending')} 
        className={selectedStatus === "pending" ? "bg-blue-500 text-white" : "text-gray-200"}
      >
        Pending
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => onDropDownChange('accepted')} 
        className={selectedStatus === "accepted" ? "bg-blue-500 text-white" : "text-gray-200"}
      >
        Accepted
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => onDropDownChange('declined')} 
        className={selectedStatus === "declined" ? "bg-blue-500 text-white" : "text-gray-200"}
      >
        Declined
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => onDropDownChange('cancelled')} 
        className={selectedStatus === "cancelled" ? "bg-blue-500 text-white" : "text-gray-200"}
      >
        Cancelled
      </Dropdown.Item>
    </Dropdown>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Scheduler</Table.HeadCell>
              <Table.HeadCell>Holder</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Time</Table.HeadCell>
              <Table.HeadCell>Duration</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {appointmentList.length > 0 && appointmentList.map((appointment: any) => (
                <Table.Row className="bg-white">
                  <Table.Cell>{appointment.schedulerName}</Table.Cell>
                  <Table.Cell>{appointment.holderName}</Table.Cell>
                  <Table.Cell>{appointment.title}</Table.Cell>
                  <Table.Cell>{getDate(appointment.date)}</Table.Cell>
                  <Table.Cell>{appointment.time}</Table.Cell>
                  <Table.Cell>{appointment.duration}</Table.Cell>
                  <Table.Cell className="flex gap-x-1">
                    {getAppointmentStatus(category, appointment)}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )) || <div>No data available</div>}
    </div>
  );
};

export default Appointments;
