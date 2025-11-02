import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CityDetails from "./pages/CityDetails";
import Login from './pages/Login'
import { ProtectedRoute } from "./router";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/city/:name" element={
           <ProtectedRoute>
              <CityDetails />
           </ProtectedRoute>
          } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
