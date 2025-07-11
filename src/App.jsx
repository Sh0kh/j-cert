import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import MainLayout from "./layouts/MainLayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./Components/ProtectedRoute"; // Импорт компонента защиты маршрутов
import UI from "./Pages/UI";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHome from "./Pages/AdminPages/AdminHome";
import AdminUser from "./Pages/AdminPages/AdminUser";
import AdminFile from "./Pages/AdminPages/AdminFile";
import ErrorPage from "./Pages/ErrorPage";
import Portfolio from "./Pages/Portfolio";
import "bootstrap-icons/font/bootstrap-icons.css";
import Register from "./Pages/Register";
import CheckPage from "./Pages/CheckPage";
import AdminTime from "./Pages/AdminPages/AdminTime";
import UserInfo from "./Pages/UserInfo";
import QRFile from "./Components/AdminComponents/AdminQRFile/QRFile";
import QrFileCreate from "./Components/AdminComponents/AdminQRFile/QrFileCreate";




function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/example/UI" element={<UI />} />
        <Route path="/" element={<AppLayout />}>
          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/qrfile" element={<QRFile />} />
            <Route path="/admin/qrfile/create" element={<QrFileCreate />} />
            <Route path="/admin/user" element={<AdminUser />} />
            <Route path="/admin/file" element={<AdminFile />} />
            <Route path='/admin/time' element={<AdminTime />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/register" element={<Register />} />
            <Route path='/check' element={<CheckPage />} />
            <Route path='/user/result/:ID' element={<UserInfo />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
