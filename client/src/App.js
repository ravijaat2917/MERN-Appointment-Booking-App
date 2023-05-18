import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./Components/Spinner";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import PublicRoute from "./Components/PublicRoute";
import ApplyDoctor from "./Pages/ApplyDoctor";
import Appointments from "./Pages/Appointments";
import AdminProfile from "./Pages/Doctor/Profile";
import NotificationPage from "./Pages/NotificationPage";
import Users from "./Pages/Admin/Users";
import Doctors from "./Pages/Admin/Doctors";
import BookinPage from "./Pages/BookinPage";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <HomePage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoutes>
                  <NotificationPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoutes>
                  <Users />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/doctors"
              element={
                <ProtectedRoutes>
                  <Doctors />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/apply-doctor"
              element={
                <ProtectedRoutes>
                  <ApplyDoctor />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoutes>
                  <Appointments />
                </ProtectedRoutes>
              }
              />
              <Route
              path="/book-appointment/:doctorId"
              element={
                <ProtectedRoutes>
                  <BookinPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/doctor/profile/:id"
              element={
                <ProtectedRoutes>
                  <AdminProfile />
                </ProtectedRoutes>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
