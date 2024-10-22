import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { createAppointment } from "../config/firestoreConfig";

const CreateAppointment: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const schedulerUid = location.state?.uid;
  const holderUid = currentUser?.uid || "";
console.log('hold..........',holderUid);
  const [formData, setFormData] = useState({
    schedulerUid: schedulerUid,
    holderUid: holderUid,
    title: "",
    description: "",
    date: "",
    time: "",
    audioFileUrl: "",
  });

  const handleChange = (e: any) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const form = new FormData();
    form.append("schedulerUid", formData.schedulerUid);
    form.append("holderUid", formData.holderUid);
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("date", formData.date);
    form.append("time", formData.time);
    if (formData.audioFileUrl) {
      form.append("file", formData.audioFileUrl);
    }

    console.log([...form.entries()]);
    createAppointment({
      schedulerUid: formData.schedulerUid,
      holderUid: formData.holderUid,
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      audioFileUrl: formData.audioFileUrl,
    });
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <>
      {" "}
      {currentUser && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          <input
            type="text"
            name="time"
            value={formData.date}
            onChange={handleChange}
          />
          <input type="file" name="file" onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
};

export default CreateAppointment;
