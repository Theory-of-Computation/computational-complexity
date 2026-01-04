'use client';

import React, { useState } from 'react';

interface TriplicateResult {
  hasTriplicates: boolean;
  triplicateValues?: number[];
  message: string;
}

export default function TriplicateSolver() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<TriplicateResult | null>(null);
  const [loading, setLoading] = useState(false);

  const checkTriplicates = async () => {
    setLoading(true);
    try {
      const numbers = input
        .split(',')
        .map((x) => x.trim())
        .filter((x) => x !== '')
        .map((x) => {
          const num = parseFloat(x);
          if (isNaN(num)) throw new Error(`Invalid number: ${x}`);
          return num;
        });

      if (numbers.length === 0) {
        setResult({ hasTriplicates: false, message: 'Please enter some numbers.' });
        return;
      }

      const response = await fetch('/api/solvers/triplicates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numbers }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        hasTriplicates: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-purple-50 dark:bg-purple-900 p-6 rounded-lg border-l-4 border-purple-500 space-y-4 mt-4">
      {/* <h5 className="font-semibold text-lg">Interactive Triplicate Detector</h5> */}
      <p className="text-sm">Enter comma-separated numbers to check for triplicates:</p>
      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="e.g., 1, 2, 3, 2, 2, 4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
        />
        <button
          onClick={checkTriplicates}
          disabled={loading}
          className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg disabled:opacity-50"
        >
          {loading ? 'Checking...' : 'Check'}
        </button>
      </div>
      {result && (
        <div
          className={`p-4 rounded-lg ${
            result.hasTriplicates
              ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 border border-red-300'
              : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 border border-green-300'
          }`}
        >
          <p className="font-semibold">
            {result.hasTriplicates ? '✗ Contains Triplicates' : '✓ No Triplicates'}
          </p>
          <p className="mt-2">{result.message}</p>
          {result.triplicateValues && result.triplicateValues.length > 0 && (
            <p className="mt-2 text-sm">Triplicate values: {result.triplicateValues.join(', ')}</p>
          )}
        </div>
      )}
    </div>
  );
}
