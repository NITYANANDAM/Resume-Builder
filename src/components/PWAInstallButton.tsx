import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, CheckCircle2, Apple } from 'lucide-react';

export const PWAInstallButton: React.FC<{ variant?: 'header' | 'badge' | 'card' }> = ({ variant = 'header' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showDirectAndroidModal, setShowDirectAndroidModal] = useState(false);

  if (isInstalled) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 rounded-lg">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>Installed PWA</span>
      </div>
    );
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-1.5 text-xs font-semibold text-slate-950 shadow-sm hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer whitespace-nowrap shrink-0"
        title="Install ExecutiveResume Pro directly to your home screen or desktop"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-800 transition cursor-pointer whitespace-nowrap shrink-0"
        >
          <Apple className="w-3.5 h-3.5 text-slate-400" />
          <span>Install iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-slate-100 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Apple className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-semibold text-white">Install on iPhone / iPad</h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold shrink-0 mt-0.5">1</span>
                  <p>Tap the <strong className="text-white">Share</strong> icon in the Safari bottom toolbar.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold shrink-0 mt-0.5">2</span>
                  <p>Scroll down and select <strong className="text-white">Add to Home Screen</strong>.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold shrink-0 mt-0.5">3</span>
                  <p>Tap <strong className="text-white">Add</strong> in top-right to launch ExecutiveResume Pro in standalone fullscreen mode!</p>
                </div>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-6 w-full rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 py-2.5 text-xs font-semibold tracking-wide transition cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Universal button for desktop or Android when prompt hasn't triggered yet or browser needs guided prompt
  return (
    <>
      <button
        onClick={() => setShowDirectAndroidModal(true)}
        className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer whitespace-nowrap shrink-0"
        title="Add to Home Screen / Mobile App"
      >
        <Smartphone className="w-3.5 h-3.5 text-amber-400" />
        <span>Install App</span>
      </button>

      {showDirectAndroidModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-semibold text-white">Install ExecutiveResume Pro</h3>
              </div>
              <button
                onClick={() => setShowDirectAndroidModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>
                ExecutiveResume Pro is fully built as a Progressive Web Application (PWA). You can install it on your device for fast offline access, instant PDF generating, and native window behavior:
              </p>
              <div className="rounded-xl bg-slate-950 p-3.5 border border-slate-800/80 space-y-2 text-xs">
                <div><span className="text-amber-400 font-semibold">Chrome / Edge:</span> Click the install icon in the address bar or menu &gt; &quot;Install app&quot;.</div>
                <div><span className="text-amber-400 font-semibold">Android:</span> Tap Chrome menu (⋮) &gt; &quot;Add to Home screen&quot; or &quot;Install app&quot;.</div>
                <div><span className="text-amber-400 font-semibold">iOS Safari:</span> Tap Share icon &gt; &quot;Add to Home Screen&quot;.</div>
              </div>
            </div>
            <div className="mt-5 flex gap-2.5">
              <button
                onClick={() => setShowDirectAndroidModal(false)}
                className="flex-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 text-xs font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = usePWAInstall().isInstallable; // Or online hook
  // Let's use navigator.onLine hook
  const [online, setOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  React.useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (online) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-medium text-slate-950 shadow-lg">
      <span className="h-2 w-2 rounded-full bg-slate-950 animate-pulse" />
      Offline Mode — Cached local data is being used.
    </div>
  );
};
