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

  const getCurrentUserName = async () => {
    //@ts-ignore
    const currentUserName = await getUsernameByUid(currentUser.uid);
    setUsername(currentUserName);
  };

  const fetchSessions = async (type:string) => {
    let fetchedAppointments;
    if (type === 'past') {
      fetchedAppointments = await getPastSessions(username || '');
    } else if (type === 'scheduled') {
      fetchedAppointments = await getScheduledSessions(username || '');
    } else if (type === 'invite_received') {
      fetchedAppointments = await getReceivedInvitations(username || '');
    } else if (type === 'invite_sent') {
      fetchedAppointments = await getSentInvitations(username || '');
    } 
    //@ts-ignore
    setAppointmentList(fetchedAppointments);
    //@ts-ignore
    setFilteredAppointments(fetchedAppointments);
  };

  const updateAppointmentStatus = async (
    appointmentId: string,
    updatedStatus: string
  ) => {
    try {
      await updateAppointmentStatusQuery(appointmentId, updatedStatus);

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

  const getAppointmentStatus = (category: string, appointment: any) => {
    const { id, status } = appointment;
  
    const renderStatus = (statuses: string[]) => (
      <>
        {statuses.map((s) => (
          <AppointmentStatus key={`${id}-${s}`} updateStatus={updateAppointmentStatus} id={id} status={s} />
        ))}
      </>
    );
  
    switch (category) {
      case "past":
        return renderStatus([status]);
  
      case "scheduled":
        return renderStatus(["accepted"]);
  
      case "invite_received":
        return status === "pending" ? renderStatus(["accept", "decline"]) : renderStatus([status]);
  
      case "invite_sent":
        if (status === "pending") {
          return renderStatus(["pending", "cancel"]);
        } else if (status === "cancelled") {
          return renderStatus([status]);
        } else {
          return renderStatus([status, "cancel"]);
        }
  
      default:
        return null;
    }
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
  }

  const handleDropDownChange = (status:string) => {
    setSelectedStatus(status);
  };

  const conditionFilter = () => {
    if (filteredDate === null && selectedStatus === 'all') {
      setFilteredAppointments(appointmentList);
      return;
    }
  
    const filtered = appointmentList.filter((appointment) => {
      const appointmentDate = appointment.date.toDate();
      const updatedFilteredDate = getDate(filteredDate);
  
      if (updatedFilteredDate && appointmentDate.toISOString().slice(0, 10) !== updatedFilteredDate) {
        console.log('datesssssssssss', appointmentDate.toISOString().slice(0, 10), '----------', updatedFilteredDate)
        return false; 
      }
  
      if (selectedStatus && selectedStatus !== 'all' && appointment.status !== selectedStatus) {
        console.log(selectedStatus, appointment.status);
        return false; 
      }
  
      return true; 
    });
  
    console.log('###############', filtered);
    setFilteredAppointments(filtered);
  };  
  
  useEffect(() => {
    getCurrentUserName();
  }, [currentUser]);

  useEffect(() => {
    fetchSessions(category);
  }, [category, username]);

  useEffect(() => {
    conditionFilter();
  }, [selectedStatus, filteredDate]);

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
      label={selectedStatus} 
      dismissOnClick={false}
      className="bg-gray-900 text-white"
    >
      <Dropdown.Item
        onClick={() => handleDropDownChange('all')}     className={selectedStatus === "all" ? "bg-blue-500 text-white" : "text-gray-200"}
      >
        All
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => handleDropDownChange('pending')} 
        className={selectedStatus === "pending" ? "bg-blue-500 text-white" : "text-gray-200"}
      >
        Pending
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => handleDropDownChange('accepted')} 
        className={selectedStatus === "accepted" ? "bg-blue-500 text-white" : "text-gray-200"}
      >
        Accepted
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => handleDropDownChange('declined')} 
        className={selectedStatus === "declined" ? "bg-blue-500 text-white" : "text-gray-200"}
      >
        Declined
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => handleDropDownChange('cancelled')} 
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
              {filteredAppointments.length > 0 && filteredAppointments.map((appointment: any) => (
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