/**
 * Natural Deduction Rule Application System
 * Theory of Computation - Logic Formulas
 */

const { Node, tokenize, Parser } = require('./WFF');
const { convertToPostfix } = require('./CNF');

/**
 * Convert a WFF node to an infix string representation.
 * @param {Node} node - Node to convert
 * @returns {string} Infix string representation
 */
function inorder(node) {
    if (!node) return '';
    
    if (node.isLiteral() && node.value.match(/[a-z]/)) {
        return node.value;
    } else if (node.isConjunction()) {
        return `(${inorder(node.left)} ∧ ${inorder(node.right)})`;
    } else if (node.isDisjunction()) {
        return `(${inorder(node.left)} ∨ ${inorder(node.right)})`;
    } else if (node.isImplication()) {
        return `(${inorder(node.left)} → ${inorder(node.right)})`;
    } else if (node.isNegation()) {
        return `(¬${inorder(node.left)})`;
    } else if (node.value === '⊤' || node.value === '⊥') {
        return node.value;
    }
}

/**
 * If there is only one operand except negation or double negation, 
 * it will be returned without parentheses.
 * @param {string} expression - Expression to filter
 * @returns {string} Filtered expression
 */
function filter(expression) {
    if (expression.startsWith('(') && expression.endsWith(')')) {
        const inner = expression.substring(1, expression.length - 1).trim();
        try {
            convertToPostfix(inner);
            return inner;
        } catch {
            return expression;
        }
    }
    return expression;
}

/**
 * And Introduction Rule (∧i)
 * @param {Object} formulas - Dictionary of formulas by line number
 * @param {Array<number>} lines - Line numbers to use
 * @returns {string|null} Result or null if rule cannot be applied
 */
function andIntro(formulas, lines) {
    if (lines.length !== 2) return null;
    
    try {
        const selectedFormulas = lines.map(i => filter(formulas[i]));
        return selectedFormulas
            .map(f => f.length > 2 ? `(${f})` : f)
            .join(' ∧ ');
    } catch {
        return null;
    }
}

/**
 * And Elimination Rule 1 (∧e1) - extracts left conjunct
 * @param {Object} formulas - Dictionary of formulas by line number
 * @param {Array<number>} lines - Line numbers to use
 * @returns {string|null} Result or null if rule cannot be applied
 */
function andElim1(formulas, lines) {
    if (lines.length !== 1) return null;
    
    try {
        const formula = filter(formulas[lines[0]].trim());
        const tokens = tokenize(formula, '⊤⊥');
        const parser = new Parser(tokens, '⊤⊥');
        const tree = parser.parseFormula();
        
        if (!tree.isConjunction()) return null;
        
        return filter(inorder(tree.left));
    } catch {
        return null;
    }
}

/**
 * And Elimination Rule 2 (∧e2) - extracts right conjunct
 * @param {Object} formulas - Dictionary of formulas by line number
 * @param {Array<number>} lines - Line numbers to use
 * @returns {string|null} Result or null if rule cannot be applied
 */
function andElim2(formulas, lines) {
    if (lines.length !== 1) return null;
    
    try {
        const formula = filter(formulas[lines[0]].trim());
        const tokens = tokenize(formula, '⊤⊥');
        const parser = new Parser(tokens, '⊤⊥');
        const tree = parser.parseFormula();
        
        if (!tree.isConjunction()) return null;
        
        return filter(inorder(tree.right));
    } catch {
        return null;
    }
}

/**
 * Implication Elimination Rule (→e) - Modus Ponens
 * @param {Object} formulas - Dictionary of formulas by line number
 * @param {Array<number>} lines - Line numbers to use
 * @returns {string|null} Result or null if rule cannot be applied
 */
function implicationElim(formulas, lines) {
    if (lines.length !== 2) return null;
    
    try {
        const imp = filter(formulas[lines[0]]);
        const premise = filter(formulas[lines[1]]);
        
        const impTokens = tokenize(imp, '⊤⊥');
        const premiseTokens = tokenize(premise, '⊤⊥');
        
        const impParser = new Parser(impTokens, '⊤⊥');
        const premiseParser = new Parser(premiseTokens, '⊤⊥');
        
        const impTree = impParser.parseFormula();
        const premiseTree = premiseParser.parseFormula();
        
        if (!impTree.isImplication()) return null;
        
        if (filter(inorder(premiseTree)) === filter(inorder(impTree.left))) {
            return filter(inorder(impTree.right));
        }
        
        return null;
    } catch {
        return null;
    }
}

/**
 * Negation Elimination Rule (¬e)
 * @param {Object} formulas - Dictionary of formulas by line number
 * @param {Array<number>} lines - Line numbers to use
 * @returns {string|null} Result or null if rule cannot be applied
 */
