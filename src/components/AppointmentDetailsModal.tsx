import { Modal } from "flowbite-react";
interface AppointmentDetailsModalProps {
  openModal: boolean;
  handleCloseModal: () => void;
  appointment: {
    title: string;
    description: string;
    audioFileUrl?: string;
  };
}

const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
  openModal,
  handleCloseModal,
  appointment,
}) => {
  return (
    <Modal show={openModal} onClose={handleCloseModal} size="md" popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-4">
          <p>
            <strong>Title:</strong> {appointment.title}
          </p>
          <p>
            <strong>Description:</strong> {appointment.description}
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
