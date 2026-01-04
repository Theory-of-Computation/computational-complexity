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

module.exports = isWW;
