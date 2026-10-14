import React, { useState, useEffect, useMemo } from 'react';
import { GrowthRecord } from '../types';
import { soundManager } from '../utils/audio';

const STORAGE_KEY = 'lullaby_growth_records';

const DEFAULT_RECORDS: GrowthRecord[] = [
  {
    id: 'rec-0',
    date: '2025-10-15',
    ageMonths: 0,
    weightKg: 3.3,
    heightCm: 50,
    milestone: 'Welcome to the world! First cuddle 💕',
    notes: 'Born healthy and alert, loves gentle humming.',
  },
  {
    id: 'rec-1',
    date: '2025-11-15',
    ageMonths: 1,
    weightKg: 4.3,
    heightCm: 54.5,
    milestone: 'First social smile & eye contact ✨',
    notes: 'Tracks black & white mobile pieces eagerly.',
  },
  {
    id: 'rec-2',
    date: '2025-12-15',
    ageMonths: 2,
    weightKg: 5.5,
    heightCm: 58.2,
    milestone: 'Coos, bubbles & discovers hands 🧸',
    notes: 'Smiles whenever the crib mobile chimes.',
  },
  {
    id: 'rec-4',
    date: '2026-02-15',
    ageMonths: 4,
    weightKg: 6.8,
    heightCm: 64.0,
    milestone: 'Rolled tummy-to-back & grasps rattle 🎵',
    notes: 'Loves the wooden beechwood rattle teether.',
  },
  {
    id: 'rec-6',
    date: '2026-04-15',
    ageMonths: 6,
    weightKg: 8.0,
    heightCm: 68.2,
    milestone: 'First puree spoon & sitting supported 🥣',
    notes: 'Sits up with pillows and babbles excitedly.',
  },
  {
    id: 'rec-9',
    date: '2026-07-15',
    ageMonths: 9,
    weightKg: 9.2,
    heightCm: 72.5,
    milestone: 'Crawling fast & playing peek-a-boo 🙈',
    notes: 'Pulls up on the wooden activity walker cart!',
  },
  {
    id: 'rec-12',
    date: '2026-10-15',
    ageMonths: 12,
    weightKg: 10.3,
    heightCm: 76.5,
    milestone: 'First standing balance & baby words! 🎂',
    notes: 'Said "baba" and clapped hands at first birthday.',
  },
];

// World Health Organization (WHO) Median Reference Curve (0 - 24 months)
const WHO_MEDIAN: { age: number; weight: number; height: number }[] = [
  { age: 0, weight: 3.3, height: 49.9 },
  { age: 1, weight: 4.5, height: 54.7 },
  { age: 2, weight: 5.6, height: 58.4 },
  { age: 4, weight: 7.0, height: 63.9 },
  { age: 6, weight: 7.9, height: 67.6 },
  { age: 9, weight: 8.9, height: 72.0 },
  { age: 12, weight: 9.6, height: 75.7 },
  { age: 18, weight: 10.9, height: 82.3 },
  { age: 24, weight: 12.2, height: 87.8 },
];

const PRESET_MILESTONES = [
  'First Social Smile 😊',
  'Rolled Over 🌀',
  'First Tooth 🦷',
  'Sitting Independently 🧸',
  'First Spoonful 🥣',
  'Crawling Everywhere 🐛',
  'First Steps 👣',
  'First Words 💬',
];

