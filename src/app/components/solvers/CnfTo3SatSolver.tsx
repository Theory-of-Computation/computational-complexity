'use client';

import React, { useState } from 'react';

interface TransformResponse {
  clauses3sat: string[][];
  pretty: string;
  introducedVars: number;
  message: string;
  error?: string;
}

export default function CnfTo3SatSolver() {
  const [input, setInput] = useState('a b c d e\n!x y z\np q r');
  const [result, setResult] = useState<TransformResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTransform = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch('/api/solvers/cnf-to-3sat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clauses: input }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Transform failed');
      }

      const data: TransformResponse = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 space-y-4 bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
      <h5 className="font-semibold text-lg">Interactive CNF → 3-SAT Reducer</h5>
      <p className="text-sm text-slate-700 dark:text-slate-200">
        Enter a CNF as one clause per line. Use whitespace to separate literals. Use <code>!</code> for negation.
        Example (5-literal clause on first line):
      </p>
      <pre className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-3 overflow-x-auto">
{`a b c d e
!x y z
p q r`}
      </pre>
      <textarea
        className="w-full h-40 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-sm text-black dark:text-white"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        spellCheck={false}
      />
      <button
        onClick={handleTransform}
        disabled={loading}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Transforming…' : 'Transform to 3-SAT'}
      </button>

      {error && (
        <div className="p-3 rounded bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 border border-red-300">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-3 p-4 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <p className="font-semibold text-slate-900 dark:text-white">{result.message}</p>
          <p className="text-sm text-slate-700 dark:text-slate-200">Introduced aux variables: {result.introducedVars}</p>
          <div>
            <p className="text-sm font-semibold">3-CNF (pretty):</p>
            <pre className="text-xs bg-slate-100 dark:bg-slate-900 rounded p-3 overflow-x-auto whitespace-pre-wrap">{result.pretty}</pre>
          </div>
          <div>
            <p className="text-sm font-semibold">Clauses:</p>
            <div className="text-xs grid gap-1">
              {result.clauses3sat.map((clause, idx) => (
                <div key={idx} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono">
                  ({clause.join(' ∨ ')})
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
