import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Lock, Shield } from 'lucide-react';
import { AdminContentManager } from '@/components/AdminContentManager';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setAttempts(0);
    } else {
      setAttempts(prev => prev + 1);
      if (attempts >= 2) {
        setIsLocked(true);
        setTimeout(() => {
          setIsLocked(false);
          setAttempts(0);
        }, 30 * 60 * 1000); // 30 minutes
      }
    }
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md p-8">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Admin Portal</h1>
              <p className="text-muted-foreground">Enter password to access management panel</p>
            </div>
            
            {isLocked ? (
              <div className="text-center space-y-4">
                <Shield className="w-12 h-12 text-destructive mx-auto" />
                <p className="text-destructive">Account locked for 30 minutes due to failed attempts</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
                <Button onClick={handleLogin} className="w-full" disabled={!password}>
                  Login
                </Button>
                {attempts > 0 && (
                  <p className="text-sm text-destructive">
                    Incorrect password. {3 - attempts} attempts remaining.
                  </p>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return <AdminContentManager />;
};

export default Admin;