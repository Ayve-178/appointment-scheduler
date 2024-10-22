import React, { useState, useRef } from "react";
import {
  Modal,
  Label,
  TextInput,
  Textarea,
  Datepicker,
  FileInput,
  Button,
} from "flowbite-react";
import TimePicker from "./TimePicker";
import { HiUpload } from "react-icons/hi";
import { TiDelete } from "react-icons/ti";

interface CreateAppointmentModalProps {
  openModal: boolean;
  handleCloseModal: any;
}

const CreateAppointmentModal: React.FC<CreateAppointmentModalProps> = ({
  openModal,
  handleCloseModal,
}) => {
  const [time, setTime] = useState<string>("00:00");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log("File selected:", file);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  return (
    <Modal show={openModal} onClose={handleCloseModal} size="md" popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-center text-gray-900">
            Appointment Form
          </h3>
          <div className="flex gap-x-4">
            <div>
              <div className="block">
                <Label htmlFor="scheduler" value="Scheduler" />
              </div>
              <TextInput id="scheduler" value="Scheduler Name" readOnly />
            </div>
            <div>
              <div className="block">
                <Label htmlFor="holder" value="Holder" />
              </div>
              <TextInput id="holder" value="Holder Name" readOnly />
            </div>
          </div>
          <div>
            <TextInput id="title" type="text" placeholder="Title" required />
          </div>
          <div>
            <Textarea id="description" placeholder="Description" required />
          </div>
          <div className="flex gap-x-2">
            <Datepicker minDate={new Date()} />
            <TimePicker time={time} onTimeChange={handleTimeChange} />
            <TextInput
              id="duration"
              type="text"
              placeholder="Duration"
              required
            />
          </div>
          <div className="flex text-gray-500" onClick={handleClick}>
            {(selectedFile && (
              <>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {selectedFile.name}
                </p>
                <TiDelete className="text-gray-500 mt-3 ml-1" />
              </>
            )) || (
              <div className="flex cursor-pointer">
                <FileInput
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  accept="audio/*"
                />

                <HiUpload className="w-5 h-5 mt-1 mr-1" />
                <span>Upload an audio file</span>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button className="bg-gray-800 w-32">Schedule</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateAppointmentModal;
