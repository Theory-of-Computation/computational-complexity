// Utility functions for easy computation theory exercises

/**
 * Checks if an array contains any duplicates.
 * @param {Array} arr
 * @returns {boolean}
 */
function hasDuplicates(arr) {
  return new Set(arr).size !== arr.length;
}

/**
 * Checks if an array contains any triplicates (any value appears at least 3 times).
 * @param {Array} arr
 * @returns {boolean}
 */
function hasTriplicates(arr) {
  const freq = {};
  for (const x of arr) {
    freq[x] = (freq[x] || 0) + 1;
    if (freq[x] === 3) return true;
  }
  return false;
}

/**
 * Checks if a string is of the form ww (two identical halves).
 * @param {string} s
 * @returns {boolean}
 */
function isWW(s) {
  if (s.length % 2 !== 0) return false;
  const mid = s.length / 2;
  return s.slice(0, mid) === s.slice(mid);
}

/**
 * Checks if a string is of the form www (three identical parts).
 * @param {string} s
 * @returns {boolean}
 */
function isWWW(s) {
  if (s.length % 3 !== 0) return false;
  const part = s.length / 3;
  return s.slice(0, part) === s.slice(part, 2 * part) && s.slice(0, part) === s.slice(2 * part);
}

/**
 * Generates all permutations of an array.
 * @param {Array} arr
 * @returns {Array<Array>}
 */
function permutations(arr) {
  if (arr.length <= 1) return [arr];
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = arr.slice(0, i).concat(arr.slice(i + 1));
    for (const perm of permutations(rest)) {
      result.push([arr[i], ...perm]);
    }
  }
  return result;
}

/**
 * Generates all binary assignments for n variables.
 * @param {number} n
 * @returns {Array<Array<number>>}
 */
function allAssignments(n) {
  const result = [];
  for (let i = 0; i < (1 << n); i++) {
    const assignment = [];
    for (let j = n - 1; j >= 0; j--) {
      assignment.push((i >> j) & 1);
    }
    result.push(assignment);
  }
  return result;
}

module.exports = {
  hasDuplicates,
  hasTriplicates,
  isWW,
  isWWW,
  permutations,
  allAssignments,
};
