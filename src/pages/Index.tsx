
import { useState } from "react";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { MemberDashboard } from "@/components/member/MemberDashboard";
import { LoginForm } from "@/components/auth/LoginForm";

const Index = () => {
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'member';
  } | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Mock authentication - in real app, this would be a proper API call
    if (email === "admin@gym.com" && password === "admin123") {
      setCurrentUser({
        id: "1",
        name: "Admin User",
        email: "admin@gym.com",
        role: "admin"
      });
    } else if (email === "member@gym.com" && password === "member123") {
      setCurrentUser({
        id: "2",
        name: "John Doe",
        email: "member@gym.com",
        role: "member"
      });
    } else {
      alert("Invalid credentials. Try: admin@gym.com/admin123 or member@gym.com/member123");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentUser.role === 'admin' ? (
        <AdminDashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <MemberDashboard user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