export const GrowthTracker: React.FC = () => {
  const [records, setRecords] = useState<GrowthRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore error
        }
      }
    }
    return DEFAULT_RECORDS;
  });

  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [activeMetric, setActiveMetric] = useState<'weight' | 'height' | 'both'>('weight');
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [formAgeMonths, setFormAgeMonths] = useState<number>(records.length > 0 ? Math.max(...records.map(r => r.ageMonths)) + 1 : 1);
  const [formDate, setFormDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [formWeight, setFormWeight] = useState<string>('10.8');
  const [formHeight, setFormHeight] = useState<string>('78.0');
  const [formMilestone, setFormMilestone] = useState<string>('');
  const [formNotes, setFormNotes] = useState<string>('');
  const [showCelebrationBanner, setShowCelebrationBanner] = useState(false);

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    }
  }, [records]);

  // Sort chronologically
  const sortedRecords = useMemo(() => {
    return [...records].sort((a, b) => a.ageMonths - b.ageMonths);
  }, [records]);

  // Conversions
  const formatWeight = (kg: number) => {
    if (unitSystem === 'imperial') {
      const lbs = kg * 2.20462;
      return `${lbs.toFixed(1)} lbs`;
    }
    return `${kg.toFixed(1)} kg`;
  };

  const formatHeight = (cm: number) => {
    if (unitSystem === 'imperial') {
      const inches = cm * 0.393701;
      return `${inches.toFixed(1)} in`;
    }
    return `${cm.toFixed(1)} cm`;
  };

  // SVG Chart Geometry Calculations
  const chartWidth = 800;
  const chartHeight = 320;
  const padding = { top: 35, right: 45, bottom: 45, left: 55 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const maxAge = Math.max(12, ...sortedRecords.map((r) => r.ageMonths), 12);
  const minAge = 0;

  // Weight Domain (kg)
  const minWeight = 2;
  const maxWeight = Math.max(14, ...sortedRecords.map((r) => r.weightKg)) + 1;

  // Height Domain (cm)
  const minHeight = 45;
  const maxHeight = Math.max(90, ...sortedRecords.map((r) => r.heightCm)) + 3;

  const getX = (ageMonths: number) => {
    const ratio = (ageMonths - minAge) / (maxAge - minAge || 1);
    return padding.left + ratio * innerWidth;
  };

  const getYWeight = (weightKg: number) => {
    const ratio = (weightKg - minWeight) / (maxWeight - minWeight || 1);
    return padding.top + innerHeight - ratio * innerHeight;
  };

  const getYHeight = (heightCm: number) => {
    const ratio = (heightCm - minHeight) / (maxHeight - minHeight || 1);
    return padding.top + innerHeight - ratio * innerHeight;
  };

  // Generate smooth SVG paths
  const weightPoints = sortedRecords.map((r) => ({
    x: getX(r.ageMonths),
    y: getYWeight(r.weightKg),
  }));

  const heightPoints = sortedRecords.map((r) => ({
    x: getX(r.ageMonths),
    y: getYHeight(r.heightCm),
  }));

  const whoWeightPoints = WHO_MEDIAN.filter((p) => p.age <= maxAge).map((p) => ({
    x: getX(p.age),
    y: getYWeight(p.weight),
  }));

  const whoHeightPoints = WHO_MEDIAN.filter((p) => p.age <= maxAge).map((p) => ({
    x: getX(p.age),
    y: getYHeight(p.height),
  }));

  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const weightPath = createSmoothPath(weightPoints);
  const heightPath = createSmoothPath(heightPoints);
  const whoWeightPath = createSmoothPath(whoWeightPoints);
  const whoHeightPath = createSmoothPath(whoHeightPoints);

  // Closed area fills for gradients
  const weightArea = weightPoints.length > 1
    ? `${weightPath} L ${weightPoints[weightPoints.length - 1].x} ${padding.top + innerHeight} L ${weightPoints[0].x} ${padding.top + innerHeight} Z`
    : '';

  const heightArea = heightPoints.length > 1
    ? `${heightPath} L ${heightPoints[heightPoints.length - 1].x} ${padding.top + innerHeight} L ${heightPoints[0].x} ${padding.top + innerHeight} Z`
    : '';

  // Active or hovered record
  const selectedRecord = useMemo(() => {
    if (!selectedRecordId) return sortedRecords[sortedRecords.length - 1] || null;
    return sortedRecords.find((r) => r.id === selectedRecordId) || sortedRecords[sortedRecords.length - 1] || null;
  }, [selectedRecordId, sortedRecords]);

  // Velocity Stats
  const firstRecord = sortedRecords[0];
  const latestRecord = sortedRecords[sortedRecords.length - 1];
  const weightGainTotal = latestRecord && firstRecord ? (latestRecord.weightKg - firstRecord.weightKg) : 0;
  const heightGainTotal = latestRecord && firstRecord ? (latestRecord.heightCm - firstRecord.heightCm) : 0;

  // Add Record Handler
  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(formWeight);
    const h = parseFloat(formHeight);
    if (isNaN(w) || isNaN(h)) return;

    // Convert from imperial if needed
    const finalWeight = unitSystem === 'imperial' ? w / 2.20462 : w;
    const finalHeight = unitSystem === 'imperial' ? h / 0.393701 : h;

    const newRecord: GrowthRecord = {
      id: `rec-${Date.now()}`,
      date: formDate,
      ageMonths: Number(formAgeMonths),
      weightKg: Number(finalWeight.toFixed(2)),
      heightCm: Number(finalHeight.toFixed(1)),
      milestone: formMilestone.trim() || undefined,
      notes: formNotes.trim() || undefined,
    };

    setRecords((prev) => [...prev.filter((r) => r.ageMonths !== newRecord.ageMonths), newRecord]);
    setSelectedRecordId(newRecord.id);
    setShowAddForm(false);
    setShowCelebrationBanner(true);
    soundManager.playCelebration();

    setTimeout(() => {
      setShowCelebrationBanner(false);
    }, 4000);
  };

  const handleDeleteRecord = (id: string) => {
    soundManager.playBubblePop();
    setRecords((prev) => prev.filter((r) => r.id !== id));
    if (selectedRecordId === id) {
      setSelectedRecordId(null);
    }
  };

  const handleResetDemoData = () => {
    soundManager.playBubblePop();
    setRecords(DEFAULT_RECORDS);
    setSelectedRecordId(null);
  };

  return (
    <section id="growth-tracker" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full select-none">
      {/* Header Container */}
      <div className="bg-gradient-to-br from-amber-50/60 via-white to-sky-50/40 rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs relative overflow-hidden">
        {/* Decorative subtle background clouds */}
        <div className="absolute top-4 right-10 opacity-30 pointer-events-none">
          <svg viewBox="0 0 100 40" className="w-24 h-10">
            <path d="M10 30 C5 30 2 24 8 20 C6 14 14 12 20 16 C25 9 38 9 44 16 C50 14 58 18 56 26 C62 26 65 30 60 30 Z" fill="#CBD5E1" />
          </svg>
        </div>

        {/* Section Title & Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-semibold mb-2 shadow-2xs">
              <span>📏</span>
              <span>Milestone & Growth Tracker</span>
            </div>
            <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Watch Every Little Sprout Bloom
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              Log your baby’s weight, height, and milestone moments. Compare curves with standard healthy growth guidelines and cherish every leap.
            </p>
          </div>

          {/* Action Bar (Metric Switcher & Add Button) */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Unit Switcher */}
            <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200/70 text-xs font-semibold">
              <button
                onClick={() => setUnitSystem('metric')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  unitSystem === 'metric'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Metric (kg, cm)
              </button>
              <button
                onClick={() => setUnitSystem('imperial')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  unitSystem === 'imperial'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Imperial (lbs, in)
              </button>
            </div>

            {/* Add Measurement Button */}
            <button
              onClick={() => {
                setShowAddForm(!showAddForm);
                soundManager.playBubblePop();
              }}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>{showAddForm ? '✕ Close Form' : '+ Log Growth'}</span>
            </button>
          </div>
        </div>

        {/* Milestone Celebration Toast */}
        {showCelebrationBanner && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3 text-xs text-emerald-900 animate-popcorn shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎉</span>
              <div>
                <span className="font-bold">Growth Milestone Recorded!</span>
                <span className="ml-1 text-emerald-700">Your little one’s data was saved to their nursery memory book.</span>
              </div>
            </div>
            <span className="text-base">✨</span>
          </div>
        )}

        {/* Add Entry Form Dropdown */}
        {showAddForm && (
          <form
            onSubmit={handleAddRecord}
            className="mb-8 p-6 bg-white/95 rounded-2xl border border-amber-200/80 shadow-md animate-popcorn"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <h3 className="font-['Outfit'] font-bold text-sm text-stone-900 flex items-center gap-1.5">
                <span>🍼 Record New Baby Milestone</span>
              </h3>
              <span className="text-xs text-stone-400">Values are stored locally in your browser</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Baby Age (Months)
                </label>
                <input
                  type="number"
                  min="0"
                  max="48"
                  step="0.5"
                  required
                  value={formAgeMonths}
                  onChange={(e) => setFormAgeMonths(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-300 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-300 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
                </label>
                <input
                  type="number"
                  step="0.05"
                  required
                  value={formWeight}
                  onChange={(e) => setFormWeight(e.target.value)}
                  placeholder={unitSystem === 'metric' ? 'e.g. 7.5' : 'e.g. 16.5'}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-300 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Height / Length ({unitSystem === 'metric' ? 'cm' : 'in'})
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={formHeight}
                  onChange={(e) => setFormHeight(e.target.value)}
                  placeholder={unitSystem === 'metric' ? 'e.g. 66.5' : 'e.g. 26.2'}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-300 font-mono"
                />
              </div>
            </div>

            {/* Milestone Presets */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Milestone Memory (Click a prompt or write your own)
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {PRESET_MILESTONES.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setFormMilestone(preset)}
                    className="text-[11px] px-2.5 py-1 bg-stone-100 hover:bg-amber-100 text-stone-700 rounded-lg transition-colors cursor-pointer"
                  >
                    {preset}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={formMilestone}
                onChange={(e) => setFormMilestone(e.target.value)}
                placeholder="e.g. Rolled tummy to back & smiled at the cat! 💕"
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-stone-900 font-semibold text-xs rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 flex items-center gap-1.5"
              >
                <span>Save to Growth Chart</span>
                <span>✨</span>
              </button>
            </div>
          </form>
        )}

        {/* 3 Summary Stat Badges (Clean Unboxed Metadata Discipline) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Current Measurements */}
          <div className="bg-white/80 rounded-2xl p-4 border border-stone-200/70 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl shrink-0">
              ⚖️
            </div>
            <div>
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                Current Weight ({latestRecord ? `${latestRecord.ageMonths}m` : '0m'})
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-mono text-xl font-bold text-stone-900 tabular-nums">
                  {latestRecord ? formatWeight(latestRecord.weightKg) : '--'}
                </span>
                {weightGainTotal > 0 && (
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-md">
                    +{formatWeight(weightGainTotal)} total
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Current Height / Length */}
          <div className="bg-white/80 rounded-2xl p-4 border border-stone-200/70 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center text-xl shrink-0">
              📐
            </div>
            <div>
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                Current Length ({latestRecord ? `${latestRecord.ageMonths}m` : '0m'})
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-mono text-xl font-bold text-stone-900 tabular-nums">
                  {latestRecord ? formatHeight(latestRecord.heightCm) : '--'}
                </span>
                {heightGainTotal > 0 && (
                  <span className="text-[11px] font-semibold text-sky-600 bg-sky-50 px-1.5 py-0.2 rounded-md">
                    +{formatHeight(heightGainTotal)} total
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Milestone Superpower */}
          <div className="bg-white/80 rounded-2xl p-4 border border-stone-200/70 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center text-xl shrink-0">
              🌟
            </div>
            <div>
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                Latest Milestone Achieved
              </span>
              <p className="font-['Outfit'] font-bold text-xs sm:text-sm text-stone-900 line-clamp-1 mt-0.5">
                {latestRecord?.milestone || 'Curious exploration'}
              </p>
              <span className="text-[10px] text-stone-400">
                Tracking on healthy standard percentile curve
              </span>
            </div>
          </div>
        </div>

        {/* Chart View Switcher Controls & Legend */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-3 border-b border-stone-100 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-500">Curve View:</span>
            <div className="flex items-center p-1 bg-stone-100 rounded-xl text-xs font-semibold">
              <button
                onClick={() => {
                  setActiveMetric('weight');
                  soundManager.playBubblePop();
                }}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeMetric === 'weight'
                    ? 'bg-amber-400 text-stone-950 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Weight Curve
              </button>
              <button
                onClick={() => {
                  setActiveMetric('height');
                  soundManager.playBubblePop();
                }}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeMetric === 'height'
                    ? 'bg-sky-400 text-stone-950 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Height Curve
              </button>
              <button
                onClick={() => {
                  setActiveMetric('both');
                  soundManager.playBubblePop();
                }}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeMetric === 'both'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Both Curves
              </button>
            </div>
          </div>

          {/* Legend Items */}
          <div className="flex items-center gap-4 text-xs text-stone-600">
            {(activeMetric === 'weight' || activeMetric === 'both') && (
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="font-medium">Baby's Weight</span>
              </div>
            )}
            {(activeMetric === 'height' || activeMetric === 'both') && (
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-sky-500 inline-block" />
                <span className="font-medium">Baby's Length</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-stone-400">
              <span className="w-4 h-0.5 border-t-2 border-dashed border-stone-300 inline-block" />
              <span>WHO 50th % Median</span>
            </div>
          </div>
        </div>

        {/* SVG Interactive Line Chart Container */}
        <div className="relative w-full bg-white rounded-2xl p-4 sm:p-6 border border-stone-200/70 shadow-inner overflow-hidden">
          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto min-w-[620px] select-none"
            >
              <defs>
                {/* Weight Gradient Area */}
                <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                </linearGradient>

                {/* Height Gradient Area */}
                <linearGradient id="heightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.0" />
                </linearGradient>

                {/* Drop Shadow for points */}
                <filter id="pointShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.15" />
                </filter>
              </defs>

              {/* Grid Horizontal Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const y = padding.top + innerHeight * ratio;
                return (
                  <g key={ratio}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={chartWidth - padding.right}
                      y2={y}
                      stroke="#F1F5F9"
                      strokeWidth="1.2"
                    />
                    {/* Left Axis Label */}
                    <text
                      x={padding.left - 10}
                      y={y + 4}
                      textAnchor="end"
                      fontSize="10"
                      fill="#94A3B8"
                      fontFamily="monospace"
                    >
                      {activeMetric === 'height'
                        ? `${(maxHeight - ratio * (maxHeight - minHeight)).toFixed(0)}${unitSystem === 'metric' ? 'cm' : 'in'}`
                        : `${(maxWeight - ratio * (maxWeight - minWeight)).toFixed(1)}${unitSystem === 'metric' ? 'kg' : 'lb'}`}
                    </text>
                  </g>
                );
              })}

              {/* Age (Months) Vertical Ticks & Grid */}
              {Array.from({ length: maxAge + 1 }).map((_, month) => {
                if (month % 2 !== 0 && month !== maxAge) return null; // show even months to prevent clutter
                const x = getX(month);
                return (
                  <g key={month}>
                    <line
                      x1={x}
                      y1={padding.top}
                      x2={x}
                      y2={padding.top + innerHeight}
                      stroke="#F8FAFC"
                      strokeWidth="1"
                    />
                    <text
                      x={x}
                      y={padding.top + innerHeight + 20}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#64748B"
                      fontFamily="Outfit, sans-serif"
                      fontWeight="500"
                    >
                      {month === 0 ? 'Birth' : `${month}m`}
                    </text>
                  </g>
                );
              })}

              {/* X Axis Baseline */}
              <line
                x1={padding.left}
                y1={padding.top + innerHeight}
                x2={chartWidth - padding.right}
                y2={padding.top + innerHeight}
                stroke="#CBD5E1"
                strokeWidth="1.5"
              />

              {/* WHO 50th Percentile Reference Lines (Dashed) */}
              {(activeMetric === 'weight' || activeMetric === 'both') && (
                <path
                  d={whoWeightPath}
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              )}

              {(activeMetric === 'height' || activeMetric === 'both') && (
                <path
                  d={whoHeightPath}
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              )}

              {/* Height Area & Curve */}
              {(activeMetric === 'height' || activeMetric === 'both') && (
                <>
                  <path d={heightArea} fill="url(#heightGrad)" />
                  <path
                    d={heightPath}
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              )}

              {/* Weight Area & Curve */}
              {(activeMetric === 'weight' || activeMetric === 'both') && (
                <>
                  <path d={weightArea} fill="url(#weightGrad)" />
                  <path
                    d={weightPath}
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              )}

              {/* Interactive Data Points: Height */}
              {(activeMetric === 'height' || activeMetric === 'both') &&
                heightPoints.map((pt, idx) => {
                  const rec = sortedRecords[idx];
                  const isSelected = selectedRecord?.id === rec.id;
                  return (
                    <g key={`h-${rec.id}`}>
                      {isSelected && (
                        <circle cx={pt.x} cy={pt.y} r="14" fill="#0284C7" opacity="0.2" className="animate-ping" />
                      )}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isSelected ? 6.5 : 5}
                        fill="#FFFFFF"
                        stroke="#0284C7"
                        strokeWidth="3"
                        filter="url(#pointShadow)"
                        className="cursor-pointer hover:scale-125 transition-transform"
                        onClick={() => {
                          setSelectedRecordId(rec.id);
                          soundManager.playBubblePop();
                        }}
                      />
                    </g>
                  );
                })}

              {/* Interactive Data Points: Weight */}
              {(activeMetric === 'weight' || activeMetric === 'both') &&
                weightPoints.map((pt, idx) => {
                  const rec = sortedRecords[idx];
                  const isSelected = selectedRecord?.id === rec.id;
                  return (
                    <g key={`w-${rec.id}`}>
                      {isSelected && (
                        <circle cx={pt.x} cy={pt.y} r="16" fill="#F59E0B" opacity="0.25" className="animate-ping" />
                      )}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isSelected ? 7 : 5.5}
                        fill="#FFFFFF"
                        stroke="#D97706"
                        strokeWidth="3.5"
                        filter="url(#pointShadow)"
                        className="cursor-pointer hover:scale-125 transition-transform"
                        onClick={() => {
                          setSelectedRecordId(rec.id);
                          soundManager.playBubblePop();
                        }}
                      />
                    </g>
                  );
                })}
            </svg>
          </div>

          {/* Interactive Inspection Card when a point is selected */}
          {selectedRecord && (
            <div className="mt-4 p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-popcorn">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-200/80 flex items-center justify-center text-lg shrink-0">
                  🍼
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-['Outfit'] font-bold text-stone-900 text-sm">
                      {selectedRecord.ageMonths === 0 ? 'Birth Measurement' : `${selectedRecord.ageMonths} Months Milestone`}
                    </span>
                    <span className="text-[11px] text-stone-500 font-mono">({selectedRecord.date})</span>
                  </div>
                  {selectedRecord.milestone && (
                    <p className="text-xs text-amber-900 font-medium mt-0.5">
                      ✨ {selectedRecord.milestone}
                    </p>
                  )}
                  {selectedRecord.notes && (
                    <p className="text-[11px] text-stone-500 italic mt-0.5">
                      "{selectedRecord.notes}"
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-auto">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Weight</span>
                  <span className="font-mono text-sm font-bold text-amber-800">
                    {formatWeight(selectedRecord.weightKg)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Length</span>
                  <span className="font-mono text-sm font-bold text-sky-800">
                    {formatHeight(selectedRecord.heightCm)}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteRecord(selectedRecord.id)}
                  className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 text-xs transition-colors"
                  title="Remove this measurement point"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Milestone Cards Timeline */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-['Outfit'] font-bold text-base text-stone-900 flex items-center gap-2">
              <span>🧸 Baby Milestone Memory Log</span>
              <span className="text-xs text-stone-500 font-normal">({sortedRecords.length} recorded)</span>
            </h4>
            <button
              onClick={handleResetDemoData}
              className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-2 cursor-pointer"
            >
              Reset to Sample Timeline
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {sortedRecords.map((rec) => {
              const isSelected = selectedRecord?.id === rec.id;
              return (
                <div
                  key={rec.id}
                  onClick={() => {
                    setSelectedRecordId(rec.id);
                    soundManager.playBubblePop();
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50/90 border-amber-400 shadow-xs ring-1 ring-amber-300 -translate-y-0.5'
                      : 'bg-white hover:border-amber-200 hover:shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-stone-800">
                      {rec.ageMonths === 0 ? 'Birth' : `${rec.ageMonths} Months`}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">{rec.date}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono font-semibold text-stone-700 my-1">
                    <span className="text-amber-700">⚖️ {formatWeight(rec.weightKg)}</span>
                    <span className="text-sky-700">📏 {formatHeight(rec.heightCm)}</span>
                  </div>

                  {rec.milestone && (
                    <p className="text-[11px] text-stone-600 line-clamp-2 mt-1 leading-snug">
                      {rec.milestone}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
