import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { UserCheck, UserPlus, BookOpen, Mail, Phone, IdCard } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mb-4 shadow-glow">
            <UserCheck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Student Portal</h1>
          <p className="text-muted-foreground">Access your bus pass and manage your account</p>
        </div>

        <Card className="card-elevated border-0">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="flex items-center space-x-2">
                <UserCheck className="h-4 w-4" />
                <span>Login</span>
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center space-x-2">
                <UserPlus className="h-4 w-4" />
                <span>Register</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Sign in to access your bus pass</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="form-floating">
                    <Input
                      id="studentId"
                      placeholder="Enter your Student ID"
                      value={loginForm.studentId}
                      onChange={(e) => setLoginForm({...loginForm, studentId: e.target.value})}
                      className="h-12"
                    />
                    <Label htmlFor="studentId" className="flex items-center space-x-2">
                      <IdCard className="h-4 w-4" />
                      <span>Student ID</span>
                    </Label>
                  </div>
                  
                  <div className="form-floating">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      className="h-12"
                    />
                    <Label htmlFor="password">Password</Label>
                  </div>

                  <Button type="submit" className="w-full h-12 btn-hero text-base">
                    Sign In
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="register">
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Register for a new bus pass</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="form-floating">
                      <Input
                        id="name"
                        placeholder="Full Name"
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                        className="h-11"
                      />
                      <Label htmlFor="name">Full Name *</Label>
                    </div>

                    <div className="form-floating">
                      <Input
                        id="regStudentId"
                        placeholder="Student ID"
                        value={registerForm.studentId}
                        onChange={(e) => setRegisterForm({...registerForm, studentId: e.target.value})}
                        className="h-11"
                      />
                      <Label htmlFor="regStudentId">Student ID *</Label>
                    </div>

                    <div className="form-floating">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email Address"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                        className="h-11"
                      />
                      <Label htmlFor="email" className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>Email *</span>
                      </Label>
                    </div>

                    <div className="form-floating">
                      <Input
                        id="mobile"
                        placeholder="Mobile Number"
                        value={registerForm.mobile}
                        onChange={(e) => setRegisterForm({...registerForm, mobile: e.target.value})}
                        className="h-11"
                      />
                      <Label htmlFor="mobile" className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>Mobile</span>
                      </Label>
                    </div>

                    <div className="form-floating">
                      <Input
                        id="school"
                        placeholder="School/College Name"
                        value={registerForm.school}
                        onChange={(e) => setRegisterForm({...registerForm, school: e.target.value})}
                        className="h-11"
                      />
                      <Label htmlFor="school" className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4" />
                        <span>School/College</span>
                      </Label>
                    </div>

                    <div className="form-floating">
                      <Input
                        id="classYear"
                        placeholder="Class/Year"
                        value={registerForm.classYear}
                        onChange={(e) => setRegisterForm({...registerForm, classYear: e.target.value})}
                        className="h-11"
                      />
                      <Label htmlFor="classYear">Class/Year</Label>
                    </div>

                    <div className="form-floating">
                      <Input
                        id="regPassword"
                        type="password"
                        placeholder="Password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                        className="h-11"
                      />
                      <Label htmlFor="regPassword">Password *</Label>
                    </div>

                    <div className="form-floating">
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                        className="h-11"
                      />
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-12 btn-hero text-base">
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