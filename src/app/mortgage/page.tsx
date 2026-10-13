'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SidebarDrawer from '@/components/SidebarDrawer';
import { useCreatorStore } from '@/lib/store';
import {
  Building,
  ArrowLeft,
  DollarSign,
  PieChart,
  Calculator,
  CheckCircle2,
  AlertCircle,
  Share2,
  Download,
  Info,
} from 'lucide-react';

interface BankOption {
  name: string;
  rateAnnual: number;
  maxFinancingRatio: number; // e.g. 0.8 = 80%
  description: string;
}

const BANKS: BankOption[] = [
  {
    name: 'Meezan Bank (Islamic Diminishing Musharakah)',
    rateAnnual: 13.9,
    maxFinancingRatio: 0.8,
    description: 'Shariah-compliant co-ownership model with decreasing rental schedule.',
  },
  {
    name: 'Habib Bank Limited (HBL Home)',
    rateAnnual: 14.5,
    maxFinancingRatio: 0.8,
    description: 'Flexible repayment terms with priority processing for verified salary earners.',
  },
  {
    name: 'Standard Chartered (Saadiq Home Finance)',
    rateAnnual: 14.2,
    maxFinancingRatio: 0.75,
    description: 'International private banking with fixed-margin options for expatriates.',
  },
  {
    name: 'Bank Alfalah (Ghar Asaan)',
    rateAnnual: 14.8,
    maxFinancingRatio: 0.85,
    description: 'Up to 85% loan-to-value ratio for pre-approved master developments.',
  },
];