function negationElim(formulas, lines) {
    if (lines.length !== 2) return null;
    
    try {
        const firstFormula = convertToPostfix(formulas[lines[0]]);
        const secondFormula = convertToPostfix(formulas[lines[1]]);
        
        if (secondFormula === firstFormula + " ¬") {
            return "⊥";
        }
        return null;
    } catch {
        return null;
    }
}

/**
 * Double Negation Elimination Rule (¬¬e)
 * @param {Object} formulas - Dictionary of formulas by line number
 * @param {Array<number>} lines - Line numbers to use
 * @returns {string|null} Result or null if rule cannot be applied
 */
function doubleNegElim(formulas, lines) {
    if (lines.length !== 1) return null;
    
    try {
        const formula = filter(formulas[lines[0]]);
        const tokens = tokenize(formula, '⊤⊥');
        const parser = new Parser(tokens, '⊤⊥');
        const tree = parser.parseFormula();
        
        if (!tree.isDoubleNegation()) return null;
        
        const innerFormula = inorder(tree.left.left);
        return filter(innerFormula);
    } catch {
        return null;
    }
}

/**
 * Double Negation Introduction Rule (¬¬i)
 * @param {Object} formulas - Dictionary of formulas by line number
 * @param {Array<number>} lines - Line numbers to use
 * @returns {string|null} Result or null if rule cannot be applied
 */
function doubleNegIntro(formulas, lines) {
    if (lines.length !== 1) return null;
    
    try {
        const formula = filter(formulas[lines[0]]);
        const tokens = tokenize(formula, '⊤⊥');
        const parser = new Parser(tokens, '⊤⊥');
        const tree = parser.parseFormula();
        
        return tree.isLiteral() ? `¬¬${formula}` : `¬¬(${formula})`;
    } catch {
        return null;
    }
}

/**
 * Modus Tollens Rule (MT)
 * @param {Object} formulas - Dictionary of formulas by line number
 * @param {Array<number>} lines - Line numbers to use
 * @returns {string|null} Result or null if rule cannot be applied
 */
function modusTollens(formulas, lines) {
    if (lines.length !== 2) return null;
    
    try {
        const impLine = filter(formulas[lines[0]]);
        const negLine = filter(formulas[lines[1]]);
        
        const impTokens = tokenize(impLine, '⊤⊥');
        const impParser = new Parser(impTokens, '⊤⊥');
        const impTree = impParser.parseFormula();
        
        const negTokens = tokenize(negLine, '⊤⊥');
        const negParser = new Parser(negTokens, '⊤⊥');
        const negTree = negParser.parseFormula();
        
        if (!negTree.isNegation()) return null;
        if (!impTree.isImplication()) return null;
        
        if (filter(inorder(negTree)) === filter(`¬${inorder(impTree.right)}`)) {
            return filter(`(¬${inorder(impTree.left)})`);
        }
        
        return null;
    } catch {
        return null;
    }
}

const ruleFunctions = {
    '∧i': andIntro,
    '∧e1': andElim1,
    '∧e2': andElim2,
    '→e': implicationElim,
    '¬e': negationElim,
    '¬¬e': doubleNegElim,
    '¬¬i': doubleNegIntro,
    'MT': modusTollens,
};

/**
 * Apply a natural deduction rule
 * @param {Object} formulas - Dictionary of formulas by line number
 * @param {string} ruleName - Name of the rule to apply
 * @param {Array<number>} ruleLines - Line numbers to use
 * @returns {string|null} Result or null if rule cannot be applied
 */
function applyRule(formulas, ruleName, ruleLines) {
    const func = ruleFunctions[ruleName];
    if (!func) return null;
    return func(formulas, ruleLines);
}

/**
 * Parse input format for natural deduction
 * @param {string} input - Input string with formulas and rule
 * @returns {Object} Parsed formulas, rule name, and rule lines
 */
function parseNDInput(input) {
    const lines = input.trim().split('\n');
    const formulas = {};
    
    for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i];
        if (line.trim()) {
            const parts = line.split(/\s{4,}/);
            const number = parseInt(parts[0]);
            const formula = parts[1].trim();
            formulas[number] = formula;
        }
    }
    
    const ruleLine = lines[lines.length - 1].trim();
    const ruleParts = ruleLine.split(',').map(x => x.trim());
    const ruleName = ruleParts[0];
    const ruleLines = ruleParts.slice(1).map(x => parseInt(x));
    
    return { formulas, ruleName, ruleLines };
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        inorder,
        filter,
        andIntro,
        andElim1,
        andElim2,
        implicationElim,
        negationElim,
        doubleNegElim,
        doubleNegIntro,
        modusTollens,
        ruleFunctions,
        applyRule,
        parseNDInput
    };
}
