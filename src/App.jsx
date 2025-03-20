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
import Portfolio from "./Pages/Portfolio";
import "bootstrap-icons/font/bootstrap-icons.css";



function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
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
