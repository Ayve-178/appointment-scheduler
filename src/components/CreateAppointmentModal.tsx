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
  handleCloseModal: () => void;
  schedulerName: string;
  holderName: string;
  handleAppointmentCreate: any;
}

const CreateAppointmentModal: React.FC<CreateAppointmentModalProps> = ({
  openModal,
  handleCloseModal,
  schedulerName,
  holderName,
  handleAppointmentCreate,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
    duration: null,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const handleChange = (e: any) => {
    if (!e.target) return;
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

  const handleFileDelete = () => {
    setSelectedFile(null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.date ||
      !formData.time ||
      formData.duration === null
    ) {
      setWarning("Please fill out all the necessary fields!");
      return;
    }

    handleAppointmentCreate(formData, selectedFile);
    setFormData({
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      time: "",
      duration: null,
    });
    setSelectedFile(null);
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
              <TextInput id="scheduler" value={schedulerName} readOnly />
            </div>
            <div>
              <div className="block">
                <Label htmlFor="holder" value="Holder" />
              </div>
              <TextInput id="holder" value={holderName} readOnly />
            </div>
          </div>
          <div>
            <TextInput
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Textarea
              id="description"
              name="description"
              className="resize-none"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-x-2">
            <Datepicker
              name="date"
              minDate={new Date()}
              value={formData.date ? new Date(formData.date) : null}
              onChange={(date: Date | null) =>
                handleChange({ target: { name: "date", value: date } })
              }
            />
            <TimePicker
              name="time"
              time={formData.time}
              onTimeChange={handleChange}
            />
            <TextInput
              id="duration"
              name="duration"
              type="number"
              placeholder="Duration (m)"
              value={formData.duration ?? ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex text-gray-500" onClick={handleClick}>
            {(selectedFile && (
              <div className="flex border-2 px-2 py-1 rounded-md">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedFile?.name}
                </p>
                <TiDelete
                  className="text-gray-500 ml-1 mt-0.5 cursor-pointer"
                  onClick={handleFileDelete}
                />
              </div>
            )) || (
              <div className="flex cursor-pointer">
                <FileInput
                  ref={fileInputRef}
                  name="audioFile"
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
            <Button className="bg-gray-800 w-32" onClick={handleSubmit}>
              Schedule
            </Button>
          </div>
          {warning && <p className="text-sm text-red-600 text-center mt-3">{warning}</p>}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateAppointmentModal;
