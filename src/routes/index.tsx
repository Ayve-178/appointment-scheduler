import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import NotFound from '../pages/NotFound';
import Users from '../pages/Users';
import AppointmentForm from '../pages/AppointmentCreate';
import Appointments from '../pages/Appointments';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/users" element={<Users />} />      
      <Route path="/createAppointment" element={<AppointmentForm />} />      
      <Route path="/appointments" element={<Appointments />} />      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
