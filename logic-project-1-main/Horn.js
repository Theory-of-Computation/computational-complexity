/**
 * Horn Formula Checker and Satisfiability Solver
 * Theory of Computation - Logic Formulas
 */

const { Node, tokenize, Parser } = require('./WFF');

/**
 * Checks if the token is a positive literal (a lowercase letter) or a special symbol (⊥ or ⊤).
 * @param {Node} token - Node to check
 * @returns {boolean} True if it's a positive literal or special symbol
 */
function isKindOfP(token) {
    return (token.isLiteral() && !token.isNegation()) || token.value === '⊥' || token.value === '⊤';
}

/**
 * Checks if a clause is a Horn clause
 * P ::= ⊥ | ⊤ | p
 * A ::= P | P ∧ A
 * Horn Clause ::= A → P
 * @param {string} clause - Clause to check
 * @returns {boolean} True if it's a Horn clause
 */
function isHornClause(clause) {
    const tokens = tokenize(clause, '⊥⊤');
    const parser = new Parser(tokens, '⊥⊤');
    const tree = parser.parseFormula();
    
    if (tree.value === '→') {
        if (tree.left && tree.right) {
            if (!isKindOfP(tree.right)) {
                return false;
            }
            let current = tree.left;
            while (current !== null) {
                if (!(current.isConjunction() || isKindOfP(current))) {
                    return false;
                }
                if (!isKindOfP(tree.right)) {
                    return false;
                }
                current = current.left;
            }
            return true;
        }
        return false;
    }
    return false;
}

/**
 * Checks if the formula is a Horn formula.
 * A Horn formula is a conjunction of Horn clauses.
 * @param {string} formula - Formula to check
 * @returns {boolean} True if it's a Horn formula
 */
function isHornFormula(formula) {
    const clauses = formula.split(')∧(');
    for (const clause of clauses) {
        const cleanClause = clause.replace(/[()]/g, '');
        if (!isHornClause(cleanClause.trim())) {
            return false;
        }
    }
    return true;
}

/**
 * Checks if the Horn formula is satisfiable.
 * @param {string} formula - Horn formula to check
 * @returns {Object} Object with satisfiable boolean and trues string
 */
function isSatisfiable(formula) {
    let marked = '⊤ ';
    const clauses = formula.split(')∧(');
    const remainingClauses = {};
    
    for (const clause of clauses) {
        const cleanClause = clause.replace(/[()]/g, '');
        const implicationParts = cleanClause.split('→');
        const leftLiterals = implicationParts[0].trim().split('∧');
        const key = leftLiterals.join(',');
        
        if (!remainingClauses[key]) {
            remainingClauses[key] = implicationParts[1].trim();
        } else {
            remainingClauses[key] += ' ' + implicationParts[1].trim();
        }
    }
    
    while (true) {
        const previousMarked = marked;
        const keys = Object.keys(remainingClauses);
        
        for (const clauseKey of keys) {
            const literals = clauseKey.split(',');
            if (literals.every(literal => marked.includes(literal))) {
                if (!marked.includes(remainingClauses[clauseKey])) {
                    marked += remainingClauses[clauseKey] + ' ';
                    delete remainingClauses[clauseKey];
                    break;
                }
            }
        }
        
        if (marked === previousMarked) {
            break;
        }
    }
    
    if (marked.includes('⊥')) {
        return { satisfiable: false, trues: '' };
    } else {
        return { 
            satisfiable: true, 
            trues: marked.replace('⊤', '').trim() 
        };
    }
}

/**
 * Main function to check Horn formula and its satisfiability
 * @param {string} expression - Formula to check
 * @returns {Object} Result with validity and satisfiability info
 */
function checkHornFormula(expression) {
    if (!expression) {
        throw new Error("Input is empty.");
    }
    
    expression = expression.replace(/¬¬/g, '').replace(/\s/g, '');
    
    if (!isHornFormula(expression)) {
        return { valid: false, message: "Invalid Horn Formula" };
    } else {
        const { satisfiable, trues } = isSatisfiable(expression);
        if (satisfiable) {
            return { 
                valid: true, 
                satisfiable: true, 
                message: "Satisfiable",
                trues: trues || undefined
            };
        } else {
            return { 
                valid: true, 
                satisfiable: false, 
                message: "Unsatisfiable" 
            };
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isKindOfP,
        isHornClause,
        isHornFormula,
        isSatisfiable,
        checkHornFormula
    };
}
