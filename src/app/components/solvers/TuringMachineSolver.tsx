'use client';

import React, { useState } from 'react';

type TMRunResult = {
  accepted: boolean;
  steps: number;
  maxTape: number;
  reason: string;
};

// Simple two-tape ww checker (linear-time idea) implemented directly in the client
function checkWWTwoTape(input: string): TMRunResult {
  const s = input.trim();
  if (s.length === 0) return { accepted: false, steps: 0, maxTape: 0, reason: 'Empty string' };
  const n = s.length;
  if (n % 2 !== 0) return { accepted: false, steps: n, maxTape: n, reason: 'Length is odd; cannot be ww' };
  const mid = n / 2;
  const first = s.slice(0, mid);
  const second = s.slice(mid);
  const match = first === second;
  return {
    accepted: match,
    steps: n,
    maxTape: n,
    reason: match ? 'Matched two halves' : 'Halves differ',
  };
}

export default function TuringMachineSolver() {
  // Preset ww checker state
  const [wwInput, setWwInput] = useState('abab');
  const [wwResult, setWwResult] = useState<TMRunResult | null>(null);

  // Custom TM runner state
  const [machineJson, setMachineJson] = useState(`{
  "tapes": 1,
  "blank": "_",
  "start": "q0",
  "accept": "qa",
  "reject": "qr",
  "transitions": [
    { "state": "q0", "read": ["a"], "write": ["a"], "move": ["R"], "next": "q0" },
    { "state": "q0", "read": ["_"], "write": ["_"], "move": ["S"], "next": "qa" }
  ]
}`);
  const [tapeInput, setTapeInput] = useState('aaa');
  const [stepLimit, setStepLimit] = useState(200);
  const [tmResult, setTmResult] = useState<TMRunResult | null>(null);
  const [tmError, setTmError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runWW = () => {
    const res = checkWWTwoTape(wwInput);
    setWwResult(res);
  };

  const runTM = async () => {
    setLoading(true);
    setTmError(null);
    setTmResult(null);
    try {
      const payload = {
        machine: JSON.parse(machineJson),
        input: tapeInput,
        maxSteps: stepLimit,
      };
      const response = await fetch('/api/solvers/tm/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Run failed');
      }
      setTmResult(data as TMRunResult);
    } catch (err) {
      setTmError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 mt-8">
      <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg border-l-4 border-blue-500 space-y-3">
        <h5 className="font-semibold text-lg">Exercise 1 Helper: Two-Tape ww Check</h5>
        <p className="text-sm">
          Quick checker for membership in {"{ww : w ∈ {a,b}*}"}. Uses a linear-time two-tape idea (conceptual).
        </p>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            value={wwInput}
            onChange={(e) => setWwInput(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
            placeholder="e.g., abab"
          />
          <button
            onClick={runWW}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Check ww
          </button>
        </div>
        {wwResult && (
          <div
            className={`p-3 rounded ${wwResult.accepted ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'}`}
          >
            <p className="font-semibold">{wwResult.accepted ? 'Accepted (ww)' : 'Rejected'}</p>
            <p className="text-sm">{wwResult.reason}</p>
            <p className="text-xs mt-1">Steps: {wwResult.steps} · Max tape used: {wwResult.maxTape}</p>
          </div>
        )}
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-700 space-y-3">
        <h5 className="font-semibold text-lg">Custom k-Tape Turing Machine Runner</h5>
        <p className="text-sm text-slate-700 dark:text-slate-200">
          Provide a machine (JSON) and an input tape. Deterministic only. Use symbols like "_" for blank.
          "read", "write", "move" arrays must match tape count. Moves: L, R, S.
        </p>
        <div className="grid gap-3">
          <label className="text-sm font-semibold">Machine JSON</label>
          <textarea
            className="w-full h-56 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-xs font-mono text-black dark:text-white"
            value={machineJson}
            onChange={(e) => setMachineJson(e.target.value)}
            spellCheck={false}
          />
          <label className="text-sm font-semibold">Input tape (tape 1)</label>
          <input
            className="px-3 py-2 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-black dark:text-white"
            value={tapeInput}
            onChange={(e) => setTapeInput(e.target.value)}
            placeholder="e.g., ababa"
          />
          <label className="text-sm font-semibold">Max steps</label>
          <input
            type="number"
            min={1}
            max={2000}
            className="px-3 py-2 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-black dark:text-white"
            value={stepLimit}
            onChange={(e) => setStepLimit(parseInt(e.target.value, 10) || 0)}
          />
          <button
            onClick={runTM}
            disabled={loading}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded disabled:opacity-50"
          >
            {loading ? 'Running…' : 'Run Machine'}
          </button>
        </div>

        {tmError && (
          <div className="p-3 rounded bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 border border-red-300">
            {tmError}
          </div>
        )}

        {tmResult && (
          <div
            className={`p-4 rounded ${tmResult.accepted ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' : 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100'}`}
          >
            <p className="font-semibold">{tmResult.accepted ? 'Accepted' : 'Rejected/Halted'}</p>
            <p className="text-sm">{tmResult.reason}</p>
            <p className="text-xs mt-1">Steps: {tmResult.steps} · Max tape used: {tmResult.maxTape}</p>
          </div>
        )}
      </div>
    </div>
  );
}
