import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Scan, 
  Camera, 
  Type, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  RefreshCw,
  History
} from "lucide-react";

interface ScanResult {
  valid: boolean;
  studentName: string;
  studentId: string;
  validTill: string;
  school: string;
  scanTime: string;
}

const ConductorScanner = () => {
  const [scanMethod, setScanMethod] = useState<'camera' | 'manual'>('camera');
  const [manualCode, setManualCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanResult, setLastScanResult] = useState<ScanResult | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock QR code validation function
  const validateQRCode = (qrData: string): ScanResult => {
    try {
      const data = JSON.parse(qrData);
      const validTill = new Date(data.validTill);
      const isValid = validTill > new Date();
      
      const result: ScanResult = {
        valid: isValid,
        studentName: data.name || 'Unknown Student',
        studentId: data.studentId || 'Unknown ID',
        validTill: validTill.toLocaleDateString('en-IN'),
        school: data.school || 'Unknown School',
        scanTime: new Date().toLocaleTimeString('en-IN')
      };
      
      return result;
    } catch (error) {
      // Return invalid result for malformed QR codes
      return {
        valid: false,
        studentName: 'Invalid QR Code',
        studentId: 'N/A',
        validTill: 'N/A',
        school: 'N/A',
        scanTime: new Date().toLocaleTimeString('en-IN')
      };
    }
  };

  const handleManualScan = () => {
    if (!manualCode.trim()) {
      toast.error("Please enter a QR code");
      return;
    }

    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      const result = validateQRCode(manualCode);
      setLastScanResult(result);
      setScanHistory(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 scans
      
      if (result.valid) {
        toast.success(`✅ Valid Pass - ${result.studentName}`);
      } else {
        toast.error(`❌ Invalid Pass - ${result.studentName}`);
      }
      
      setIsScanning(false);
      setManualCode('');
    }, 1000);
  };

  const handleCameraScan = () => {
    // For demo purposes, simulate a successful scan
    const mockQRData = JSON.stringify({
      studentId: "STU2024001",
      name: "John Doe",
      school: "Delhi Public School",
      validTill: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString() // 15 days from now
    });

    setIsScanning(true);
    
    setTimeout(() => {
      const result = validateQRCode(mockQRData);
      setLastScanResult(result);
      setScanHistory(prev => [result, ...prev.slice(0, 9)]);
      
      if (result.valid) {
        toast.success(`✅ Valid Pass - ${result.studentName}`);
      } else {
        toast.error(`❌ Invalid Pass - ${result.studentName}`);
      }
      
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mb-4 shadow-glow">
            <Scan className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-poppins font-bold text-foreground">Conductor Scanner</h1>
          <p className="text-muted-foreground text-lg mt-2">Verify student bus passes quickly and easily</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Scanner Section */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Scan Method Toggle */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Choose Scan Method</CardTitle>
                <CardDescription>Select how you want to scan student passes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={scanMethod === 'camera' ? 'default' : 'outline'}
                    onClick={() => setScanMethod('camera')}
                    className={`h-16 flex flex-col items-center space-y-2 ${
                      scanMethod === 'camera' ? 'btn-hero' : ''
                    }`}
                  >
                    <Camera className="h-6 w-6" />
                    <span>Camera Scan</span>
                  </Button>
                  
                  <Button
                    variant={scanMethod === 'manual' ? 'default' : 'outline'}
                    onClick={() => setScanMethod('manual')}
                    className={`h-16 flex flex-col items-center space-y-2 ${
                      scanMethod === 'manual' ? 'btn-hero' : ''
                    }`}
                  >
                    <Type className="h-6 w-6" />
                    <span>Manual Entry</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Scanner Interface */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {scanMethod === 'camera' ? <Camera className="h-5 w-5" /> : <Type className="h-5 w-5" />}
                  <span>{scanMethod === 'camera' ? 'Camera Scanner' : 'Manual Entry'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {scanMethod === 'camera' ? (
                  <div className="space-y-4">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-primary/20">
                      {isScanning ? (
                        <div className="text-center">
                          <RefreshCw className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
                          <p className="text-lg font-semibold">Scanning...</p>
                          <p className="text-muted-foreground">Point camera at QR code</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-lg font-semibold">Ready to Scan</p>
                          <p className="text-muted-foreground">Click below to start camera</p>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      onClick={handleCameraScan}
                      disabled={isScanning}
                      className="w-full h-12 btn-hero"
                    >
                      {isScanning ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Scanning...
                        </>
                      ) : (
                        <>
                          <Scan className="h-4 w-4 mr-2" />
                          Start Camera Scan
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="manualCode">Enter QR Code Data</Label>
                      <Input
                        id="manualCode"
                        placeholder="Paste or type QR code content here..."
                        value={manualCode}
                        onChange={(e) => setManualCode(e.target.value)}
                        className="h-12 mt-2"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleManualScan}
                      disabled={isScanning || !manualCode.trim()}
                      className="w-full h-12 btn-hero"
                    >
                      {isScanning ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Validating...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Validate Pass
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Last Scan Result */}
            {lastScanResult && (
              <Card className={`border-2 transition-all duration-300 ${
                lastScanResult.valid 
                  ? 'border-success bg-success/5 shadow-lg' 
                  : 'border-destructive bg-destructive/5 shadow-lg'
              }`}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {lastScanResult.valid ? (
                      <CheckCircle className="h-6 w-6 text-success" />
                    ) : (
                      <XCircle className="h-6 w-6 text-destructive" />
                    )}
                    <span className={lastScanResult.valid ? 'text-success' : 'text-destructive'}>
                      {lastScanResult.valid ? 'PASS VALID' : 'PASS INVALID'}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Student Name</p>
                      <p className="font-semibold">{lastScanResult.studentName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Student ID</p>
                      <p className="font-semibold">{lastScanResult.studentId}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">School</p>
                      <p className="font-semibold">{lastScanResult.school}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Valid Till</p>
                      <p className="font-semibold">{lastScanResult.validTill}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Scan History */}
          <div>
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="h-5 w-5 text-primary" />
                  <span>Recent Scans</span>
                </CardTitle>
                <CardDescription>Last 10 verification attempts</CardDescription>
              </CardHeader>
              <CardContent>
                {scanHistory.length === 0 ? (
                  <div className="text-center py-6">
                    <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No scans yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {scanHistory.map((scan, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            {scan.valid ? (
                              <CheckCircle className="h-4 w-4 text-success" />
                            ) : (
                              <XCircle className="h-4 w-4 text-destructive" />
                            )}
                            <p className="font-medium text-sm">{scan.studentName}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{scan.scanTime}</p>
                        </div>
                        <Badge 
                          className={scan.valid ? 'status-valid' : 'status-invalid'}
                        >
                          {scan.valid ? 'Valid' : 'Invalid'}
                        </Badge>
                      </div>
                    ))}
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

export default ConductorScanner;