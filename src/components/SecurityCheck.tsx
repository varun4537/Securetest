// src/components/SecurityCheck.tsx
'use client';

import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
import * as securityChecks from '@/utils/securityChecks';

interface SecurityCheckState {
  isRunning: boolean;
  results: {
    [key: string]: securityChecks.SecurityResult;
  };
}

export function SecurityCheck() {
  const [state, setState] = useState<SecurityCheckState>({
    isRunning: false,
    results: {},
  });

  const runSecurityChecks = async () => {
    setState(prev => ({ ...prev, isRunning: true }));

    // Run checks sequentially
    const results = {
      https: await securityChecks.checkHTTPS(),
      webrtc: await securityChecks.checkWebRTC(),
      fingerprint: await securityChecks.checkBrowserFingerprint(),
      cookies: await securityChecks.checkCookies(),
      dns: await securityChecks.checkDNS(),
    };

    setState({ isRunning: false, results });
  };

  const getStatusIcon = (status: securityChecks.SecurityResult['status']) => {
    switch (status) {
      case 'secure':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case 'danger':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Shield className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Button
          onClick={runSecurityChecks}
          disabled={state.isRunning}
          size="lg"
          className="w-full md:w-auto"
        >
          {state.isRunning ? (
            <>
              <Spinner className="mr-2" />
              Running Security Checks...
            </>
          ) : (
            'Start Security Check'
          )}
        </Button>
      </div>

      {Object.entries(state.results).length > 0 && (
        <div className="space-y-4">
          {Object.entries(state.results).map(([key, result]) => (
            <Alert
              key={key}
              variant={result.status === 'secure' ? 'success' : 'warning'}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0">{getStatusIcon(result.status)}</div>
              <div className="flex-1">
                <AlertTitle>{result.message}</AlertTitle>
                <AlertDescription>
                  <p className="mt-1">{result.details}</p>
                  {result.recommendation && (
                    <p className="mt-2 font-medium">Recommendation: {result.recommendation}</p>
                  )}
                  {result.learnMore && (
                    <a
                      href={result.learnMore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      Learn More
                      <svg
                        className="ml-1 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </AlertDescription>
              </div>
            </Alert>
          ))}
        </div>
      )}
    </div>
  );
}
