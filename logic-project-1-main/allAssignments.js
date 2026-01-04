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

module.exports = allAssignments;
