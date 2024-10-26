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
} from "../config/firestoreRepos";
import AppointmentStatus from "../components/AppointmentStatus";
import { Timestamp } from "firebase/firestore";
import { updateAppointmentStatusQuery } from "../config/firestoreRepos";
import { Datepicker, Dropdown } from "flowbite-react";
import AppointmentDetailsModal from "../components/AppointmentDetailsModal";

const Appointments: React.FC = () => {
  const location = useLocation();
  const { category } = location.state || {};
  const { currentUser } = useAuth();
  const [username, setUsername] = useState(null);
  const [appointmentList, setAppointmentList] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filteredDate, setFilteredDate] = useState<Date | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointment, setAppointment] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getCurrentUserName = async () => {
    //@ts-ignore
    const currentUserName = await getUsernameByUid(currentUser.uid);
    setUsername(currentUserName);
  };

  const fetchSessions = async (type: string) => {
    let fetchedAppointments;
    if (type === "past") {
      fetchedAppointments = await getPastSessions(username || "");
    } else if (type === "scheduled") {
      fetchedAppointments = await getScheduledSessions(username || "");
    } else if (type === "invite_received") {
      fetchedAppointments = await getReceivedInvitations(username || "");
    } else if (type === "invite_sent") {
      fetchedAppointments = await getSentInvitations(username || "");
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
          <AppointmentStatus
            key={`${id}-${s}`}
            updateStatus={updateAppointmentStatus}
            id={id}
            status={s}
          />
        ))}
      </>
    );

    switch (category) {
      case "past":
        return renderStatus([status]);

      case "scheduled":
        return renderStatus(["accepted"]);

      case "invite_received":
        return status === "pending"
          ? renderStatus(["accept", "decline"])
          : renderStatus([status]);

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
  };

  const handleDropDownChange = (status: string) => {
    setSelectedStatus(status);
  };

  const conditionFilter = () => {
    if (filteredDate === null && selectedStatus === "all") {
      setFilteredAppointments(appointmentList);
      return;
    }

    const filtered = appointmentList.filter((appointment) => {
      if (filteredDate) {
        const appointmentDate = appointment.date.toDate();
        const updatedFilteredDate = getDate(filteredDate);
    
        if (updatedFilteredDate && appointmentDate.toISOString().slice(0, 10) !== updatedFilteredDate) {
          return false; 
        }
      }
      
      if (selectedStatus && selectedStatus !== 'all' && appointment.status !== selectedStatus) {
        return false; 
      }
  
      return true; 
    });

    setFilteredAppointments(filtered);
  };

  const handleShowDetails = (appointment: any) => {
    setAppointment(appointment);
    openModal();
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
      <div className="flex gap-x-3 justify-end mb-4 text-center">
        <Datepicker
          name="date"
          placeholder="Select Date"
          value={filteredDate ? new Date(filteredDate) : null}
          onChange={handleDateChange}
        />
        <Dropdown
          label={
            <span className="text-gray-800 border-gray-800">
              {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
            </span>
          }
          dismissOnClick={false}
          inline
        >
          {["all", "pending", "accepted", "declined", "cancelled"].map(
            (status) => (
              <Dropdown.Item
                key={status}
                onClick={() => handleDropDownChange(status)}
                className={
                  selectedStatus === status
                    ? "bg-gray-800 text-white"
                    : "text-gray-900"
                }
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Dropdown.Item>
            )
          )}
        </Dropdown>
      </div>
      {(filteredAppointments && filteredAppointments.length > 0 && (
        <Table hoverable>
          <Table.Head className="text-center">
            <Table.HeadCell className="hidden md:table-cell">Scheduler</Table.HeadCell>
            <Table.HeadCell className="hidden md:table-cell">Holder</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell className="hidden md:table-cell">Date</Table.HeadCell>
            <Table.HeadCell className="hidden md:table-cell">Time</Table.HeadCell>
            <Table.HeadCell className="hidden md:table-cell">Duration</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y text-center">
            {filteredAppointments.length > 0 &&
              filteredAppointments.map((appointment: any) => (
                <Table.Row className="bg-white">
                  <Table.Cell className="hidden md:table-cell">{appointment.schedulerName}</Table.Cell>
                  <Table.Cell className="hidden md:table-cell">{appointment.holderName}</Table.Cell>
                  <Table.Cell className="cursor-pointer underline" onClick={() => handleShowDetails(appointment)}>
                    {appointment.title}
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">{getDate(appointment.date)}</Table.Cell>
                  <Table.Cell className="hidden md:table-cell">{appointment.time}</Table.Cell>
                  <Table.Cell className="hidden md:table-cell">{appointment.duration}</Table.Cell>
                  <Table.Cell className="flex gap-x-1 justify-center content-center">
                    {getAppointmentStatus(category, appointment)}
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      )) || <div className="text-center font-semibold">NO DATA AVAILABLE</div>}

      {isModalOpen && (
        <AppointmentDetailsModal
          openModal={isModalOpen}
          handleCloseModal={closeModal}
          appointment={appointment}
        />
      )}
    </div>
  );
};

export default Appointments;
