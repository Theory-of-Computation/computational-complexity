/**
 * Well-Formed Formula (WFF) Parser
 * Theory of Computation - Logic Formulas
 */

class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }

    /**
     * Checks if the token is a literal (a lowercase letter).
     */
    isLiteral() {
        return ((this.value.match(/^[a-z]$/) && !this.left && !this.right) ||
                (this.value.startsWith('¬') && this.left.value.match(/^[a-z]$/) && !this.left.right));
    }

    /**
     * Checks if the token is a conjunction (∧).
     */
    isConjunction() {
        return this.value === '∧' && this.left && this.right;
    }

    /**
     * Checks if the token is a disjunction (∨).
     */
    isDisjunction() {
        return this.value === '∨' && this.left && this.right;
    }

    /**
     * Checks if the token is an implication (→).
     */
    isImplication() {
        return this.value === '→' && this.left && this.right;
    }

    /**
     * Checks if the token is a double negation (¬¬).
     */
    isDoubleNegation() {
        return this.value === '¬' && this.left && this.left.value === '¬' && !this.right;
    }

    /**
     * Checks if the token is a negation (¬).
     */
    isNegation() {
        return this.value === '¬' && !this.right;
    }
}

/**
 * Tokenizes a formula string into an array of tokens.
 * @param {string} s - The formula string
 * @param {string} extra - Additional characters to allow
 * @returns {Array<string>|null} Array of tokens or null if invalid
 */
function tokenize(s, extra = '') {
    const tokens = [];
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c === '(' || c === ')') {
            tokens.push(c);
        } else if (c === '¬' || c === '∧' || c === '∨') {
            tokens.push(c);
        } else if (c === '→') {
            tokens.push('→');
        } else if (c.match(/[a-z]/) || extra.includes(c)) {
            tokens.push(c);
        } else if (c === ' ') {
            continue;
        } else {
            return null;
        }
    }
    return tokens;
}

class Parser {
    constructor(tokens, extra = '') {
        this.tokens = tokens;
        this.pos = 0;
        this.extra = extra;
    }

    current() {
        return this.pos < this.tokens.length ? this.tokens[this.pos] : null;
    }

    consume() {
        this.pos++;
    }

    parseFormula() {
        return this.parseBinary();
    }

    parseBinary() {
        let node = this.parseUnary();
        while (this.current() === '∧' || this.current() === '∨' || this.current() === '→') {
            const op = this.current();
            this.consume();
            const right = this.parseUnary();
            node = new Node(op, node, right);
        }
        return node;
    }

    parseUnary() {
        const token = this.current();
        if (token === '¬') {
            this.consume();
            const operand = this.parseUnary();
            return new Node('¬', operand);
        } else if (token === '(') {
            this.consume();
            const node = this.parseFormula();
            if (this.current() !== ')') {
                throw new Error("Missing closing parenthesis");
            }
            this.consume();
            return node;
        } else if (token && (token.match(/[a-z]/) || this.extra.includes(token))) {
            this.consume();
            return new Node(token);
        } else {
            throw new Error("Unexpected token");
        }
    }
}

function printTree(node, depth = 0) {
    if (!node) return;
    console.log('  '.repeat(depth) + node.value);
    if (node.left) {
        printTree(node.left, depth + 1);
    }
    if (node.right) {
        printTree(node.right, depth + 1);
    }
}

/**
 * Main function to validate a Well-Formed Formula
 * @param {string} formula - The formula to validate
 * @returns {Object} Object with isValid boolean and tree (if valid)
 */
function validateWFF(formula) {
    const tokens = tokenize(formula);
    if (!tokens) {
        return { isValid: false, error: "Invalid Formula" };
    }

    try {
        const parser = new Parser(tokens);
        const tree = parser.parseFormula();
        if (parser.current() !== null) {
            throw new Error("Extra input after valid formula");
        }
        return { isValid: true, tree };
    } catch (error) {
        return { isValid: false, error: "Invalid Formula" };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Node,
        tokenize,
        Parser,
        printTree,
        validateWFF
    };
}
