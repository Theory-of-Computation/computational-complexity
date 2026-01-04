'use client';

import React, { useState } from 'react';

interface StringResult {
  isMatch: boolean;
  pattern: string;
  message: string;
  breakdown?: string;
}

export default function StringRecognitionSolver() {
  const [wwInput, setWwInput] = useState('');
  const [wwResult, setWwResult] = useState<StringResult | null>(null);
  const [wwLoading, setWwLoading] = useState(false);

  const [wwrwInput, setWwrwInput] = useState('');
  const [wwrwResult, setWwrwResult] = useState<StringResult | null>(null);
  const [wwrwLoading, setWwrwLoading] = useState(false);

  const [wwwInput, setWwwInput] = useState('');
  const [wwwResult, setWwwResult] = useState<StringResult | null>(null);
  const [wwwLoading, setWwwLoading] = useState(false);

  const checkWW = async () => {
    setWwLoading(true);
    try {
      const response = await fetch('/api/solvers/strings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ string: wwInput, pattern: 'ww' }),
      });
      const data = await response.json();
      setWwResult(data);
    } catch (error) {
      setWwResult({
        isMatch: false,
        pattern: 'ww',
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setWwLoading(false);
    }
  };

  const checkWWrW = async () => {
    setWwrwLoading(true);
    try {
      const response = await fetch('/api/solvers/strings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ string: wwrwInput, pattern: 'wwrw' }),
      });
      const data = await response.json();
      setWwrwResult(data);
    } catch (error) {
      setWwrwResult({
        isMatch: false,
        pattern: 'wwrw',
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setWwrwLoading(false);
    }
  };

  const checkWWW = async () => {
    setWwwLoading(true);
    try {
      const response = await fetch('/api/solvers/strings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ string: wwwInput, pattern: 'www' }),
      });
      const data = await response.json();
      setWwwResult(data);
    } catch (error) {
      setWwwResult({
        isMatch: false,
        pattern: 'www',
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setWwwLoading(false);
    }
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Exercise 1: ww */}
      <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg border-l-4 border-blue-500 space-y-4">
        <h5 className="font-semibold text-lg">Exercise 1: Check Pattern ww</h5>
        <p className="text-sm">Check if a string is of the form ww (two identical halves):</p>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="e.g., abab, xyxy, hello"
            value={wwInput}
            onChange={(e) => setWwInput(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          <button
            onClick={checkWW}
            disabled={wwLoading}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            {wwLoading ? 'Checking...' : 'Check'}
          </button>
        </div>
        {wwResult && (
          <div
            className={`p-4 rounded-lg ${
              wwResult.isMatch
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 border border-green-300'
                : 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 border border-orange-300'
            }`}
          >
            <p className="font-semibold">{wwResult.isMatch ? '✓ Matches ww' : '✗ Does not match ww'}</p>
            <p className="mt-2 text-sm">{wwResult.message}</p>
            {wwResult.breakdown && <p className="mt-2 text-xs italic">{wwResult.breakdown}</p>}
          </div>
        )}
      </div>

      {/* Exercise 2: wwrw */}
      <div className="bg-indigo-50 dark:bg-indigo-900 p-6 rounded-lg border-l-4 border-indigo-500 space-y-4">
        <h5 className="font-semibold text-lg">Exercise 2: Check Pattern wwʳw</h5>
        <p className="text-sm">Check if a string is of the form wwʳw (string, reverse, string):</p>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="e.g., abaab, xyx, abccba"
            value={wwrwInput}
            onChange={(e) => setWwrwInput(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          <button
            onClick={checkWWrW}
            disabled={wwrwLoading}
            className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg disabled:opacity-50"
          >
            {wwrwLoading ? 'Checking...' : 'Check'}
          </button>
        </div>
        {wwrwResult && (
          <div
            className={`p-4 rounded-lg ${
              wwrwResult.isMatch
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 border border-green-300'
                : 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 border border-orange-300'
            }`}
          >
            <p className="font-semibold">{wwrwResult.isMatch ? '✓ Matches wwʳw' : '✗ Does not match wwʳw'}</p>
            <p className="mt-2 text-sm">{wwrwResult.message}</p>
            {wwrwResult.breakdown && <p className="mt-2 text-xs italic">{wwrwResult.breakdown}</p>}
          </div>
        )}
      </div>

      {/* Exercise 3: www */}
      <div className="bg-purple-50 dark:bg-purple-900 p-6 rounded-lg border-l-4 border-purple-500 space-y-4">
        <h5 className="font-semibold text-lg">Exercise 3: Check Pattern www</h5>
        <p className="text-sm">Check if a string is of the form www (three identical parts):</p>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="e.g., ababab, xyzxyzxyz, aaa"
            value={wwwInput}
            onChange={(e) => setWwwInput(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          <button
            onClick={checkWWW}
            disabled={wwwLoading}
            className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg disabled:opacity-50"
          >
            {wwwLoading ? 'Checking...' : 'Check'}
          </button>
        </div>
        {wwwResult && (
          <div
            className={`p-4 rounded-lg ${
              wwwResult.isMatch
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 border border-green-300'
                : 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 border border-orange-300'
            }`}
          >
            <p className="font-semibold">{wwwResult.isMatch ? '✓ Matches www' : '✗ Does not match www'}</p>
            <p className="mt-2 text-sm">{wwwResult.message}</p>
            {wwwResult.breakdown && <p className="mt-2 text-xs italic">{wwwResult.breakdown}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
