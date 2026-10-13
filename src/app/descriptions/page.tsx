'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SidebarDrawer from '@/components/SidebarDrawer';
import { useCreatorStore } from '@/lib/store';
import {
  FileText,
  Copy,
  Download,
  Share2,
  Mic,
  MicOff,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Bookmark,
  Layers,
  Wand2,
} from 'lucide-react';

interface SpeechRecognitionCustomEvent extends Event {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: {
      isFinal: boolean;
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface CustomSpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionCustomEvent) => void;
  onerror: (event: Event) => void;
  onend: () => void;
}

export default function DescricoesPage() {
  const { saveDescription } = useCreatorStore();

  const [propertyType, setPropertyType] = useState('Luxury Apartment');
  const [purpose, setPurpose] = useState('Sale');
  const [neighborhood, setNeighborhood] = useState('Gulberg III');
  const [city, setCity] = useState('Lahore');
  const [price, setPrice] = useState('PKR 85,000,000');
  const [area, setArea] = useState('350');
  const [bedrooms, setBedrooms] = useState('4');
  const [bathrooms, setBathrooms] = useState('4');
  const [parking, setParking] = useState('3');
  const [tone, setTone] = useState('Sophisticated & Ultra-Luxury');
  const [formatLength, setFormatLength] = useState<'short' | 'medium' | 'detailed'>('detailed');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Rooftop Swimming Pool',
    '24/7 Gated Security',
    'Spacious Panoramic Balcony',
    'Smart Home Automation',
  ]);
  const [specialNotes, setSpecialNotes] = useState(
    'Double-height ceiling, floor-to-ceiling glass windows, imported marble flooring, direct developer terms.'
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState(
    `🌟 RARE OPPORTUNITY: LUXURY APARTMENT IN GULBERG III — LAHORE\n\nDesigned for those who demand uncompromising comfort, security, and prestige, this property offers the ultimate blend of elegance and lifestyle convenience.\n\n📍 KEY HIGHLIGHTS:\n• Living Area: 350 sq.m\n• Bedrooms: 4 spacious en-suite bedrooms\n• Bathrooms: 4 designer luxury baths\n• Parking: 3 covered parking spaces\n• Listing Price (Sale): PKR 85,000,000\n\n💎 AMENITIES & FEATURES:\n• Rooftop Swimming Pool\n• 24/7 Gated Security\n• Spacious Panoramic Balcony\n• Smart Home Automation\n\n📝 AGENT NOTES & SPECIAL HIGHLIGHTS:\nDouble-height ceiling, floor-to-ceiling glass windows, imported marble flooring, direct developer terms.\n\nFull property appraisal dossier and mortgage simulation available upon request. Send a direct message or click our WhatsApp link to book your private VIP tour.\n\n#LuxuryRealEstate #LuxuryApartment #GulbergIII #Tameeros ShortsAI #ExclusiveListing #PrimeProperty`
  );
  const [isListening, setIsListening] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const recognitionRef = useRef<CustomSpeechRecognition | null>(null);

  const ALL_AMENITIES = [
    'Rooftop Swimming Pool',
    '24/7 Gated Security',
    'Spacious Panoramic Balcony',
    'Private Gym & Fitness Center',
    'Smart Home Automation',
    'Outdoor Gourmet BBQ Lounge',
    'Solar Backup Power System',
    'High-Speed Private Elevator',
    'Landscaped Private Garden',
    'Kids Play Sanctuary',
    'Concierge & Valet Service',
  ];

  const toggleAmenity = (item: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleToggleVoiceDictation = () => {
    if (typeof window === 'undefined') return;

    const SpeechRec =
      (window as unknown as { SpeechRecognition?: new () => CustomSpeechRecognition }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => CustomSpeechRecognition }).webkitSpeechRecognition;

    if (!SpeechRec) {
      alert('Your browser does not support native speech recognition. Please use Google Chrome or Microsoft Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRec();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event: SpeechRecognitionCustomEvent) => {
      let speechText = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i]?.isFinal && event.results[i]?.[0]?.transcript) {
          speechText += event.results[i][0].transcript;
        }
      }
      if (speechText) {
        setSpecialNotes((prev) => (prev ? prev + ' ' : '') + speechText);
      }
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  const handleGenerate = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const amenitiesStr = selectedAmenities.map((a) => `• ${a}`).join('\n');
      let result = '';

      if (formatLength === 'short') {
        result = `✨ EXCLUSIVE ${propertyType.toUpperCase()} IN ${neighborhood.toUpperCase()}!\n\n📍 ${bedrooms} Bedrooms | ${area} sq.m / sq.ft | ${parking} Parking Spots\n💰 Price: ${price}\n\n${specialNotes}\n\n📲 Schedule your private walkthrough today via WhatsApp! Link in bio.`;
      } else if (formatLength === 'medium') {
        result = `🏡 Experience world-class sophistication and modern elegance in ${neighborhood}, ${city}.\n\nThis magnificent ${propertyType.toLowerCase()} combines architectural finesse with exceptional lifestyle amenities:\n\n${amenitiesStr}\n\n📐 Total Area: ${area} sq.m\n🛏️ Suites / Bedrooms: ${bedrooms}\n🚿 Bathrooms: ${bathrooms}\n🚗 Parking: ${parking} covered spots\n💰 Asking Price: ${price}\n\n${specialNotes}\n\n🔑 Reserve your private walkthrough today. Direct flexible purchase terms available via WhatsApp!`;
      } else {
        result = `🌟 RARE OPPORTUNITY: LUXURY ${propertyType.toUpperCase()} IN ${neighborhood.toUpperCase()} — ${city.toUpperCase()}\n\nDesigned for those who demand uncompromising comfort, security, and prestige, this property offers the ultimate blend of elegance and lifestyle convenience.\n\n📍 KEY HIGHLIGHTS:\n• Living Area: ${area} sq.m\n• Bedrooms: ${bedrooms} spacious en-suite bedrooms\n• Bathrooms: ${bathrooms} designer luxury baths\n• Parking: ${parking} covered parking spaces\n• Listing Price (${purpose}): ${price}\n\n💎 AMENITIES & FEATURES:\n${amenitiesStr}\n\n📝 AGENT NOTES & SPECIAL HIGHLIGHTS:\n${specialNotes}\n\nFull property appraisal dossier and mortgage simulation available upon request. Send a direct message or click our WhatsApp link to book your private VIP tour.\n\n#LuxuryRealEstate #${propertyType.replace(/\s+/g, '')} #${neighborhood.replace(/\s+/g, '')} #Tameeros ShortsAI #ExclusiveListing #PrimeProperty`;
      }

      setGeneratedOutput(result);
      setIsGenerating(false);
    }, 600);
  };

  const handleCopy = () => {
    if (!generatedOutput) return;
    navigator.clipboard.writeText(generatedOutput);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!generatedOutput) return;
    const blob = new Blob([generatedOutput], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `listing-description-${neighborhood.toLowerCase().replace(/\s+/g, '-')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveToStore = () => {
    if (!generatedOutput) return;
    saveDescription({
      id: `desc-${Date.now()}`,
      title: `${propertyType} in ${neighborhood}, ${city}`,
      propertyType,
      location: `${neighborhood}, ${city}`,
      tone,
      shortCopy: generatedOutput.slice(0, 160) + '...',
      detailedCopy: generatedOutput,
      hashtags: ['#LuxuryRealEstate', `#${propertyType.replace(/\s+/g, '')}`, '#Tameeros ShortsAI'],
      createdAt: new Date().toISOString(),
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleShareWhatsApp = () => {
    if (!generatedOutput) return;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(generatedOutput)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <SidebarDrawer />
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                title="Back to Dashboard"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-md">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  AI Property Description Generator
                </h1>
                <p className="text-xs text-slate-500">
                  Craft compelling, high-converting property listings and social posts with built-in voice dictation.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleVoiceDictation}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition shadow-xs ${
                  isListening
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="h-4 w-4" />
                    <span>Listening... (Click to stop)</span>
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 text-[#E50914]" />
                    <span>Voice Dictation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Form & Output Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 6 Cols: Form Inputs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Wand2 className="h-4 w-4 text-[#E50914]" />
                  <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                    Property Specifications
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Property Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Property Type</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-800 focus:border-[#E50914] focus:outline-none"
                    >
                      <option>Luxury Apartment</option>
                      <option>Duplex Penthouse</option>
                      <option>Contemporary Villa</option>
                      <option>Commercial Office</option>
                      <option>Townhouse</option>
                      <option>Prime Land Plot</option>
                    </select>
                  </div>

                  {/* Purpose */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Listing Purpose</label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-800 focus:border-[#E50914] focus:outline-none"
                    >
                      <option>Sale</option>
                      <option>Rental</option>
                      <option>Pre-Launch Opportunity</option>
                      <option>Commercial Lease</option>
                    </select>
                  </div>

                  {/* Neighborhood */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Neighborhood / Sector</label>
                    <input
                      type="text"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      placeholder="e.g. Gulberg III, DHA Phase 6"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 focus:border-[#E50914] focus:outline-none"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Lahore, Karachi, Islamabad"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 focus:border-[#E50914] focus:outline-none"
                    />
                  </div>

                  {/* Price */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Asking Price</label>
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. PKR 85,000,000"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 font-mono focus:border-[#E50914] focus:outline-none"
                    />
                  </div>

                  {/* Area */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Usable Area (sq.m or sq.ft)</label>
                    <input
                      type="text"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="e.g. 350 sq.m / 3,767 sq.ft"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 font-mono focus:border-[#E50914] focus:outline-none"
                    />
                  </div>

                  {/* Bedrooms, Bathrooms, Parking */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Bedrooms</label>
                    <input
                      type="number"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 focus:border-[#E50914] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Bathrooms</label>
                    <input
                      type="number"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 focus:border-[#E50914] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Parking Spaces</label>
                    <input
                      type="number"
                      value={parking}
                      onChange={(e) => setParking(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 focus:border-[#E50914] focus:outline-none"
                    />
                  </div>

                  {/* Tone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Tone of Voice</label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-800 focus:border-[#E50914] focus:outline-none"
                    >
                      <option>Sophisticated & Ultra-Luxury</option>
                      <option>Emotional & Family Comfort</option>
                      <option>Direct & High-ROI Investment</option>
                      <option>Inspiring Lifestyle Storytelling</option>
                    </select>
                  </div>
                </div>

                {/* Length Selector */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-slate-700">Format Length</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'short', label: 'Short (Social Hooks)' },
                      { id: 'medium', label: 'Medium (Portals)' },
                      { id: 'detailed', label: 'Complete Dossier' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFormatLength(f.id as 'short' | 'medium' | 'detailed')}
                        className={`rounded-xl px-3 py-2 text-xs font-bold transition text-center ${
                          formatLength === f.id
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities Chips */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-slate-700">
                    Amenities & Lifestyle Highlights ({selectedAmenities.length} selected)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {ALL_AMENITIES.map((item) => {
                      const sel = selectedAmenities.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleAmenity(item)}
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                            sel
                              ? 'bg-[#E50914] text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {sel ? '✓ ' : '+ '}
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Special Notes & Voice Input */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">
                      Special Highlights (Dictate or Type)
                    </label>
                    {isListening && (
                      <span className="text-[10px] text-red-600 font-bold animate-pulse">
                        ● Recording speech live...
                      </span>
                    )}
                  </div>
                  <textarea
                    rows={3}
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="e.g. Double-height ceilings, park view, flexible installment schedule..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#E50914] focus:outline-none"
                  />
                </div>

                {/* Generate Button */}
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 via-red-600 to-[#E50914] py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-red-500/25 hover:opacity-95 transition disabled:opacity-50"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{isGenerating ? 'Formulating Listing Copy...' : 'Generate Full Description'}</span>
                </button>
              </div>
            </div>

            {/* Right 6 Cols: Generated Output Preview & Export Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-orange-600" />
                    <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                      AI Generated Copy
                    </h2>
                  </div>

                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black text-emerald-800 uppercase">
                    Ready to Publish
                  </span>
                </div>

                {/* Output Textbox */}
                <div className="relative rounded-2xl border border-slate-200 bg-slate-50/70 p-5 font-mono text-xs text-slate-800 whitespace-pre-line leading-relaxed min-h-[360px] max-h-[500px] overflow-y-auto">
                  {generatedOutput || 'Configure the property parameters and click Generate.'}
                </div>

                {/* Export & Action Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
                  >
                    {copySuccess ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-slate-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveToStore}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
                  >
                    {saveSuccess ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Saved!</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-3.5 w-3.5 text-amber-500" />
                        <span>Save</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadTxt}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
                  >
                    <Download className="h-3.5 w-3.5 text-blue-600" />
                    <span>Download .txt</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShareWhatsApp}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 py-2.5 text-xs font-bold text-white transition shadow-sm"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
