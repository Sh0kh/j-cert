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




function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/portfolio" element={<Portfolio/>} />
        <Route path="/example/UI" element={<UI />} />
        <Route path="/" element={<AppLayout />}>
          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/user" element={<AdminUser />} />
            <Route path="/admin/file" element={<AdminFile />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