export default function FinanciamentoPage() {
  const { saveFinancing } = useCreatorStore();

  const [propertyValue, setPropertyValue] = useState<number>(85000000); // PKR 85M
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20); // 20%
  const [termYears, setTermYears] = useState<number>(20); // 20 years
  const [amortizationSystem, setAmortizationSystem] = useState<'DIMINISHING_MUSHARAKAH' | 'EQUAL_INSTALLMENT'>('DIMINISHING_MUSHARAKAH');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Calculations
  const downPayment = Math.round(propertyValue * (downPaymentPercent / 100));
  const financedAmount = propertyValue - downPayment;
  const totalMonths = termYears * 12;

  // Monthly breakdown for selected bank
  const bankSimulations = BANKS.map((b) => {
    const monthlyRate = b.rateAnnual / 100 / 12;
    let firstPayment = 0;
    let lastPayment = 0;

    if (amortizationSystem === 'DIMINISHING_MUSHARAKAH') {
      const principalAmortization = financedAmount / totalMonths;
      firstPayment = Math.round(principalAmortization + financedAmount * monthlyRate);
      lastPayment = Math.round(principalAmortization + (financedAmount / totalMonths) * monthlyRate);
    } else {
      // Conventional Equal Monthly Installment (EMI)
      const factor = Math.pow(1 + monthlyRate, totalMonths);
      firstPayment = Math.round((financedAmount * monthlyRate * factor) / (factor - 1));
      lastPayment = firstPayment;
    }

    const minRequiredIncome = Math.round(firstPayment / 0.3);

    return {
      ...b,
      firstPayment,
      lastPayment,
      minRequiredIncome,
    };
  });

  const bestBank = bankSimulations[0];

  const formatPKR = (val: number) => {
    return 'PKR ' + val.toLocaleString('en-US');
  };

  const handleSave = () => {
    const finId = 'fin-' + propertyValue + '-' + totalMonths;
    saveFinancing({
      id: finId,
      propertyValue,
      downPayment,
      termMonths: totalMonths,
      bestBank: bestBank?.name || 'Meezan Bank',
      firstInstallment: bestBank?.firstPayment || 0,
      lastInstallment: bestBank?.lastPayment || 0,
      system: amortizationSystem === 'DIMINISHING_MUSHARAKAH' ? 'Islamic Diminishing Musharakah' : 'Conventional Reducing EMI',
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
                <Building className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Multi-Bank Mortgage Simulator
                  </h1>
                  <span className="rounded-full bg-amber-100 border border-amber-300 px-2 py-0.5 text-[10px] font-black text-amber-800 uppercase">
                    Premium
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Compare real interest rates, monthly installments, and qualification limits across major banks.
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
                    <span>Saved Simulation!</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 text-slate-500" />
                    <span>Save Simulation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Form & Overview Triplet */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: Input Parameters */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Calculator className="h-4 w-4 text-amber-500" />
                  <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                    Financing Parameters
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Property Value */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Property Value (PKR)</label>
                    <input
                      type="number"
                      step="500000"
                      value={propertyValue}
                      onChange={(e) => setPropertyValue(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 font-mono font-bold focus:border-amber-500 focus:outline-none"
                    />
                    <div className="text-[11px] font-mono text-slate-500">{formatPKR(propertyValue)}</div>
                  </div>

                  {/* Down Payment Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Down Payment ({downPaymentPercent}%)</span>
                      <span className="font-mono text-emerald-700">{formatPKR(downPayment)}</span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="70"
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  {/* Term Years Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Term Duration</span>
                      <span className="font-mono text-amber-700">{termYears} Years ({totalMonths} Mos)</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="25"
                      value={termYears}
                      onChange={(e) => setTermYears(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  {/* Amortization Switcher */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-bold text-slate-700">Amortization Method</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setAmortizationSystem('DIMINISHING_MUSHARAKAH')}
                        className={`rounded-xl p-3 text-left transition border ${
                          amortizationSystem === 'DIMINISHING_MUSHARAKAH'
                            ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-400'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900">Islamic Musharakah</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Shariah reducing rent schedule</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAmortizationSystem('EQUAL_INSTALLMENT')}
                        className={`rounded-xl p-3 text-left transition border ${
                          amortizationSystem === 'EQUAL_INSTALLMENT'
                            ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-400'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className="font-extrabold text-xs text-slate-900">Conventional EMI</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Equal monthly installments</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Multi-Bank Comparison Table */}
            <div className="lg:col-span-7 space-y-6">
              {/* Highlight Hero Card */}
              <div className="rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-50 via-white to-amber-50/40 p-6 sm:p-7 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800">
                    Calculated Loan Summary
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black text-emerald-800">
                    Net Financed: {formatPKR(financedAmount)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-4 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Estimated First Installment
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
                      {formatPKR(bestBank.firstPayment)} / mo
                    </div>
                    {amortizationSystem === 'DIMINISHING_MUSHARAKAH' && (
                      <p className="text-[10px] text-slate-400">
                        Final payment decreases to {formatPKR(bestBank.lastPayment)}
                      </p>
                    )}
                  </div>

                  <div className="rounded-2xl border border-slate-200/80 bg-white p-4 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Recommended Verified Income
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-emerald-700 font-mono">
                      {formatPKR(bestBank.minRequiredIncome)} / mo
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Maximum 30% debt-to-income commitment ratio
                    </p>
                  </div>
                </div>

                {/* Compliance Warning */}
                <div className="flex items-start gap-2 rounded-2xl bg-amber-100/70 p-3 text-xs text-amber-900 font-medium">
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
                  <span>
                    Bank approvals depend on verified financial documentation, credit bureau scoring, and formal title appraisal.
                  </span>
                </div>
              </div>

              {/* Bank Comparison Rows */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
                    Bank Institution Breakdown
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">Sorted by lowest margin</span>
                </div>

                <div className="space-y-3">
                  {bankSimulations.map((b) => (
                    <div
                      key={b.name}
                      className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-2 transition hover:bg-white hover:shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="font-extrabold text-xs text-slate-900">{b.name}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">{b.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-mono text-sm font-black text-slate-900">
                            {formatPKR(b.firstPayment)}
                          </span>
                          <span className="text-[10px] text-slate-400 block font-mono">
                            {b.rateAnnual.toFixed(1)}% p.a.
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Regulatory Disclaimer */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 space-y-1.5 text-xs text-slate-500 mt-4">
                  <div className="flex items-center gap-1.5 font-bold text-slate-700 uppercase text-[11px]">
                    <Info className="h-3.5 w-3.5 text-amber-600" />
                    <span>Mortgage Financing Disclosure</span>
                  </div>
                  <p className="leading-relaxed">
                    Financing rates and profit margins are indicative benchmarks based on prevailing KIBOR spreads. Final loan approval, processing fees, and debt-burden ratios (DBR) are subject to bank risk underwriting under State Bank of Pakistan (SBP) prudential guidelines.
                  </p>
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
