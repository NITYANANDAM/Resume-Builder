import React, { useState } from 'react';
import { 
  Smartphone, 
  Apple, 
  Play, 
  Star, 
  Download, 
  Share2, 
  Check, 
  Copy, 
  BarChart3, 
  ShieldCheck, 
  Search, 
  Sparkles,
  ExternalLink,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import confetti from 'canvas-confetti';

export const AppStoreCenter: React.FC = () => {
  const [platform, setPlatform] = useState<'ios' | 'android'>('ios');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // ASO Metadata Editable State
  const [appTitle, setAppTitle] = useState('ExecutiveResume: AI CV & Jobs');
  const [appSubtitle, setAppSubtitle] = useState('ATS Resume Builder & LinkedIn');
  const [shortDescAndroid, setShortDescAndroid] = useState('Build ATS-compliant executive resumes in seconds & apply 1-click on LinkedIn.');
  const [keywordsIOS, setKeywordsIOS] = useState('resume,cv,pdf,builder,ats,linkedin,jobs,recruiter,career,portfolio,executive,interview');

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleExportPackage = () => {
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    const configData = {
      packageId: 'com.executiveresume.pro',
      appName: appTitle,
      subtitle: appSubtitle,
      keywords: keywordsIOS,
      version: '2.4.0',
      pwaUrl: window.location.origin,
      twaConfig: {
        host: window.location.hostname,
        assetLinksPath: '/.well-known/assetlinks.json'
      },
      asoScore: 98,
    };
    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AppStore_GooglePlay_Publishing_Manifest.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Smartphone className="w-4 h-4" />
              <span>Multi-Platform Publishing & ASO Command Center</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              App Store & Google Play Storefront + ASO Optimization
            </h2>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed mt-1">
              Maximize organic discoverability for executive job seekers and recruiters. Optimize metadata for Apple App Store & Google Play search algorithms, test live store listings, and install the native PWA.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <PWAInstallButton />
            <button
              onClick={handleExportPackage}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs border border-slate-700 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export Store Package</span>
            </button>
          </div>
        </div>

        {/* Platform Switcher */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setPlatform('ios')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                platform === 'ios'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Apple className="w-4 h-4" />
              <span>Apple App Store (iOS)</span>
            </button>

            <button
              onClick={() => setPlatform('android')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                platform === 'android'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Google Play Store (Android)</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              PWA Standalone Compliant
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              ASO Score: 98/100
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Realistic Store Listing Mockup */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            {/* Store Header Mockup */}
            <div className="p-4 border-b border-slate-800/80 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                {platform === 'ios' ? (
                  <Apple className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 text-emerald-400 fill-current" />
                )}
                <span className="font-semibold text-slate-200">
                  {platform === 'ios' ? 'App Store Preview' : 'Google Play Store Preview'}
                </span>
              </div>
              <span className="text-[11px] text-amber-400 font-mono">Live Simulation</span>
            </div>

            <div className="p-6 space-y-6">
              {/* Main Product Lockup */}
              <div className="flex items-start gap-4">
                <img
                  src="/src/assets/images/app_logo_recruiter_1793544806092.jpg"
                  alt="App Icon"
                  className="w-20 h-20 rounded-2xl shadow-xl border border-slate-700/60 object-cover shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                    {appTitle}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">
                    {platform === 'ios' ? appSubtitle : 'Executive Career Technologies'}
                  </p>
                  
                  {/* Rating & Badge Row */}
                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <span>4.9</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400">38.4K Ratings</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-emerald-400 font-medium">#1 in Business</span>
                  </div>
                </div>

                <div className="shrink-0">
                  <PWAInstallButton />
                </div>
              </div>

              {/* Highlights Strip */}
              <div className="grid grid-cols-4 gap-2 text-center py-3 border-y border-slate-800 text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Rank</div>
                  <div className="font-bold text-white mt-0.5">#1</div>
                  <div className="text-[9px] text-slate-500">Business</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Age</div>
                  <div className="font-bold text-white mt-0.5">4+</div>
                  <div className="text-[9px] text-slate-500">Years</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Format</div>
                  <div className="font-bold text-amber-400 mt-0.5">PDF & ATS</div>
                  <div className="text-[9px] text-slate-500">Instant</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Jobs</div>
                  <div className="font-bold text-blue-400 mt-0.5">1-Click</div>
                  <div className="text-[9px] text-slate-500">LinkedIn</div>
                </div>
              </div>

              {/* Store Screenshots Carousel */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-300">Preview Screenshots</div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[9/16] bg-slate-950 relative group">
                    <img
                      src="/src/assets/images/store_feature_banner_1793544807143.jpg"
                      alt="Resume Templates"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 to-transparent text-[10px] text-white font-medium">
                      5 Executive Formats
                    </div>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[9/16] bg-slate-950 relative group">
                    <img
                      src="/src/assets/images/hero_recruiter_workspace_1793544808301.jpg"
                      alt="Recruiter Review"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 to-transparent text-[10px] text-white font-medium">
                      Recruiter Approved
                    </div>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[9/16] bg-slate-950 relative group">
                    <img
                      src="/src/assets/images/job_seeker_success_1793544808166.jpg"
                      alt="Job Seeker Success"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 to-transparent text-[10px] text-white font-medium">
                      1-Click Job Offers
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Preview */}
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="font-semibold text-white">About this App</div>
                <p className="text-slate-400 leading-relaxed text-[11.5px]">
                  {platform === 'ios'
                    ? 'ExecutiveResume Pro empowers top-tier professionals, directors, and executives to generate Harvard and Silicon Valley-standard resumes in seconds. Designed with ATS algorithms in mind and paired with seamless LinkedIn Easy Apply synchronization.'
                    : shortDescAndroid}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): ASO Optimizer & Keyword Bank */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-amber-400" />
                  <span>ASO Search Algorithm Optimizer</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Fine-tune character limits for maximum Apple & Google ranking.
                </p>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold text-[10px]">
                98% Rank
              </span>
            </div>

            {/* Field 1: App Title (30 Chars Limit) */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <label className="font-semibold text-slate-300">App Title (Max 30 chars)</label>
                <span className={`font-mono ${appTitle.length > 30 ? 'text-rose-400' : 'text-slate-400'}`}>
                  {appTitle.length} / 30 chars
                </span>
              </div>
              <input
                type="text"
                value={appTitle}
                maxLength={30}
                onChange={(e) => setAppTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
              />
              <p className="text-[10px] text-slate-500">Includes brand & primary search query.</p>
            </div>

            {/* Field 2: Subtitle (iOS 30 Chars) or Short Desc (Android 80 Chars) */}
            {platform === 'ios' ? (
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <label className="font-semibold text-slate-300">iOS Subtitle (Max 30 chars)</label>
                  <span className={`font-mono ${appSubtitle.length > 30 ? 'text-rose-400' : 'text-slate-400'}`}>
                    {appSubtitle.length} / 30 chars
                  </span>
                </div>
                <input
                  type="text"
                  value={appSubtitle}
                  maxLength={30}
                  onChange={(e) => setAppSubtitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <label className="font-semibold text-slate-300">Android Short Description (Max 80 chars)</label>
                  <span className={`font-mono ${shortDescAndroid.length > 80 ? 'text-rose-400' : 'text-slate-400'}`}>
                    {shortDescAndroid.length} / 80 chars
                  </span>
                </div>
                <input
                  type="text"
                  value={shortDescAndroid}
                  maxLength={80}
                  onChange={(e) => setShortDescAndroid(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                />
              </div>
            )}

            {/* Field 3: iOS 100-Character Keyword Bank */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <label className="font-semibold text-slate-300">iOS Keyword Field (Max 100 chars)</label>
                <span className={`font-mono ${keywordsIOS.length > 100 ? 'text-rose-400 font-bold' : 'text-amber-400'}`}>
                  {keywordsIOS.length} / 100 chars
                </span>
              </div>
              <textarea
                rows={3}
                value={keywordsIOS}
                maxLength={100}
                onChange={(e) => setKeywordsIOS(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono text-[11px]"
              />
              <div className="flex justify-between items-center pt-0.5">
                <span className="text-[10px] text-slate-500">Comma-separated, no spaces between tags.</span>
                <button
                  onClick={() => copyText(keywordsIOS, 'kw')}
                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  {copiedKey === 'kw' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'kw' ? 'Copied' : 'Copy Keywords'}</span>
                </button>
              </div>
            </div>

            {/* Publishing Steps Guide */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="font-semibold text-white text-[11px] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant App Store & Google Play Distribution</span>
              </div>
              <div className="space-y-1 text-[11px] text-slate-400">
                <div className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">1.</span>
                  <span><strong className="text-slate-200">Google Play:</strong> Wrap via PWABuilder / Bubblewrap for native .aab file and publish to Google Play Console.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">2.</span>
                  <span><strong className="text-slate-200">Apple App Store:</strong> Use Capacitor or PWABuilder iOS target to generate Xcode project for App Store Connect.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">3.</span>
                  <span><strong className="text-slate-200">Direct Web Install:</strong> Users can tap &quot;Install App&quot; right now to run in standalone app mode!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
