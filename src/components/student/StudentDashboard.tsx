import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Download, 
  Printer, 
  CreditCard, 
  Calendar, 
  School, 
  Phone, 
  Mail,
  LogOut,
  RefreshCw
} from "lucide-react";
import QRCode from "qrcode";

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

interface StudentDashboardProps {
  student: Student;
  onLogout: () => void;
  onShowPlans: () => void;
}

const StudentDashboard = ({ student, onLogout, onShowPlans }: StudentDashboardProps) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

  useEffect(() => {
    generateQRCode();
  }, [student]);

  const generateQRCode = async () => {
    try {
      const qrData = {
        studentId: student.id,
        name: student.name,
        school: student.school,
        validTill: student.validTill?.toISOString(),
        timestamp: Date.now()
      };
      
      const dataUrl = await QRCode.toDataURL(JSON.stringify(qrData), {
        width: 200,
        margin: 2,
        color: {
          dark: '#1e40af',
          light: '#ffffff'
        }
      });
      
      setQrCodeDataUrl(dataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error("Failed to generate QR code");
    }
  };

  const isPassValid = student.validTill && new Date() < new Date(student.validTill);
  const daysLeft = student.validTill 
    ? Math.ceil((new Date(student.validTill).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  const handleDownload = () => {
    if (!qrCodeDataUrl) return;
    
    const link = document.createElement('a');
    link.download = `bus-pass-${student.id}.png`;
    link.href = qrCodeDataUrl;
    link.click();
    toast.success("Pass downloaded successfully!");
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Bus Pass - ${student.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
            .pass-container { border: 2px solid #1e40af; border-radius: 12px; padding: 20px; max-width: 400px; margin: 0 auto; }
            .header { color: #1e40af; margin-bottom: 20px; }
            .qr-code { margin: 20px 0; }
            .student-info { text-align: left; margin-top: 20px; }
            .status { color: ${isPassValid ? '#22c55e' : '#ef4444'}; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="pass-container">
            <div class="header">
              <h1>🚌 Student Bus Pass</h1>
            </div>
            <div class="qr-code">
              <img src="${qrCodeDataUrl}" alt="QR Code" />
            </div>
            <div class="student-info">
              <p><strong>Name:</strong> ${student.name}</p>
              <p><strong>Student ID:</strong> ${student.id}</p>
              <p><strong>School:</strong> ${student.school}</p>
              <p><strong>Class:</strong> ${student.classYear}</p>
              <p><strong>Plan:</strong> ${student.planType || 'No active plan'}</p>
              <p><strong>Valid Till:</strong> ${student.validTill ? new Date(student.validTill).toLocaleDateString() : 'N/A'}</p>
              <p class="status">Status: ${isPassValid ? 'VALID' : 'EXPIRED/INACTIVE'}</p>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    toast.success("Print dialog opened!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/5 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, {student.name}!</h1>
            <p className="text-muted-foreground">Manage your bus pass and travel safely</p>
          </div>
          <Button variant="outline" onClick={onLogout} className="flex items-center space-x-2">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Bus Pass Card */}
          <div className="lg:col-span-2">
            <Card className="card-pass border-2">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-hero rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">🚌</span>
                  </div>
                  <CardTitle className="text-2xl">Digital Bus Pass</CardTitle>
                </div>
                <CardDescription>
                  Show this QR code to the conductor for verification
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center space-y-6">
                {/* QR Code */}
                <div className="flex justify-center">
                  <div className="qr-container">
                    {qrCodeDataUrl ? (
                      <img src={qrCodeDataUrl} alt="Bus Pass QR Code" className="mx-auto" />
                    ) : (
                      <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                        <RefreshCw className="h-8 w-8 text-muted-foreground animate-spin" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex justify-center">
                  {isPassValid ? (
                    <Badge className="status-valid">
                      ✅ Active Pass - {daysLeft} days left
                    </Badge>
                  ) : (
                    <Badge className="status-invalid">
                      ❌ No Active Pass
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-3">
                  <Button 
                    onClick={handleDownload} 
                    variant="outline"
                    className="flex items-center space-x-2"
                    disabled={!qrCodeDataUrl}
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                  
                  <Button 
                    onClick={handlePrint}
                    variant="outline" 
                    className="flex items-center space-x-2"
                    disabled={!qrCodeDataUrl}
                  >
                    <Printer className="h-4 w-4" />
                    <span>Print</span>
                  </Button>
                  
                  <Button 
                    onClick={onShowPlans}
                    className="btn-hero flex items-center space-x-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>{isPassValid ? 'Renew Pass' : 'Buy Pass'}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Student Info */}
          <div className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <School className="h-5 w-5 text-primary" />
                  <span>Student Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Student ID</p>
                    <p className="font-semibold">{student.id}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">School/College</p>
                    <p className="font-semibold">{student.school || 'Not specified'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Class/Year</p>
                    <p className="font-semibold">{student.classYear || 'Not specified'}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{student.email}</span>
                  </div>
                  
                  {student.mobile && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{student.mobile}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Pass Details */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Pass Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Plan</p>
                  <p className="font-semibold">{student.planType || 'No active plan'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Valid Until</p>
                  <p className="font-semibold">
                    {student.validTill 
                      ? new Date(student.validTill).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'No active pass'
                    }
                  </p>
                </div>
                
                {!isPassValid && (
                  <div className="pt-3">
                    <Button 
                      onClick={onShowPlans}
                      className="w-full btn-success"
                      size="sm"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Purchase Pass
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;