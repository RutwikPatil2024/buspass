import { useState } from "react";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";

const AdminPage = () => {
  const [admin, setAdmin] = useState(null);

  const handleLogin = (adminData: any) => {
    setAdmin(adminData);
  };

  const handleLogout = () => {
    setAdmin(null);
  };

  if (!admin) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <AdminDashboard 
      admin={admin}
      onLogout={handleLogout}
    />
  );
};

export default AdminPage;