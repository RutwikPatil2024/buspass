import { useState } from "react";
import StudentLogin from "@/components/student/StudentLogin";
import StudentDashboard from "@/components/student/StudentDashboard";
import SubscriptionPlans from "@/components/student/SubscriptionPlans";

type ViewMode = 'login' | 'dashboard' | 'plans';

interface Student {
  id: string;
  name: string;
  email: string;
  school: string;
  classYear: string;
  mobile: string;
  validTill: Date | null;
  planType: string | null;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('login');
  const [student, setStudent] = useState<Student | null>(null);

  const handleLogin = (studentData: Student) => {
    setStudent(studentData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setStudent(null);
    setCurrentView('login');
  };

  const handleShowPlans = () => {
    setCurrentView('plans');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handlePurchase = (planId: string) => {
    if (!student) return;

    // Calculate validity based on plan
    let validTill: Date;
    let planType: string;

    switch (planId) {
      case 'monthly':
        validTill = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        planType = 'Monthly';
        break;
      case 'quarterly':
        validTill = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
        planType = 'Quarterly';
        break;
      case 'semester':
        validTill = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000);
        planType = 'Semester';
        break;
      case 'yearly':
        validTill = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
        planType = 'Yearly';
        break;
      default:
        validTill = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        planType = 'Monthly';
    }

    const updatedStudent = {
      ...student,
      validTill,
      planType
    };

    setStudent(updatedStudent);
    setCurrentView('dashboard');
  };

  if (!student || currentView === 'login') {
    return <StudentLogin onLogin={handleLogin} />;
  }

  if (currentView === 'plans') {
    return (
      <SubscriptionPlans 
        onBack={handleBackToDashboard}
        onPurchase={handlePurchase}
      />
    );
  }

  return (
    <StudentDashboard
      student={student}
      onLogout={handleLogout}
      onShowPlans={handleShowPlans}
    />
  );
};

export default Index;