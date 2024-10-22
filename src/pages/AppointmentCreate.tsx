import { useState } from "react";
import CreateAppointmentModal from "../components/CreateAppointmentModal";

const AppointmentCreate: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => {
        setOpenModal(false);
    }
    return (
        <>
            <button onClick={(() => setOpenModal(!openModal))}>Schedule Appointment</button>
            <CreateAppointmentModal openModal={openModal} handleCloseModal={handleCloseModal} />
        </>
    )
}

export default AppointmentCreate;