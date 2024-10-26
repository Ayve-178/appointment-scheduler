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

const Appointments: React.FC = () => {
  const location = useLocation();
  const { category } = location.state || {};
  const { currentUser } = useAuth();
  const [username, setUsername] = useState(null);
  const [appointmentList, setAppointmentList] = useState([]);

  const getAppointmentStatus = (category: string, appointment: any) => {
    if (category === "past") {
      return <AppointmentStatus updateStatus={updateAppointmentStatus} id={appointment.id} status={appointment.status} />;
    } else if (category === "scheduled") {
      return <AppointmentStatus updateStatus={updateAppointmentStatus} id={appointment.id} status="accepted" />;
    } else if (category === 'invite_received') {
      if (appointment.status === "pending") {
        return <><AppointmentStatus updateStatus={updateAppointmentStatus} id={appointment.id} status="accept" /><AppointmentStatus updateStatus={updateAppointmentStatus} id={appointment.id} status="decline" /></>
      } else {
        return <AppointmentStatus updateStatus={updateAppointmentStatus} id={appointment.id} status={appointment.status} />;
      }
    } else if (category === 'invite_sent') {
      if (appointment.status === "pending") {
        return <><AppointmentStatus updateStatus={updateAppointmentStatus} id={appointment.id} status="pending" /><AppointmentStatus updateStatus={updateAppointmentStatus} id={appointment.id} status="cancel" /></>
      } else if (appointment.status === "cancelled") {
        return <AppointmentStatus updateStatus={updateAppointmentStatus} id={appointment.id} status={appointment.status} />;
      } else {
        return <><AppointmentStatus updateStatus={updateAppointmentStatus} id={appointment.id} status={appointment.status} /><AppointmentStatus updateStatus={updateAppointmentStatus} id={appointment.id} status="cancel" /></>
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

  const updateAppointmentStatus = async (appointmentId:string, updatedStatus:string) => {
    try {
      await updateAppointmentStatusQuery(appointmentId, updatedStatus);
      console.log(`Status updated to ${updatedStatus}`);

      //@ts-ignore
      setAppointmentList((prevAppointments) =>
        prevAppointments.map((appointment) =>
          //@ts-ignore
          appointment.id === appointmentId
          //@ts-ignore
            ? { ...appointment, status: updatedStatus }
            : appointment
        )
      );

    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  }

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
      {(appointmentList && appointmentList.length > 0 && (
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
            {appointmentList.map((appointment: any) => (
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
      )) || <div>No data available</div>}
    </div>
  );
};

export default Appointments;
