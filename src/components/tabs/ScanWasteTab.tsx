import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Upload, 
  Camera, 
  Scan, 
  CheckCircle, 
  AlertTriangle,
  Recycle,
  Trash2,
  Zap,
  Info
} from 'lucide-react';

const ScanWasteTab = () => {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const wasteTypes = {
    organic: {
      color: 'text-success',
      bg: 'bg-success/10',
      icon: Recycle,
      label: 'Organic Waste',
      description: 'Biodegradable materials like food scraps, garden waste',
      disposal: 'Compost bin or organic waste collection',
      points: 5
    },
    recyclable: {
      color: 'text-primary',
      bg: 'bg-primary/10',
      icon: Recycle,
      label: 'Recyclable',
      description: 'Paper, cardboard, clean plastic, glass, metal',
      disposal: 'Recycling bin after proper cleaning',
      points: 10
    },
    hazardous: {
      color: 'text-destructive',
      bg: 'bg-destructive/10',
      icon: AlertTriangle,
      label: 'Hazardous',
      description: 'Chemicals, batteries, paint, medical waste',
      disposal: 'Special collection center required',
      points: 15
    },
    ewaste: {
      color: 'text-warning',
      bg: 'bg-warning/10',
      icon: Zap,
      label: 'E-Waste',
      description: 'Electronic devices, circuits, cables',
      disposal: 'Certified e-waste recycling center',
      points: 20
    }
  };

  const mockScanResult = {
    type: 'recyclable',
    confidence: 92,
    item: 'Plastic Water Bottle (PET)',
    suggestions: [
      'Clean thoroughly before recycling',
      'Remove cap and label if possible',
      'Check local recycling guidelines for PET plastics'
    ],
    ecoPoints: 10,
    carbonSaved: '0.5 kg CO₂'
  };

  const handleScan = () => {
    setIsScanning(true);
    // Simulate AI scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(mockScanResult);
    }, 2000);
  };

  const WasteTypeCard = ({ type, data, isResult = false }) => {
    const Icon = data.icon;
    return (
      <div className={`p-4 rounded-lg border-2 transition-all ${
        isResult 
          ? `${data.bg} border-current ${data.color} border-opacity-50` 
          : 'border-muted hover:border-primary/30 bg-card'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg ${data.bg} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${data.color}`} />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">{data.label}</h4>
            <p className="text-sm text-muted-foreground">{data.description}</p>
          </div>
          {isResult && (
            <div className="text-right">
              <div className="font-bold text-primary">+{data.points}</div>
              <div className="text-xs text-muted-foreground">Points</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* AI Waste Scanner */}
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/20">
        <div className="text-center space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">AI Waste Scanner</h3>
            <p className="text-muted-foreground">
              Upload an image or use your camera to identify waste type and get disposal instructions
            </p>
          </div>

          {/* Upload Area */}
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-8 border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors">
            {!scanResult ? (
              <div className="space-y-4">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  {isScanning ? (
                    <Scan className="w-10 h-10 text-primary animate-pulse" />
                  ) : (
                    <Upload className="w-10 h-10 text-primary" />
                  )}
                </div>
                
                {isScanning ? (
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">Analyzing waste...</p>
                    <div className="w-48 mx-auto bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full animate-pulse w-3/4" />
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-foreground font-medium">
                      Drop your waste image here or click to upload
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button variant="eco" onClick={handleScan}>
                        <Upload className="w-4 h-4" />
                        Upload Image
                      </Button>
                      <Button variant="outline" onClick={handleScan}>
                        <Camera className="w-4 h-4" />
                        Use Camera
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Supports JPG, PNG up to 10MB
                    </p>
                  </>
                )}
              </div>
            ) : (
              /* Scan Result */
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-2 text-success">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-semibold">Scan Complete!</span>
                </div>
                
                <div className="bg-card rounded-lg p-6">
                  <div className="text-center space-y-4">
                    <div>
                      <h4 className="text-xl font-bold text-foreground">{scanResult.item}</h4>
                      <p className="text-sm text-muted-foreground">
                        Confidence: {scanResult.confidence}%
                      </p>
                    </div>
                    
                    <WasteTypeCard 
                      type={scanResult.type} 
                      data={wasteTypes[scanResult.type]}
                      isResult={true}
                    />
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-primary/5 rounded-lg p-4">
                        <div className="font-semibold text-primary mb-2">Eco Points Earned</div>
                        <div className="text-2xl font-bold text-primary">+{scanResult.ecoPoints}</div>
                      </div>
                      <div className="bg-success/5 rounded-lg p-4">
                        <div className="font-semibold text-success mb-2">Carbon Saved</div>
                        <div className="text-2xl font-bold text-success">{scanResult.carbonSaved}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-left">
                  <h5 className="font-semibold text-foreground mb-2">Disposal Instructions:</h5>
                  <ul className="space-y-2">
                    {scanResult.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-center space-x-3">
                  <Button variant="eco">
                    Find Disposal Center
                  </Button>
                  <Button variant="outline" onClick={() => setScanResult(null)}>
                    Scan Another Item
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Waste Categories Guide */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Waste Categories</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(wasteTypes).map(([type, data]) => (
            <WasteTypeCard key={type} type={type} data={data} />
          ))}
        </div>
      </div>

      {/* Recent Scans */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground flex items-center justify-between">
          <span>Recent Scans</span>
          <Button variant="ghost" size="sm">View All</Button>
        </h3>
        
        <div className="grid gap-3">
          {[
            { item: 'Aluminum Can', type: 'recyclable', points: 10, date: '2 hours ago' },
            { item: 'Banana Peel', type: 'organic', points: 5, date: '1 day ago' },
            { item: 'Old Phone', type: 'ewaste', points: 20, date: '3 days ago' }
          ].map((scan, index) => {
            const typeData = wasteTypes[scan.type];
            const Icon = typeData.icon;
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg card-shadow">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg ${typeData.bg} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${typeData.color}`} />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{scan.item}</div>
                    <div className="text-sm text-muted-foreground">{scan.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-primary">+{scan.points}</div>
                  <div className="text-xs text-muted-foreground">points</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScanWasteTab;