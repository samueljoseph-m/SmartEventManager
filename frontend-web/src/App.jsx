// Import necessary components from react-router-dom for routing
import { Routes, Route, Navigate } from "react-router-dom";

// Import page components
import Intro from './pages/Intro'; // New introductory page
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import DepartmentHeadDashboard from './pages/DepartmentHeadDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import SupervisorDashboard from './pages/SupervisorDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import UserDashboard from './pages/UserDashboard';
import CreateUser from './pages/CreateUser';
import UserList from './pages/UserList';
import EventList from './pages/EventList';
import CreateEvent from './pages/CreateEvent';
import Profile from './pages/Profile';

// Import the useAuth hook to access authentication state
import { useAuth } from './components/AuthContext';

function App() {
  // Get authentication state from context
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Intro />} /> {/* Default route is now the introductory page */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Protected routes */}
      <Route
        path="/admin-dashboard"
        element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/department-head-dashboard"
        element={isAuthenticated ? <DepartmentHeadDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/manager-dashboard"
        element={isAuthenticated ? <ManagerDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/supervisor-dashboard"
        element={isAuthenticated ? <SupervisorDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/volunteer-dashboard"
        element={isAuthenticated ? <VolunteerDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/user-dashboard"
        element={isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/create-user"
        element={isAuthenticated ? <CreateUser /> : <Navigate to="/login" />}
      />
      <Route
        path="/users"
        element={isAuthenticated ? <UserList /> : <Navigate to="/login" />}
      />
      <Route
        path="/events"
        element={isAuthenticated ? <EventList /> : <Navigate to="/login" />}
      />
      <Route
        path="/create-event"
        element={isAuthenticated ? <CreateEvent /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;