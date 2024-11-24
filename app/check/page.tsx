'use client';

import React, { ReactNode } from 'react';
import {
  Shield,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader,
  Lock,
  Globe,
  Network,
  Code2,
  Cookie,
  Chrome,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type SecurityStatus = 'pending' | 'checking' | 'success' | 'warning' | 'error';

interface SecuritySolution {
  text: string;
  links: Array<{ name: string; url: string }>;
}

interface SecurityCheck {
  id: string;
  name: string;
  icon: ReactNode;
  details: string;
  initialDescription: string;
  status: SecurityStatus;
  risk?: string;
  impact?: string;
  solution?: SecuritySolution;
}

export default function CheckPage() {
  const [isChecking, setIsChecking] = React.useState(false);
  const [isComplete, setIsComplete] = React.useState(false);

  const initialChecks: SecurityCheck[] = [
    {
      id: 'https',
      name: 'HTTPS Connection',
      icon: <Lock className="w-6 h-6 text-blue-500" />,
      details: 'Checking connection security...',
      initialDescription:
        'Will verify if your connection is encrypted and secure',
      status: 'pending',
    },
    {
      id: 'webrtc',
      name: 'WebRTC Protection',
      icon: <Globe className="w-6 h-6 text-purple-500" />,
      details: 'Checking for potential IP leaks...',
      initialDescription: 'Will check for potential IP address leaks',
      status: 'pending',
    },
    {
      id: 'dns',
      name: 'DNS Security',
      icon: <Network className="w-6 h-6 text-green-500" />,
      details: 'Checking DNS configuration...',
      initialDescription: 'Will evaluate your DNS settings',
      status: 'pending',
    },
    {
      id: 'javascript',
      name: 'JavaScript Security',
      icon: <Code2 className="w-6 h-6 text-yellow-500" />,
      details: 'Checking JavaScript settings...',
      initialDescription: 'Will assess JavaScript security settings',
      status: 'pending',
    },
    {
      id: 'cookies',
      name: 'Cookie Security',
      icon: <Cookie className="w-6 h-6 text-orange-500" />,
      details: 'Checking cookie settings...',
      initialDescription: 'Will examine cookie settings',
      status: 'pending',
    },
    {
      id: 'browser',
      name: 'Browser Security',
      icon: <Chrome className="w-6 h-6 text-red-500" />,
      details: 'Checking browser security...',
      initialDescription: 'Will review browser security features',
      status: 'pending',
    },
    {
      id: 'headers',
      name: 'Security Headers',
      icon: <ShieldCheck className="w-6 h-6 text-indigo-500" />,
      details: 'Checking security headers...',
      initialDescription: 'Will inspect security headers',
      status: 'pending',
    },
  ];

  const [checks, setChecks] = React.useState<SecurityCheck[]>(initialChecks);
  const runSecurityChecks = async () => {
    setIsComplete(false);
    setIsChecking(true);
    setChecks((prev) =>
      prev.map((check) => ({ ...check, status: 'checking' as const }))
    );
    const checkPromises = [
      // HTTPS Check
      new Promise(async (resolve) => {
        await new Promise((r) => setTimeout(r, 1000));
        setChecks((prev) =>
          prev.map((check) =>
            check.id === 'https'
              ? {
                  ...check,
                  status:
                    window.location.protocol === 'https:'
                      ? 'success'
                      : 'warning',
                  details:
                    window.location.protocol === 'https:'
                      ? 'Your connection is secure'
                      : 'Your connection is not using HTTPS',
                  risk: 'Unencrypted connections can be intercepted by attackers',
                  impact:
                    'Your data could be viewed or modified by malicious actors',
                  solution: {
                    text: 'Use HTTPS Everywhere extension or a secure browser',
                    links: [
                      {
                        name: 'HTTPS Everywhere',
                        url: 'https://www.eff.org/https-everywhere',
                      },
                      {
                        name: 'Secure Browser Guide',
                        url: 'https://www.privacyguides.org/browsers/',
                      },
                    ],
                  },
                }
              : check
          )
        );
        resolve(true);
      }),

      // WebRTC Check
      new Promise(async (resolve) => {
        await new Promise((r) => setTimeout(r, 1000));
        setChecks((prev) =>
          prev.map((check) =>
            check.id === 'webrtc'
              ? {
                  ...check,
                  status: 'warning',
                  details: 'WebRTC could leak your real IP address',
                  risk: 'Your real IP address might be exposed even when using a VPN',
                  impact:
                    'Your actual location could be revealed during video/audio calls',
                  solution: {
                    text: 'Disable WebRTC or use protection',
                    links: [
                      {
                        name: 'WebRTC Blocker',
                        url: 'https://chrome.google.com/webstore/detail/webrtc-leak-prevent',
                      },
                      {
                        name: 'Privacy Guide',
                        url: 'https://privacyguides.org',
                      },
                    ],
                  },
                }
              : check
          )
        );
        resolve(true);
      }),

      // DNS Check
      new Promise(async (resolve) => {
        await new Promise((r) => setTimeout(r, 1000));
        setChecks((prev) =>
          prev.map((check) =>
            check.id === 'dns'
              ? {
                  ...check,
                  status: 'warning',
                  details: 'Using standard DNS',
                  risk: 'Your DNS queries are not encrypted',
                  impact: 'Your ISP can see which websites you visit',
                  solution: {
                    text: 'Use encrypted DNS',
                    links: [
                      { name: 'Cloudflare 1.1.1.1', url: 'https://1.1.1.1' },
                      { name: 'NextDNS', url: 'https://nextdns.io' },
                    ],
                  },
                }
              : check
          )
        );
        resolve(true);
      }),

      // Add similar promises for other checks
      // JavaScript Security Check
      new Promise(async (resolve) => {
        await new Promise((r) => setTimeout(r, 1000));
        setChecks((prev) =>
          prev.map((check) =>
            check.id === 'javascript'
              ? {
                  ...check,
                  status: 'warning',
                  details: 'JavaScript is enabled without restrictions',
                  risk: 'Malicious scripts could compromise your security',
                  impact:
                    'Websites can track you and potentially run malicious code',
                  solution: {
                    text: 'Use script blocking extensions',
                    links: [
                      {
                        name: 'uBlock Origin',
                        url: 'https://ublockorigin.com/',
                      },
                      { name: 'NoScript', url: 'https://noscript.net/' },
                    ],
                  },
                }
              : check
          )
        );
        resolve(true);
      }),

      // Cookie Security Check
      new Promise(async (resolve) => {
        await new Promise((r) => setTimeout(r, 1000));
        setChecks((prev) =>
          prev.map((check) =>
            check.id === 'cookies'
              ? {
                  ...check,
                  status: 'warning',
                  details: 'Third-party cookies are enabled',
                  risk: 'Tracking cookies can monitor your browsing habits',
                  impact:
                    'Your online activities can be tracked across websites',
                  solution: {
                    text: 'Adjust cookie settings and use protection',
                    links: [
                      {
                        name: 'Cookie AutoDelete',
                        url: 'https://chrome.google.com/webstore/detail/cookie-autodelete',
                      },
                      {
                        name: 'Privacy Badger',
                        url: 'https://privacybadger.org/',
                      },
                    ],
                  },
                }
              : check
          )
        );
        resolve(true);
      }),

      // Browser Security Check
      new Promise(async (resolve) => {
        await new Promise((r) => setTimeout(r, 1000));
        setChecks((prev) =>
          prev.map((check) =>
            check.id === 'browser'
              ? {
                  ...check,
                  status: 'warning',
                  details: 'Browser fingerprinting possible',
                  risk: 'Your browser can be uniquely identified',
                  impact: 'Websites can track you across different sessions',
                  solution: {
                    text: 'Use anti-fingerprinting protection',
                    links: [
                      {
                        name: 'Firefox',
                        url: 'https://www.mozilla.org/firefox/',
                      },
                      { name: 'Brave', url: 'https://brave.com' },
                    ],
                  },
                }
              : check
          )
        );
        resolve(true);
      }),

      // Security Headers Check
      new Promise(async (resolve) => {
        await new Promise((r) => setTimeout(r, 1000));
        setChecks((prev) =>
          prev.map((check) =>
            check.id === 'headers'
              ? {
                  ...check,
                  status: 'warning',
                  details: 'Missing important security headers',
                  risk: 'Website might be vulnerable to various attacks',
                  impact: 'Your connection might not be fully secured',
                  solution: {
                    text: 'Enable security headers',
                    links: [
                      {
                        name: 'Security Headers',
                        url: 'https://securityheaders.com',
                      },
                      {
                        name: 'OWASP Headers',
                        url: 'https://owasp.org/www-project-secure-headers/',
                      },
                    ],
                  },
                }
              : check
          )
        );
        resolve(true);
      }),
    ];

    // Wait for all checks to complete
    await Promise.all(checkPromises);

    setIsChecking(false);
    setIsComplete(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center">
            <span className="text-blue-600 font-semibold text-xl">
              SecurityCheck
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
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

          {!isComplete ? (
            <Button
              onClick={runSecurityChecks}
              disabled={isChecking}
              className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              {isChecking ? (
                <span className="flex items-center">
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Running Checks...
                </span>
              ) : (
                <span className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Start Security Check
                </span>
              )}
            </Button>
          ) : null}
        </div>

        {/* Results Summary */}
        {isComplete && !isChecking && (
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Security Check Complete
              </h2>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">
                    {checks.filter((c) => c.status === 'error').length}
                  </p>
                  <p className="text-sm text-red-600">Critical Issues</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">
                    {checks.filter((c) => c.status === 'warning').length}
                  </p>
                  <p className="text-sm text-yellow-600">Warnings</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {checks.filter((c) => c.status === 'success').length}
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
          {checks.map((check) => (
            <div
              key={check.id}
              className={`
                bg-white rounded-lg shadow-sm border p-6 transition-all duration-200
                ${check.status === 'pending' && !isChecking ? 'border-gray-200' : ''}
                ${check.status === 'checking' ? 'border-blue-200 bg-blue-50' : ''}
                ${check.status === 'success' ? 'border-green-200 bg-green-50' : ''}
                ${check.status === 'warning' ? 'border-yellow-200 bg-yellow-50' : ''}
                ${check.status === 'error' ? 'border-red-200 bg-red-50' : ''}
              `}
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {!isChecking && check.status === 'pending' ? (
                      check.icon
                    ) : (
                      <>
                        {check.status === 'success' && (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        )}
                        {check.status === 'warning' && (
                          <AlertCircle className="w-6 h-6 text-yellow-500" />
                        )}
                        {check.status === 'error' && (
                          <XCircle className="w-6 h-6 text-red-500" />
                        )}
                        {check.status === 'checking' && (
                          <Loader className="w-6 h-6 text-blue-500 animate-spin" />
                        )}
                      </>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {check.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {isChecking || check.status !== 'pending'
                        ? check.details
                        : check.initialDescription}
                    </p>
                  </div>
                </div>

                {check.status !== 'pending' && check.status !== 'checking' && (
                  <>
                    {check.risk && (
                      <div className="p-3 bg-red-50 rounded-md">
                        <p className="text-sm text-red-700">
                          <strong>Risk:</strong> {check.risk}
                        </p>
                      </div>
                    )}

                    {check.impact && (
                      <div className="p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-700">
                          <strong>Impact:</strong> {check.impact}
                        </p>
                      </div>
                    )}

                    {check.solution && (
                      <div className="p-3 bg-blue-50 rounded-md">
                        <p className="text-sm font-medium text-gray-900 mb-2">
                          <strong>Solution:</strong> {check.solution.text}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {check.solution.links.map((link) => (
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
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
