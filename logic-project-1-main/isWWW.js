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

module.exports = isWWW;
