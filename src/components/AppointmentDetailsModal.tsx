import { Modal } from "flowbite-react";
import { Timestamp } from "firebase/firestore";
interface AppointmentDetailsModalProps {
  openModal: boolean;
  handleCloseModal: () => void;
  appointment: {
    schedulerName: string;
    holderName: string;
    title: string;
    description: string;
    date: Date,
    time: string;
    audioFileUrl?: string;
  };
}

const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
  openModal,
  handleCloseModal,
  appointment,
}) => {

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

  return (
    <Modal show={openModal} onClose={handleCloseModal} size="md" popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-4">
          <p>
            <strong>Title:</strong> {appointment.title}
          </p>
          <p>
            <strong>Scheduler:</strong> {appointment.schedulerName}
          </p>
          <p>
            <strong>Holder:</strong> {appointment.holderName}
          </p>
          <p>
            <strong>Description:</strong> {appointment.description}
          </p>
          <p>
            <strong>Date:</strong> {getDate(appointment.date)}
          </p>
          <p>
            <strong>Time:</strong> {appointment.time}
          </p>
          {appointment.audioFileUrl && (
            <div className="mt-4">
              <p>
                <strong>Recording:</strong>
              </p>
              <audio controls src={appointment.audioFileUrl} className="w-full">
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AppointmentDetailsModal;
