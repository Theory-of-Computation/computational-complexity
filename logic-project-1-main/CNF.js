/**
 * Conjunctive Normal Form (CNF) Converter
 * Theory of Computation - Logic Formulas
 */

const { Node, tokenize, Parser } = require('./WFF');

/**
 * Converts an infix Well-Formed Formula (WFF) to postfix notation.
 * @param {string} expression - WFF in infix notation
 * @returns {string} Expression in postfix notation
 */
function convertToPostfix(expression) {
    const precedence = { '¬': 3, '∧': 2, '∨': 1, '→': 0 };
    const output = [];
    const stack = [];
    
    expression = expression.replace(/\s/g, '');
    const tokens = tokenize(expression);
    
    for (const token of tokens) {
        if (token.match(/[a-z]/)) {  // Variable
            output.push(token);
        } else if (token === '¬') {  // Unary operator
            stack.push(token);
        } else if (token === '∧' || token === '∨' || token === '→') {  // Binary operators
            while (stack.length > 0 && stack[stack.length - 1] !== '(' &&
                   precedence[stack[stack.length - 1]] >= precedence[token]) {
                output.push(stack.pop());
            }
            stack.push(token);
        } else if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            stack.pop();  // Pop the '(' from the stack
        } else {
            throw new Error(`Invalid token: ${token}`);
        }
    }
    
    while (stack.length > 0) {
        output.push(stack.pop());
    }
    
    return output.join(' ');
}

/**
 * Removes implications from a WFF in postfix notation
 * @param {string} phi - WFF in postfix notation
 * @returns {string} WFF without implications
 */
function IMPLICATION_FREE(phi) {
    phi = convertToPostfix(phi);
    const tokens = tokenize(phi);
    if (!tokens) {
        throw new Error("Invalid formula");
    }
    
    const stack = [];
    for (const token of tokens) {
        if (token.match(/[a-z]/)) {
            stack.push(token);
        } else if (token === '¬') {
            const operand = stack.pop();
            if (operand.startsWith('¬')) {
                // Double negation elimination
                stack.push(operand.substring(1));
            } else {
                stack.push(`¬${operand}`);
            }
        } else if (token === '∧' || token === '∨') {
            const right = stack.pop();
            const left = stack.pop();
            stack.push(`(${left} ${token} ${right})`);
        } else if (token === '→') {
            const right = stack.pop();
            const left = stack.pop();
            stack.push(`(¬${left} ∨ ${right})`);
        } else {
            throw new Error(`Invalid token: ${token}`);
        }
    }
    
    return stack.length > 0 ? stack[0] : '';
}

/**
 * Distributes disjunction over conjunction for CNF conversion
 * Precondition: n1 and n2 are in CNF
 * Postcondition: Returns a CNF for n1 ∨ n2
 * @param {Node} n1 - First CNF node
 * @param {Node} n2 - Second CNF node
 * @returns {Node} Distributed CNF
 */
function DISTR(n1, n2) {
    if (n1.isConjunction()) {
        return new Node('∧', DISTR(n1.left, n2), DISTR(n1.right, n2));
    } else if (n2.isConjunction()) {
        return new Node('∧', DISTR(n1, n2.left), DISTR(n1, n2.right));
    } else {
        return new Node('∨', n1, n2);
    }
}

/**
 * Converts a formula to Negation Normal Form (NNF)
 * Precondition: phi is implication free
 * Postcondition: Returns a NNF for phi
 * @param {Node} phi - Implication-free formula
 * @returns {Node} Formula in NNF
 */
function NNF(phi) {
    if (phi.isLiteral() && phi.value.match(/[a-z]/)) {
        return phi;
    } else if (phi.isConjunction()) {
        return new Node('∧', NNF(phi.left), NNF(phi.right));
    } else if (phi.isDisjunction()) {
        return new Node('∨', NNF(phi.left), NNF(phi.right));
    } else if (phi.isNegation()) {
        if (phi.left.isLiteral()) {
            if (phi.left.value.match(/[a-z]/)) {
                // Negation of a literal
                return new Node('¬', phi.left);
            } else {
                // Negation of a negation (double negation elimination)
                return new Node(phi.left.left.value);
            }
        } else if (phi.left.isConjunction()) {
            // De Morgan's Law: ¬(A ∧ B) = ¬A ∨ ¬B
            return new Node('∨', NNF(new Node('¬', phi.left.left)), NNF(new Node('¬', phi.left.right)));
        } else if (phi.left.isDisjunction()) {
            // De Morgan's Law: ¬(A ∨ B) = ¬A ∧ ¬B
            return new Node('∧', NNF(new Node('¬', phi.left.left)), NNF(new Node('¬', phi.left.right)));
        }
    } else {
        throw new Error("Input must be a literal, conjunction, disjunction, or negation.");
    }
}

/**
 * Converts a formula to Conjunctive Normal Form (CNF)
 * Precondition: phi is implication free and in NNF
 * Postcondition: Returns an equivalent CNF for phi
 * @param {Node} phi - Formula in NNF
 * @returns {Node} Formula in CNF
 */
function CNF(phi) {
    if (phi.isLiteral()) {
        if (phi.value.match(/[a-z]/)) {
            return new Node(phi.value);
        } else {
            return new Node('¬', new Node(phi.left.value));
        }
    } else if (phi.isConjunction()) {
        return new Node('∧', CNF(phi.left), CNF(phi.right));
    } else if (phi.isDisjunction()) {
        return DISTR(CNF(phi.left), CNF(phi.right));
    } else {
        throw new Error("Input must be a literal, conjunction, or disjunction.");
    }
}

/**
 * Converts a CNF tree to infix string representation
 * @param {Node} node - CNF tree node
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
    } else if (node.isDoubleNegation()) {
        return `¬¬${inorder(node.left.left)}`;
    } else if (node.isNegation()) {
        return `¬${inorder(node.left)}`;
    }
}

/**
 * Filters the CNF result to ensure it is in the correct format
 * @param {string} result - CNF string
 * @returns {string} Filtered CNF string
 */
function filtered(result) {
    let items = result.split(' ∧ ');
    // Remove all parentheses
    items = items.map(item => item.replace(/[()]/g, ''));
    if (items.length === 1) {
        return items[0];
    }
    // Join the items with ' ∧ ' and return
    return items.map(item => item.length > 2 ? `(${item})` : item).join(' ∧ ');
}

/**
 * Main function to convert a formula to CNF
 * @param {string} expression - Formula to convert
 * @returns {string} Formula in CNF
 */
function convertToCNF(expression) {
    if (!expression) {
        throw new Error("Input is empty.");
    }

    const imp = IMPLICATION_FREE(expression);
    const tokens = tokenize(imp);
    const parser = new Parser(tokens);
    const tree = parser.parseFormula();

    const result = CNF(NNF(tree));

    return filtered(inorder(result));
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        convertToPostfix,
        IMPLICATION_FREE,
        DISTR,
        NNF,
        CNF,
        inorder,
        filtered,
        convertToCNF
    };
}
