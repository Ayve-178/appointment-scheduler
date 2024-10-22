/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import { createAppointment } from "../config/firestoreConfig";
import TimePicker from "./TimePicker";
import { HiUpload } from "react-icons/hi";
import { TiDelete } from "react-icons/ti";

interface CreateAppointmentModalProps {
  openModal: boolean;
  handleCloseModal: any;
  schedulerName: any;
  holderName: any;
}

const CreateAppointmentModal: React.FC<CreateAppointmentModalProps> = ({
  openModal,
  handleCloseModal,
  schedulerName,
  holderName,
}) => {
  const [formData, setFormData] = useState({
    schedulerName: schedulerName,
    holderName: holderName,
    title: "",
    description: "",
    date: new Date(),
    time: "",
    duration: "",
    audioFileUrl: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: any) => {
    if (!e.target) return;
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
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

  const handleSubmit = (e: any) => {
    e.preventDefault();

    createAppointment({
      schedulerUid: formData.schedulerName,
      holderUid: formData.holderName,
      title: formData.title,
      description: formData.description,
      //@ts-ignore
      date: formData.date,
      time: formData.time,
      duration: formData.duration,
      //@ts-ignore
      audioFileUrl: selectedFile,
    });
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
              value={formData.date}
              onChange={handleChange}
            />
            <TimePicker name="time" time={formData.time} onTimeChange={handleChange} />
            <TextInput
              id="duration"
              name="duration"
              type="text"
              placeholder="Duration"
              value={formData.duration}
              onChange={handleChange}
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
            <Button className="bg-gray-800 w-32" onClick={handleSubmit}>Schedule</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateAppointmentModal;
