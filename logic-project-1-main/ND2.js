/**
 * Natural Deduction Proof Validator
 * Theory of Computation - Logic Formulas
 */

const { Node, tokenize, Parser } = require('./WFF');
const { inorder, filter, ruleFunctions } = require('./NaturalDeduction');

// ------------------ Proof Parsing ------------------

class ProofLine {
    constructor(number, formula, rule, references, scopeLevel, raw) {
        this.number = number;
        this.formula = formula ? formula.trim() : null;
        this.rule = rule;
        this.references = references || [];
        this.scopeLevel = scopeLevel;
        this.raw = raw;
    }
}

/**
 * Parse a reference which can be a single line number or a range
 * @param {string} ref - Reference string
 * @returns {number|Array<number>} Single number or array [start, end]
 */
function parseReference(ref) {
    if (ref.includes('-')) {
        const parts = ref.split('-');
        return [parseInt(parts[0]), parseInt(parts[1])];
    }
    return parseInt(ref);
}

/**
 * Parse a proof file into ProofLine objects
 * @param {string} content - File content
 * @returns {Array<ProofLine>} Array of proof lines
 */
function parseProofFile(content) {
    const proof = [];
    let scopeLevel = 0;
    const lines = content.split('\n');
    
    for (const line of lines) {
        const raw = line.trimEnd();
        if (!raw.trim()) continue;
        
        if (raw.includes('BeginScope')) {
            scopeLevel++;
            proof.push(new ProofLine(null, 'BeginScope', null, null, scopeLevel, raw));
            continue;
        } else if (raw.includes('EndScope')) {
            proof.push(new ProofLine(null, 'EndScope', null, null, scopeLevel, raw));
            scopeLevel--;
            continue;
        }
        
        const cleaned = raw.trim();
        const match = cleaned.match(/^(\d+)\s+(.+?)\s{4,}(.+)$/);
        
        if (!match) {
            throw new Error(`Invalid line: ${raw}`);
        }
        
        const number = parseInt(match[1]);
        const formula = match[2].trim();
        const rulePart = match[3].trim();
        
        const parts = rulePart.split(',').map(x => x.trim());
        const rule = parts[0];
        const refs = parts.slice(1).map(r => parseReference(r));
        
        proof.push(new ProofLine(number, formula, rule, refs, scopeLevel, raw));
    }
    
    return proof;
}

/**
 * Compute the expected output of a rule application
 * @param {string} rule - Rule name
 * @param {Array} refs - References (line numbers or ranges)
 * @param {Object} known - Known formulas by line number
 * @param {ProofLine} line - Current proof line
 * @returns {string|null} Expected formula or null
 */
