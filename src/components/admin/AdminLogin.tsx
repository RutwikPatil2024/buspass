import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Shield } from "lucide-react";

interface AdminLoginProps {
  onLogin: (adminData: any) => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginForm.username || !loginForm.password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Mock admin login - in real app, this would call an API
    if (loginForm.username === "admin" && loginForm.password === "admin123") {
      const adminData = {
        id: "admin_001",
        name: "System Administrator",
        role: "Super Admin",
        permissions: ["view_students", "manage_passes", "system_settings"]
      };
      
      onLogin(adminData);
      toast.success(`Welcome back, ${adminData.name}!`);
    } else {
      toast.error("Invalid credentials. Try: admin / admin123");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-destructive rounded-2xl flex items-center justify-center mb-4 shadow-glow">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-poppins font-bold text-foreground">Admin Portal</h1>
          <p className="text-muted-foreground text-lg">Secure access to system management</p>
        </div>

        <Card className="card-elevated border-0 shadow-strong">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-poppins">Administrator Login</CardTitle>
            <CardDescription className="text-base">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="form-group">
                <input
                  id="username"
                  type="text"
                  placeholder="Enter admin username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  className="form-input"
                />
                <label htmlFor="username" className="form-label">Username</label>
              </div>
              
              <div className="form-group">
                <input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="form-input"
                />
                <label htmlFor="password" className="form-label">Password</label>
              </div>

              <Button type="submit" className="w-full h-12 btn-hero text-base font-medium">
                <Shield className="h-4 w-4 mr-2" />
                Access Admin Panel
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground mb-2">Demo Credentials:</p>
              <div className="text-sm space-y-1">
                <p><strong>Username:</strong> admin</p>
                <p><strong>Password:</strong> admin123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;