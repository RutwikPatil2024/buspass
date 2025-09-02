import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { UserCheck, UserPlus } from "lucide-react";

interface StudentLoginProps {
  onLogin: (studentData: any) => void;
}

const StudentLogin = ({ onLogin }: StudentLoginProps) => {
  const [loginForm, setLoginForm] = useState({
    studentId: "",
    password: ""
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    studentId: "",
    email: "",
    mobile: "",
    school: "",
    classYear: "",
    password: "",
    confirmPassword: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginForm.studentId || !loginForm.password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Mock login - in real app, this would call an API
    const mockStudent = {
      id: loginForm.studentId,
      name: "John Doe",
      email: "john@example.com",
      school: "Delhi Public School",
      classYear: "Grade 12",
      mobile: "+91 9876543210",
      validTill: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      planType: "Monthly"
    };

    onLogin(mockStudent);
    toast.success("Welcome back, " + mockStudent.name + "!");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerForm.name || !registerForm.studentId || !registerForm.email || !registerForm.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Mock registration
    const newStudent = {
      id: registerForm.studentId,
      name: registerForm.name,
      email: registerForm.email,
      school: registerForm.school,
      classYear: registerForm.classYear,
      mobile: registerForm.mobile,
      validTill: null,
      planType: null
    };

    onLogin(newStudent);
    toast.success(`Welcome ${newStudent.name}! Please purchase a pass to get started.`);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mb-4 shadow-glow">
            <UserCheck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-poppins font-bold text-foreground">Student Portal</h1>
          <p className="text-muted-foreground mt-2">Access your bus pass and manage your account</p>
        </div>

        <Card className="card-elevated border-0 shadow-strong">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary">
              <TabsTrigger value="login" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-primary">
                <UserCheck className="h-4 w-4" />
                <span className="font-medium">Login</span>
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:text-primary">
                <UserPlus className="h-4 w-4" />
                <span className="font-medium">Register</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-poppins">Welcome Back</CardTitle>
                <CardDescription className="text-base">Sign in to access your bus pass</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="form-group">
                    <input
                      id="studentId"
                      type="text"
                      placeholder="Enter your Student ID"
                      value={loginForm.studentId}
                      onChange={(e) => setLoginForm({...loginForm, studentId: e.target.value})}
                      className="form-input"
                    />
                    <label htmlFor="studentId" className="form-label">
                      Student ID
                    </label>
                  </div>
                  
                  <div className="form-group">
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      className="form-input"
                    />
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                  </div>

                  <Button type="submit" className="w-full h-12 btn-hero text-base font-medium">
                    Sign In
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="register">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-poppins">Create Account</CardTitle>
                <CardDescription className="text-base">Register for a new bus pass</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5">
                    <div className="form-group">
                      <input
                        id="name"
                        type="text"
                        placeholder="Full Name"
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                        className="form-input"
                      />
                      <label htmlFor="name" className="form-label">Full Name *</label>
                    </div>

                    <div className="form-group">
                      <input
                        id="regStudentId"
                        type="text"
                        placeholder="Student ID"
                        value={registerForm.studentId}
                        onChange={(e) => setRegisterForm({...registerForm, studentId: e.target.value})}
                        className="form-input"
                      />
                      <label htmlFor="regStudentId" className="form-label">Student ID *</label>
                    </div>

                    <div className="form-group">
                      <input
                        id="email"
                        type="email"
                        placeholder="Email Address"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                        className="form-input"
                      />
                      <label htmlFor="email" className="form-label">Email Address *</label>
                    </div>

                    <div className="form-group">
                      <input
                        id="mobile"
                        type="tel"
                        placeholder="Mobile Number"
                        value={registerForm.mobile}
                        onChange={(e) => setRegisterForm({...registerForm, mobile: e.target.value})}
                        className="form-input"
                      />
                      <label htmlFor="mobile" className="form-label">Mobile Number</label>
                    </div>

                    <div className="form-group">
                      <input
                        id="school"
                        type="text"
                        placeholder="School/College Name"
                        value={registerForm.school}
                        onChange={(e) => setRegisterForm({...registerForm, school: e.target.value})}
                        className="form-input"
                      />
                      <label htmlFor="school" className="form-label">School/College</label>
                    </div>

                    <div className="form-group">
                      <input
                        id="classYear"
                        type="text"
                        placeholder="Class/Year"
                        value={registerForm.classYear}
                        onChange={(e) => setRegisterForm({...registerForm, classYear: e.target.value})}
                        className="form-input"
                      />
                      <label htmlFor="classYear" className="form-label">Class/Year</label>
                    </div>

                    <div className="form-group">
                      <input
                        id="regPassword"
                        type="password"
                        placeholder="Password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                        className="form-input"
                      />
                      <label htmlFor="regPassword" className="form-label">Password *</label>
                    </div>

                    <div className="form-group">
                      <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                        className="form-input"
                      />
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password *</label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-12 btn-hero text-base font-medium">
                    Create Account
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default StudentLogin;