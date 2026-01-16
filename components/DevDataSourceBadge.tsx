'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Database, AlertTriangle } from 'lucide-react';

export interface DataSourceStatus {
  hero: 'cms' | 'fallback';
  stats: 'cms' | 'fallback';
  services: 'cms' | 'fallback';
  testimonials: 'cms' | 'fallback';
  partners: 'cms' | 'fallback';
  cities: 'cms' | 'fallback';
  faq: 'cms' | 'fallback';
  showcase: 'cms' | 'fallback';
}

interface Props {
  sources?: DataSourceStatus;
}

const defaultSources: DataSourceStatus = {
  hero: 'fallback',
  stats: 'fallback',
  services: 'fallback',
  testimonials: 'fallback',
  partners: 'fallback',
  cities: 'fallback',
  faq: 'fallback',
  showcase: 'fallback',
};

export function DevDataSourceBadge({ sources: initialSources }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only show in development and after mount
  if (process.env.NODE_ENV !== 'development' || !mounted) {
    return null;
  }

  const sources = initialSources || defaultSources;
  const fallbackCount = Object.values(sources).filter((s) => s === 'fallback').length;
  const cmsCount = Object.values(sources).filter((s) => s === 'cms').length;
  const allFallback = fallbackCount === Object.keys(sources).length;
  const allCms = cmsCount === Object.keys(sources).length;

  return (
    <div className="fixed bottom-4 left-4 z-50 font-mono text-xs">
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center gap-2 px-3 py-2 rounded-md border shadow-lg transition-colors ${
          allCms
            ? 'bg-green-50 border-green-300 text-green-800'
            : allFallback
              ? 'bg-amber-50 border-amber-300 text-amber-800'
              : 'bg-blue-50 border-blue-300 text-blue-800'
        }`}
      >
        {allCms ? (
          <Database className="w-4 h-4" />
        ) : (
          <AlertTriangle className="w-4 h-4" />
        )}
        <span>
          {allCms
            ? 'CMS'
            : allFallback
              ? 'FALLBACK'
              : `${cmsCount} CMS / ${fallbackCount} Fallback`}
        </span>
        {expanded ? (
          <ChevronDown className="w-3 h-3" />
        ) : (
          <ChevronUp className="w-3 h-3" />
        )}
      </button>

      {expanded && (
        <div className="mt-2 p-3 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">
            Data Sources
          </div>
          <div className="space-y-1">
            {Object.entries(sources).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between gap-4">
                <span className="text-gray-600 capitalize">{key}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                    value === 'cms'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {value.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
