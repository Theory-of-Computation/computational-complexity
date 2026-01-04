'use client';

import React, { useState } from 'react';

interface AssignmentResult {
  assignments: number[][];
  totalCount: number;
  message: string;
}

interface PermutationResult {
  permutations: (number | string)[][];
  totalCount: number;
  message: string;
}

export default function AssignmentSolver() {
  const [n, setN] = useState('3');
  const [assignmentResult, setAssignmentResult] = useState<AssignmentResult | null>(null);
  const [assignmentLoading, setAssignmentLoading] = useState(false);

  const [permInput, setPermInput] = useState('1,2,3');
  const [permutationResult, setPermutationResult] = useState<PermutationResult | null>(null);
  const [permutationLoading, setPermutationLoading] = useState(false);

  const generateAssignments = async () => {
    setAssignmentLoading(true);
    try {
      const num = parseInt(n);
      if (isNaN(num) || num < 1 || num > 20) {
        setAssignmentResult({
          assignments: [],
          totalCount: 0,
          message: 'Please enter a number between 1 and 20',
        });
        return;
      }

      const response = await fetch('/api/solvers/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ n: num }),
      });
      const data = await response.json();
      setAssignmentResult(data);
    } catch (error) {
      setAssignmentResult({
        assignments: [],
        totalCount: 0,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setAssignmentLoading(false);
    }
  };

  const generatePermutations = async () => {
    setPermutationLoading(true);
    try {
      const items = permInput
        .split(',')
        .map((x) => x.trim())
        .filter((x) => x !== '');

      if (items.length === 0 || items.length > 10) {
        setPermutationResult({
          permutations: [],
          totalCount: 0,
          message: 'Please enter between 1 and 10 items (comma-separated)',
        });
        return;
      }

      const response = await fetch('/api/solvers/permutations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await response.json();
      setPermutationResult(data);
    } catch (error) {
      setPermutationResult({
        permutations: [],
        totalCount: 0,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setPermutationLoading(false);
    }
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Binary Assignments */}
      <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg border-l-4 border-green-500 space-y-4">
        <h5 className="font-semibold text-lg">Generate Binary Assignments</h5>
        <p className="text-sm">Generate all 2ⁿ binary assignments for n variables (trial solutions):</p>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="number"
            min="1"
            max="20"
            placeholder="e.g., 3"
            value={n}
            onChange={(e) => setN(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          <button
            onClick={generateAssignments}
            disabled={assignmentLoading}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-50"
          >
            {assignmentLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
        {assignmentResult && (
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
            <p className="font-semibold text-black dark:text-white">
              {assignmentResult.message} (Total: {assignmentResult.totalCount} assignments)
            </p>
            {assignmentResult.assignments.length > 0 && (
              <div className="mt-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {assignmentResult.assignments.map((assignment, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-black dark:text-white text-xs rounded text-center font-mono"
                    >
                      [{assignment.join(',')}]
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Permutations */}
      <div className="bg-orange-50 dark:bg-orange-900 p-6 rounded-lg border-l-4 border-orange-500 space-y-4">
        <h5 className="font-semibold text-lg">Generate Permutations</h5>
        <p className="text-sm">Generate all permutations of given items (comma-separated):</p>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            placeholder="e.g., 1,2,3 or a,b,c"
            value={permInput}
            onChange={(e) => setPermInput(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          <button
            onClick={generatePermutations}
            disabled={permutationLoading}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg disabled:opacity-50"
          >
            {permutationLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
        {permutationResult && (
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
            <p className="font-semibold text-black dark:text-white">
              {permutationResult.message} (Total: {permutationResult.totalCount} permutations)
            </p>
            {permutationResult.permutations.length > 0 && (
              <div className="mt-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {permutationResult.permutations.map((perm, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-black dark:text-white text-xs rounded text-center font-mono"
                    >
                      [{perm.join(',')}]
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
