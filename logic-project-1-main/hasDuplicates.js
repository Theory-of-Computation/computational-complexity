/**
 * Checks if an array contains any duplicates.
 * @param {Array} arr
 * @returns {boolean}
 */
function hasDuplicates(arr) {
  return new Set(arr).size !== arr.length;
}

module.exports = hasDuplicates;
