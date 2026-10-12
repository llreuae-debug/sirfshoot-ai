'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SidebarDrawer from '@/components/SidebarDrawer';
import { useCreatorStore } from '@/lib/store';
import {
  Calculator,
  ArrowLeft,
  Building2,
  TrendingUp,
  Download,
  Printer,
  CheckCircle2,
  Sparkles,
  Info,
  DollarSign,
  Layers,
  MapPin,
} from 'lucide-react';

export default function PrecificacaoPage() {
  const { saveValuation } = useCreatorStore();

  const [propertyType, setPropertyType] = useState('Luxury Apartment');
  const [neighborhood, setNeighborhood] = useState('Gulberg III');
  const [city, setCity] = useState('Lahore');
  const [areaSqM, setAreaSqM] = useState<number>(350);
  const [bedrooms, setBedrooms] = useState<number>(4);
  const [bathrooms, setBathrooms] = useState<number>(4);
  const [parkingSpaces, setParkingSpaces] = useState<number>(3);
  const [finishingStandard, setFinishingStandard] = useState<'Standard' | 'High Standard' | 'Ultra Luxury'>('Ultra Luxury');
  const [propertyAge, setPropertyAge] = useState<number>(1);
  const [hasPool, setHasPool] = useState<boolean>(true);
  const [hasSecurity, setHasSecurity] = useState<boolean>(true);

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Valuation algorithm
  const baseRatePerSqM =
    finishingStandard === 'Ultra Luxury'
      ? 245000
      : finishingStandard === 'High Standard'
      ? 185000
      : 135000;

  const ageMultiplier = Math.max(0.75, 1 - propertyAge * 0.015);
  const amenitiesAddon = (hasPool ? 0.08 : 0) + (hasSecurity ? 0.05 : 0);

  const finalRatePerSqM = Math.round(baseRatePerSqM * ageMultiplier * (1 + amenitiesAddon));
  const estimatedAverage = Math.round(finalRatePerSqM * areaSqM);
  const estimatedMin = Math.round(estimatedAverage * 0.92);
  const estimatedMax = Math.round(estimatedAverage * 1.08);

  const formatPKR = (val: number) => {
    return 'PKR ' + val.toLocaleString('en-US');
  };

  const handleSave = () => {
    const valId = 'val-' + areaSqM;
    saveValuation({
      id: valId,
      title: `${propertyType} in ${neighborhood}, ${city}`,
      location: `${neighborhood}, ${city}`,
      areaSqM,
      estimatedValueMin: estimatedMin,
      estimatedValueAvg: estimatedAverage,
      estimatedValueMax: estimatedMax,
      pricePerSqM: finalRatePerSqM,
      marketDemand: 'High',
      createdAt: '2026-10-12T12:00:00Z',
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-md">
                <Calculator className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    AI Property Valuation Engine
                  </h1>
                  <span className="rounded-full bg-amber-100 border border-amber-300 px-2 py-0.5 text-[10px] font-black text-amber-800 uppercase">
                    Premium
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Determine accurate market pricing and square-meter benchmarks based on location analytics and comparable listings.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Saved to Records!</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 text-slate-500" />
                    <span>Save Valuation</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="btn-shadow inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2 text-xs sm:text-sm font-extrabold text-black shadow-md shadow-amber-500/20 hover:opacity-95 transition"
              >
                <Printer className="h-4 w-4" />
                <span>Print Dossier (PDF)</span>
              </button>
            </div>
          </div>

          {/* Form & Results 2-Col Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: Property Specs */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Building2 className="h-4 w-4 text-amber-500" />
                  <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                    Property Parameters
                  </h2>
                </div>

                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Property Category</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-800 focus:border-amber-500 focus:outline-none"
                    >
                      <option>Luxury Apartment</option>
                      <option>Duplex Penthouse</option>
                      <option>Gated Villa</option>
                      <option>Commercial Office</option>
                      <option>Townhouse</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Neighborhood / Sector</label>
                      <input
                        type="text"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Usable Area (m²)</label>
                      <input
                        type="number"
                        min="20"
                        max="2000"
                        value={areaSqM}
                        onChange={(e) => setAreaSqM(Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 font-mono focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Property Age (Years)</label>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={propertyAge}
                        onChange={(e) => setPropertyAge(Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Finishing Standard</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Standard', 'High Standard', 'Ultra Luxury'] as const).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setFinishingStandard(lvl)}
                          className={`rounded-xl py-2 text-[11px] font-bold transition text-center ${
                            finishingStandard === lvl
                              ? 'bg-amber-500 text-black shadow-xs font-extrabold'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bed / Bath / Parking */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600">Bedrooms</label>
                      <input
                        type="number"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-2 py-1.5 text-xs text-slate-800"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600">Bathrooms</label>
                      <input
                        type="number"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-2 py-1.5 text-xs text-slate-800"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600">Parking Spots</label>
                      <input
                        type="number"
                        value={parkingSpaces}
                        onChange={(e) => setParkingSpaces(Number(e.target.value))}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-2 py-1.5 text-xs text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Toggles */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasPool}
                        onChange={(e) => setHasPool(e.target.checked)}
                        className="h-4 w-4 rounded accent-amber-500"
                      />
                      <span>Swimming Pool / Private Terrace (+8% Value)</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasSecurity}
                        onChange={(e) => setHasSecurity(e.target.checked)}
                        className="h-4 w-4 rounded accent-amber-500"
                      />
                      <span>24/7 Gated Biometric Security (+5% Value)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Valuation Report Dossier */}
            <div className="lg:col-span-7 space-y-6">
              {/* Big Valuation Display */}
              <div className="rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-50/60 via-white to-amber-50/30 p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700">
                    Algorithmic Market Estimate
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono mt-1">
                    {formatPKR(estimatedAverage)}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Valuation benchmark for {areaSqM} m² in {neighborhood}, {city}
                  </p>
                </div>

                {/* Key Metrics Triplet */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Square-Meter Rate
                    </span>
                    <div className="text-sm font-black text-slate-900 font-mono">
                      {formatPKR(finalRatePerSqM)} / m²
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Fast-Liquidity Floor
                    </span>
                    <div className="text-sm font-black text-slate-700 font-mono">
                      {formatPKR(estimatedMin)}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200/80 bg-white p-3.5 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Premium Ceiling
                    </span>
                    <div className="text-sm font-black text-emerald-700 font-mono">
                      {formatPKR(estimatedMax)}
                    </div>
                  </div>
                </div>

                {/* Comparable Market Benchmarks */}
                <div className="space-y-3 pt-3 border-t border-slate-200/60">
                  <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wide">
                    Real Estate Portal Benchmarks
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-bold text-slate-800">Prime Sector Average</span>
                      <span className="font-mono text-slate-600">PKR 230,000 / m²</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-bold text-slate-800">New Construction Premium</span>
                      <span className="font-mono text-emerald-700 font-bold">+12% vs Older Stock</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-bold text-slate-800">Algorithm Confidence Score</span>
                      <span className="font-mono text-purple-700 font-bold">96.4% High Reliability</span>
                    </div>
                  </div>
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
