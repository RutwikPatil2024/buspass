import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  LogOut, 
  Search, 
  Filter, 
  Users, 
  TrendingUp, 
  Calendar,
  Eye,
  Ban,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Student {
  id: string;
  name: string;
  school: string;
  planType: string | null;
  validTill: Date | null;
  email: string;
  mobile: string;
  status: 'active' | 'expired' | 'inactive';
}

interface AdminDashboardProps {
  admin: any;
  onLogout: () => void;
}

const AdminDashboard = ({ admin, onLogout }: AdminDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired' | 'inactive'>('all');

  // Mock student data
  const [students] = useState<Student[]>([
    {
      id: "STU2024001",
      name: "John Doe",
      school: "Delhi Public School",
      planType: "Monthly",
      validTill: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      email: "john@example.com",
      mobile: "+91 9876543210",
      status: 'active'
    },
    {
      id: "STU2024002",
      name: "Jane Smith",
      school: "Kendriya Vidyalaya",
      planType: "Semester",
      validTill: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
      email: "jane@example.com",
      mobile: "+91 9876543211",
      status: 'active'
    },
    {
      id: "STU2024003",
      name: "Mike Johnson",
      school: "DAV Public School",
      planType: "Monthly",
      validTill: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      email: "mike@example.com",
      mobile: "+91 9876543212",
      status: 'expired'
    },
    {
      id: "STU2024004",
      name: "Sarah Wilson",
      school: "Modern School",
      planType: null,
      validTill: null,
      email: "sarah@example.com",
      mobile: "+91 9876543213",
      status: 'inactive'
    },
    {
      id: "STU2024005",
      name: "Alex Brown",
      school: "Ryan International",
      planType: "Yearly",
      validTill: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000),
      email: "alex@example.com",
      mobile: "+91 9876543214",
      status: 'active'
    }
  ]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.school.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: students.length,
    active: students.filter(s => s.status === 'active').length,
    expired: students.filter(s => s.status === 'expired').length,
    inactive: students.filter(s => s.status === 'inactive').length
  };

  const handleAction = (action: string, studentId: string, studentName: string) => {
    switch (action) {
      case 'view':
        toast.info(`Viewing details for ${studentName}`);
        break;
      case 'extend':
        toast.success(`Pass extended for ${studentName}`);
        break;
      case 'revoke':
        toast.error(`Pass revoked for ${studentName}`);
        break;
      default:
        break;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="status-valid">Active</Badge>;
      case 'expired':
        return <Badge className="status-invalid">Expired</Badge>;
      case 'inactive':
        return <Badge className="status-pending">No Pass</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/5 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {admin.name}</p>
          </div>
          <Button variant="outline" onClick={onLogout} className="flex items-center space-x-2">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-success" />
                <div>
                  <p className="text-2xl font-bold">{stats.active}</p>
                  <p className="text-sm text-muted-foreground">Active Passes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <XCircle className="h-8 w-8 text-destructive" />
                <div>
                  <p className="text-2xl font-bold">{stats.expired}</p>
                  <p className="text-sm text-muted-foreground">Expired Passes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold">{stats.inactive}</p>
                  <p className="text-sm text-muted-foreground">No Active Pass</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student Management */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Student Management</span>
            </CardTitle>
            <CardDescription>
              View and manage all registered students and their bus passes
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, ID, or school..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('all')}
                  size="sm"
                >
                  All ({stats.total})
                </Button>
                <Button
                  variant={filterStatus === 'active' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('active')}
                  size="sm"
                  className={filterStatus === 'active' ? 'btn-success' : ''}
                >
                  Active ({stats.active})
                </Button>
                <Button
                  variant={filterStatus === 'expired' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('expired')}
                  size="sm"
                  className={filterStatus === 'expired' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}
                >
                  Expired ({stats.expired})
                </Button>
              </div>
            </div>

            {/* Students Table */}
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Valid Till</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{student.school}</p>
                      </TableCell>
                      <TableCell>
                        {student.planType ? (
                          <Badge variant="secondary">{student.planType}</Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">No plan</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {student.validTill ? (
                          <div>
                            <p className="text-sm">
                              {student.validTill.toLocaleDateString('en-IN')}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {Math.ceil((student.validTill.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                            </p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(student.status)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleAction('view', student.id, student.name)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction('extend', student.id, student.name)}>
                              <Calendar className="h-4 w-4 mr-2" />
                              Extend Pass
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleAction('revoke', student.id, student.name)}
                              className="text-destructive"
                            >
                              <Ban className="h-4 w-4 mr-2" />
                              Revoke Pass
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-semibold text-muted-foreground">No students found</p>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;