function ruleOutput(rule, refs, known, line) {
    if (rule === 'Premise' || rule === 'Assumption') {
        return null;
    }
    
    if (rule === 'Copy') {
        if (refs.length !== 1 || !(refs[0] in known)) {
            return null;
        }
        return known[refs[0]];
    }
    
    if (rule === '⊥e') {
        if (refs.length !== 1 || !(refs[0] in known)) {
            return null;
        }
        return known[refs[0]] === '⊥' ? line.formula : null;
    }
    
    if (rule === '→i') {
        if (refs.length !== 1 || !Array.isArray(refs[0])) {
            return null;
        }
        const [start, end] = refs[0];
        if (!(start in known) || !(end in known) || start >= end) {
            return null;
        }
        return [start, end]
            .map(i => known[i].length > 2 ? `(${known[i]})` : known[i])
            .join(' → ');
    }
    
    if (rule === '¬i') {
        if (refs.length !== 1 || !Array.isArray(refs[0])) {
            return null;
        }
        const [start, end] = refs[0];
        if (!(start in known) || !(end in known) || start >= end) {
            return null;
        }
        if (known[end] !== '⊥') {
            return null;
        }
        return known[start].length > 2 ? `¬(${known[start]})` : `¬${known[start]}`;
    }
    
    if (rule === 'PBC') {
        if (refs.length !== 1 || !Array.isArray(refs[0])) {
            return null;
        }
        const [start, end] = refs[0];
        if (!(start in known) || !(end in known) || start >= end) {
            return null;
        }
        if (known[end] !== '⊥') {
            return null;
        }
        return filter(known[start].substring(1));
    }
    
    if (rule === 'LEM') {
        if (refs.length !== 0) {
            return null;
        }
        const formula = line.formula;
        const tokens = tokenize(formula, '⊤⊥');
        const parser = new Parser(tokens, '⊤⊥');
        const tree = parser.parseFormula();
        
        if (!tree.isDisjunction()) {
            return null;
        }
        return filter(inorder(tree));
    }
    
    if (rule === '∨i1') {
        if (refs.length !== 1 || !(refs[0] in known)) {
            return null;
        }
        const formula = line.formula;
        const tokens = tokenize(formula, '⊤⊥');
        const parser = new Parser(tokens, '⊤⊥');
        const tree = parser.parseFormula();
        
        if (!tree.isDisjunction()) {
            return null;
        }
        const left = filter(inorder(tree.left));
        if (left !== filter(known[refs[0]])) {
            return null;
        }
        return formula;
    }
    
    if (rule === '∨i2') {
        if (refs.length !== 1 || !(refs[0] in known)) {
            return null;
        }
        const formula = line.formula;
        const tokens = tokenize(formula, '⊤⊥');
        const parser = new Parser(tokens, '⊤⊥');
        const tree = parser.parseFormula();
        
        if (!tree.isDisjunction()) {
            return null;
        }
        const right = filter(inorder(tree.right));
        if (right !== filter(known[refs[0]])) {
            return null;
        }
        return formula;
    }
    
    if (rule === '∨e') {
        if (refs.length !== 3) {
            return null;
        }
        const firstReference = refs[0];
        const formula = known[firstReference];
        if (!formula) return null;
        
        const tokens = tokenize(formula, '⊤⊥');
        const parser = new Parser(tokens, '⊤⊥');
        const tree = parser.parseFormula();
        
        if (!tree.isDisjunction()) {
            return null;
        }
        const left = filter(inorder(tree.left));
        const right = filter(inorder(tree.right));
        
        if (left !== known[refs[1][0]] || right !== known[refs[2][0]]) {
            return null;
        }
        const conc = line.formula;
        if (conc !== known[refs[1][1]] || conc !== known[refs[2][1]]) {
            return null;
        }
        return conc;
    }
    
    const func = ruleFunctions[rule];
    if (func) {
        // Check all references exist
        const flatRefs = [];
        for (const r of refs) {
            if (typeof r === 'number') {
                flatRefs.push(r);
            } else if (Array.isArray(r)) {
                for (let i = r[0]; i <= r[1]; i++) {
                    flatRefs.push(i);
                }
            }
        }
        if (flatRefs.some(r => !(r in known))) {
            return null;
        }
        return func(known, flatRefs);
    }
    
    return null;
}

// ------------------ Proof Validator ------------------

/**
 * Check that scopes are properly matched and used
 * @param {Array<ProofLine>} proofLines - Array of proof lines
 * @returns {string|null} Error message or null if valid
 */
