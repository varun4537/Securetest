'use client';

import { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ExternalLink,
} from 'lucide-react';
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
    setState((prev) => ({ ...prev, isRunning: true }));

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Security Check
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          Comprehensive security analysis of your browser environment
        </p>
        <p className="text-gray-600 mb-8">
          Our tool performs real-time checks on your connection security,
          privacy settings, and browser configuration to identify potential
          vulnerabilities and provide actionable recommendations.
        </p>

        {!Object.keys(state.results).length && (
          <Button
            onClick={runSecurityChecks}
            disabled={state.isRunning}
            size="lg"
            className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            {state.isRunning ? (
              <span className="flex items-center">
                <Spinner className="mr-2" />
                Running Security Checks...
              </span>
            ) : (
              <span className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Start Security Check
              </span>
            )}
          </Button>
        )}
      </div>

      {/* Results Summary */}
      {Object.keys(state.results).length > 0 && !state.isRunning && (
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Security Check Complete
            </h2>
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">
                  {
                    Object.values(state.results).filter(
                      (r) => r.status === 'danger'
                    ).length
                  }
                </p>
                <p className="text-sm text-red-600">Critical Issues</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">
                  {
                    Object.values(state.results).filter(
                      (r) => r.status === 'warning'
                    ).length
                  }
                </p>
                <p className="text-sm text-yellow-600">Warnings</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {
                    Object.values(state.results).filter(
                      (r) => r.status === 'secure'
                    ).length
                  }
                </p>
                <p className="text-sm text-green-600">Passed Checks</p>
              </div>
            </div>
            <Button
              onClick={runSecurityChecks}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Run Check Again
            </Button>
          </div>
        </div>
      )}

      {/* Security Checks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Object.entries(state.results).map(([key, result]) => (
          <div
            key={key}
            className={`
              bg-white rounded-lg shadow-sm border p-6 transition-all duration-200
              ${result.status === 'secure' ? 'border-green-200 bg-green-50/50' : ''}
              ${result.status === 'warning' ? 'border-yellow-200 bg-yellow-50/50' : ''}
              ${result.status === 'danger' ? 'border-red-200 bg-red-50/50' : ''}
            `}
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {getStatusIcon(result.status)}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {result.message}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">{result.details}</p>
                </div>
              </div>

              {result.risk && (
                <div className="p-3 bg-red-50 rounded-md">
                  <p className="text-sm text-red-700">
                    <strong>Risk:</strong> {result.risk}
                  </p>
                </div>
              )}

              {result.impact && (
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-700">
                    <strong>Impact:</strong> {result.impact}
                  </p>
                </div>
              )}

              {result.solution && (
                <div className="p-3 bg-blue-50 rounded-md">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    <strong>Solution:</strong> {result.solution.text}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.solution.links.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 text-sm bg-white text-blue-700 rounded-full hover:bg-blue-50 transition-colors"
                      >
                        {link.name}
                        <ExternalLink className="ml-1.5 h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
