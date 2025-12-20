import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the bouncer

// Temporary Dashboard Components with Logout Button
import { logoutUser } from "./services/auth.services";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ role }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Welcome {role}!</h1>
      <button 
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          
          {/* PROTECTED ADMIN ROUTE */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Dashboard role="Admin" />
              </ProtectedRoute>
            } 
          />

          {/* PROTECTED STAFF ROUTE */}
          <Route 
            path="/staff/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['staff', 'admin']}>
                <Dashboard role="Staff" />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;