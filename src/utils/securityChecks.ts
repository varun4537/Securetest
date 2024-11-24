// src/utils/securityChecks.ts
export type SecurityStatus = 'pending' | 'checking' | 'success' | 'warning' | 'error';

export interface SecurityCheckResult {
  status: SecurityStatus;
  details: string;
  risk?: string;
  impact?: string;
  recommendations?: {
    text: string;
    links: Array<{ name: string; url: string }>;
  };
}

// HTTPS Check
export const checkHTTPS = (): SecurityCheckResult => {
  const isSecure = window.location.protocol === 'https:';
  return {
    status: isSecure ? 'success' : 'warning',
    details: isSecure ? 'Your connection is secure' : 'Your connection is not using HTTPS',
    risk: isSecure ? undefined : 'Your connection is not encrypted',
    impact: isSecure ? undefined : 'Data could be intercepted by attackers',
    recommendations: isSecure
      ? undefined
      : {
          text: 'Use HTTPS whenever possible',
          links: [{ name: 'HTTPS Everywhere', url: 'https://www.eff.org/https-everywhere' }],
        },
  };
};

// WebRTC Check
export const checkWebRTC = (): SecurityCheckResult => {
  const hasWebRTC = !!(window.RTCPeerConnection || (window as any).webkitRTCPeerConnection);
  return {
    status: hasWebRTC ? 'warning' : 'success',
    details: hasWebRTC ? 'WebRTC is enabled' : 'WebRTC is not enabled',
    risk: hasWebRTC ? 'Your real IP address might be exposed' : undefined,
    impact: hasWebRTC ? 'Your location could be revealed even when using a VPN' : undefined,
    recommendations: hasWebRTC
      ? {
          text: 'Disable WebRTC or use protection',
          links: [
            {
              name: 'WebRTC Blocker',
              url: 'https://chrome.google.com/webstore/detail/webrtc-leak-prevent/',
            },
          ],
        }
      : undefined,
  };
};

// Cookie Security Check
export const checkCookies = (): SecurityCheckResult => {
  const cookiesEnabled = navigator.cookieEnabled;
  const cookieCount = document.cookie.split(';').filter(Boolean).length;

  return {
    status: cookieCount === 0 ? 'success' : 'warning',
    details: `Found ${cookieCount} cookies`,
    risk: cookieCount > 0 ? 'Cookies can be used to track your activity' : undefined,
    impact: cookieCount > 0 ? 'Your browsing behavior can be tracked across sites' : undefined,
    recommendations:
      cookieCount > 0
        ? {
            text: 'Manage your cookies and use protection',
            links: [
              {
                name: 'Cookie AutoDelete',
                url: 'https://chrome.google.com/webstore/detail/cookie-autodelete/',
              },
            ],
          }
        : undefined,
  };
};

// Browser Fingerprinting Check
export const checkFingerprinting = (): SecurityCheckResult => {
  const canvas = document.createElement('canvas');
  const hasCanvas = !!canvas.getContext('2d');
  const hasWebGL = !!canvas.getContext('webgl');
  const audioContext = window.AudioContext || (window as any).webkitAudioContext;
  const vulnerabilities = [hasCanvas, hasWebGL, !!audioContext].filter(Boolean).length;

  return {
    status: vulnerabilities === 0 ? 'success' : vulnerabilities < 2 ? 'warning' : 'error',
    details: `${vulnerabilities} fingerprinting vectors detected`,
    risk: vulnerabilities > 0 ? 'Your browser can be uniquely identified' : undefined,
    impact: vulnerabilities > 0 ? 'You can be tracked across different sessions' : undefined,
    recommendations:
      vulnerabilities > 0
        ? {
            text: 'Use anti-fingerprinting protection',
            links: [
              { name: 'Firefox Privacy Settings', url: 'https://www.mozilla.org/firefox/privacy/' },
              { name: 'Brave Browser', url: 'https://brave.com' },
            ],
          }
        : undefined,
  };
};
