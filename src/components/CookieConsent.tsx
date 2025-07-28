import React, { useState, useEffect } from 'react';
import { Cookie, Shield, Settings, X, Check, Info, Eye, Download } from 'lucide-react';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const settings = JSON.parse(consent);
      setCookieSettings(settings);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setCookieSettings(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    localStorage.setItem('consent-date', new Date().toISOString());
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setCookieSettings(onlyNecessary);
    localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary));
    localStorage.setItem('consent-date', new Date().toISOString());
    setShowBanner(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(cookieSettings));
    localStorage.setItem('consent-date', new Date().toISOString());
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSettingChange = (key: keyof CookieSettings) => {
    if (key === 'necessary') return; // Necessary cookies cannot be disabled
    setCookieSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const exportData = () => {
    const userData = {
      consentSettings: cookieSettings,
      consentDate: localStorage.getItem('consent-date'),
      browserInfo: navigator.userAgent,
      timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-data-export.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!showBanner && !showSettings && !showPolicy) {
    return (
      <button
        onClick={() => setShowSettings(true)}
        className="fixed bottom-4 left-4 bg-slate-800 hover:bg-slate-900 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
        title="Cookie Settings"
      >
        <Cookie className="w-5 h-5" />
      </button>
    );
  }

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-2xl z-50">
          <div className="max-w-7xl mx-auto p-6">
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">🍪 We use cookies</h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    We use cookies and similar technologies to enhance your experience, analyze site traffic, 
                    and personalize content. By clicking "Accept All", you consent to our use of cookies.
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <button
                      onClick={() => setShowPolicy(true)}
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      Privacy Policy
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      Cookie Settings
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 flex-shrink-0">
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 border border-slate-300 rounded-lg text-sm font-medium transition-colors"
                >
                  Reject All
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-sm font-medium transition-colors"
                >
                  Customize
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg text-sm font-medium transition-all"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Cookie Preferences</h2>
                    <p className="text-sm text-slate-500">Manage your cookie settings</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Necessary Cookies */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <h3 className="font-semibold text-slate-800">Necessary Cookies</h3>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Required</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Essential for the website to function properly. These cannot be disabled.
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Info className="w-4 h-4 text-blue-500" />
                    <h3 className="font-semibold text-slate-800">Analytics Cookies</h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    Help us understand how visitors interact with our website by collecting anonymous information.
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => handleSettingChange('analytics')}
                    className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                      cookieSettings.analytics ? 'bg-blue-500 justify-end' : 'bg-slate-300 justify-start'
                    } px-1`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="w-4 h-4 text-purple-500" />
                    <h3 className="font-semibold text-slate-800">Marketing Cookies</h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    Used to track visitors across websites to display relevant advertisements.
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => handleSettingChange('marketing')}
                    className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                      cookieSettings.marketing ? 'bg-purple-500 justify-end' : 'bg-slate-300 justify-start'
                    } px-1`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>

              {/* Preference Cookies */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Settings className="w-4 h-4 text-orange-500" />
                    <h3 className="font-semibold text-slate-800">Preference Cookies</h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    Remember your preferences and settings to provide a personalized experience.
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => handleSettingChange('preferences')}
                    className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                      cookieSettings.preferences ? 'bg-orange-500 justify-end' : 'bg-slate-300 justify-start'
                    } px-1`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setShowPolicy(true)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View Privacy Policy
              </button>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-sm font-medium transition-all flex items-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Preferences</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPolicy && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Privacy Policy & GDPR</h2>
                    <p className="text-sm text-slate-500">Your data protection rights</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={exportData}
                    className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export My Data</span>
                  </button>
                  <button
                    onClick={() => setShowPolicy(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6 text-sm text-slate-600 leading-relaxed">
              <section>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">🛡️ Data Protection & Privacy</h3>
                <p className="mb-4">
                  We are committed to protecting your privacy and ensuring compliance with GDPR (General Data Protection Regulation) 
                  and other applicable data protection laws. This policy explains how we collect, use, and protect your personal data.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">📊 Data We Collect</h3>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Account Information:</strong> Name, email address, business details</li>
                  <li>• <strong>Usage Data:</strong> How you interact with our dashboard and features</li>
                  <li>• <strong>Technical Data:</strong> IP address, browser type, device information</li>
                  <li>• <strong>Business Data:</strong> Orders, customers, inventory, and analytics</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">🎯 How We Use Your Data</h3>
                <ul className="space-y-2 ml-4">
                  <li>• Provide and improve our business dashboard services</li>
                  <li>• Generate analytics and insights for your business</li>
                  <li>• Send important updates and notifications</li>
                  <li>• Ensure security and prevent fraud</li>
                  <li>• Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">🔒 Your GDPR Rights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Right to Access</h4>
                    <p className="text-blue-700">Request a copy of your personal data we hold</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Right to Rectification</h4>
                    <p className="text-green-700">Correct inaccurate or incomplete data</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Right to Erasure</h4>
                    <p className="text-orange-700">Request deletion of your personal data</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Right to Portability</h4>
                    <p className="text-purple-700">Export your data in a machine-readable format</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">🍪 Cookie Information</h3>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Necessary Cookies</h4>
                      <p>Essential for website functionality, cannot be disabled</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Analytics Cookies</h4>
                      <p>Help us understand website usage and improve performance</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Marketing Cookies</h4>
                      <p>Used for targeted advertising and marketing campaigns</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Preference Cookies</h4>
                      <p>Remember your settings and provide personalized experience</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">📞 Contact Us</h3>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                  <p className="mb-2">
                    <strong>Data Protection Officer:</strong> privacy@gowhats.com
                  </p>
                  <p className="mb-2">
                    <strong>Address:</strong> 123 Business Street, Mumbai, India 400001
                  </p>
                  <p>
                    <strong>Phone:</strong> +91 98765 43210
                  </p>
                </div>
              </section>

              <section className="border-t border-slate-200 pt-4">
                <p className="text-xs text-slate-500">
                  Last updated: {new Date().toLocaleDateString()} | 
                  This policy is compliant with GDPR, CCPA, and Indian Personal Data Protection Act
                </p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}