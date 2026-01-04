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

module.exports = hasTriplicates;