function checkScopes(proofLines) {
    const scopeStack = [];
    const scopes = [];
    
    const lineIndexMap = {};
    proofLines.forEach((line, idx) => {
        if (line.number !== null) {
            lineIndexMap[line.number] = idx;
        }
    });
    
    for (let i = 0; i < proofLines.length; i++) {
        const line = proofLines[i];
        if (line.formula === 'BeginScope') {
            scopeStack.push(i);
        } else if (line.formula === 'EndScope') {
            if (scopeStack.length === 0) {
                return "Mismatched EndScope without matching BeginScope.";
            }
            const startIndex = scopeStack.pop();
            scopes.push([startIndex, i]);
        }
    }
    
    if (scopeStack.length > 0) {
        return "Mismatched BeginScope without matching EndScope.";
    }
    
    // First line must be a Premise
    for (const line of proofLines) {
        if (line.number !== null) {
            if (line.rule !== 'Premise') {
                return `Invalid Deduction at Line ${line.number}`;
            }
            break;
        }
    }
    
    for (const [startIdx, endIdx] of scopes) {
        const innerLines = proofLines.slice(startIdx + 1, endIdx);
        const numberedLines = innerLines.filter(l => l.number !== null);
        
        if (numberedLines.length === 0) continue;
        
        const first = numberedLines[0];
        if (first.rule !== 'Assumption') {
            return `Invalid Deduction at Line ${startIdx + 1}`;
        }
        
        // Find the line after EndScope
        let conclusion = null;
        for (let j = endIdx + 1; j < proofLines.length; j++) {
            if (proofLines[j].number !== null) {
                conclusion = proofLines[j];
                break;
            }
        }
        
        if (conclusion && (conclusion.rule === '→i' || conclusion.rule === 'PBC' || conclusion.rule === '¬i')) {
            if (!conclusion.references || !Array.isArray(conclusion.references[0])) {
                return `Invalid Deduction at Line ${conclusion.number}`;
            }
            const [refStart, refEnd] = conclusion.references[0];
            const lastUsed = numberedLines[numberedLines.length - 1].number;
            
            if (refStart !== first.number || refEnd !== lastUsed) {
                return `Invalid Deduction at Line ${conclusion.number}`;
            }
        } else {
            // Check if part of ∨e
            let usedInOre = false;
            for (const l of proofLines) {
                if (l.rule === '∨e') {
                    if (Array.isArray(l.references[1]) && Array.isArray(l.references[2])) {
                        const [r1Start, r1End] = l.references[1];
                        const [r2Start, r2End] = l.references[2];
                        if (!(r2Start > r1End || r1Start > r2End)) {
                            return `Invalid Deduction at Line ${l.number}`;
                        }
                    }
                    for (const ref of l.references) {
                        if (Array.isArray(ref) && ref[0] === first.number && 
                            ref[1] === numberedLines[numberedLines.length - 1].number) {
                            usedInOre = true;
                            break;
                        }
                    }
                    if (usedInOre) break;
                }
            }
            if (!usedInOre && conclusion) {
                return `Invalid Deduction at Line ${conclusion.number}`;
            }
        }
    }
    
    return null;
}

/**
 * Validate a complete proof
 * @param {Array<ProofLine>} proofLines - Array of proof lines
 * @returns {string} Validation result message
 */
function validateProof(proofLines) {
    // First check scopes
    const scopeError = checkScopes(proofLines);
    if (scopeError) {
        return scopeError;
    }
    
    const known = {};
    const invalidLines = new Set();
    const lineDependencies = {};
    
    function flattenRefs(refs) {
        const result = new Set();
        for (const r of refs) {
            if (Array.isArray(r)) {
                for (let i = r[0]; i <= r[1]; i++) {
                    result.add(i);
                }
            } else {
                result.add(r);
            }
        }
        return result;
    }
    
    for (const line of proofLines) {
        if (line.formula === 'BeginScope' || line.formula === 'EndScope') {
            continue;
        }
        
        if (line.rule === 'Premise' || line.rule === 'Assumption') {
            known[line.number] = line.formula;
            lineDependencies[line.number] = new Set();
            continue;
        }
        
        const expected = ruleOutput(line.rule, line.references, known, line);
        const deps = flattenRefs(line.references);
        lineDependencies[line.number] = deps;
        known[line.number] = line.formula;
        
        if (expected === null || expected !== line.formula) {
            invalidLines.add(line.number);
        }
    }
    
    function dependsOnInvalid(lineNum, visited = null) {
        if (visited === null) {
            visited = new Set();
        }
        if (visited.has(lineNum)) {
            return false;
        }
        visited.add(lineNum);
        if (invalidLines.has(lineNum)) {
            return true;
        }
        for (const dep of lineDependencies[lineNum] || []) {
            if (dependsOnInvalid(dep, visited)) {
                return true;
            }
        }
        return false;
    }
    
    for (const line of proofLines) {
        if (line.number === null) continue;
        if (dependsOnInvalid(line.number)) {
            return `Invalid Deduction at Line ${line.number}`;
        }
    }
    
    return "Valid Deduction";
}

// ------------------ Main Entrypoint ------------------

/**
 * Run the validator on a proof string
 * @param {string} content - Proof file content
 * @returns {string} Validation result
 */
function runValidator(content) {
    const proofLines = parseProofFile(content);
    return validateProof(proofLines);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ProofLine,
        parseReference,
        parseProofFile,
        ruleOutput,
        checkScopes,
        validateProof,
        runValidator
    };
}
