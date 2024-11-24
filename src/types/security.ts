export interface SecurityCheck {
  id: string;
  name: string;
  description: string;
  status: 'idle' | 'running' | 'complete' | 'error';
  result?: {
    status: 'secure' | 'warning' | 'danger';
    message: string;
    details?: string;
    recommendation?: string;
  };
}

export interface SecurityReport {
  timestamp: string;
  overallStatus: 'secure' | 'warning' | 'danger';
  checks: SecurityCheck[];
  summary: {
    total: number;
    secure: number;
    warnings: number;
    dangers: number;
  };
}
