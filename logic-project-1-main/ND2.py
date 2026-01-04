import re
from WFF import Node, Parser, tokenize
from Natural_Deduction import *


# ------------------ Proof Parsing ------------------

class ProofLine:
    def __init__(self, number, formula, rule, references, scope_level, raw):
        self.number = number
        self.formula = formula.strip() if formula else None
        self.rule = rule
        self.references = references or []
        self.scope_level = scope_level
        self.raw = raw


def parse_reference(ref):
    if '-' in ref:
        start, end = map(int, ref.split('-'))
        return (start, end)
    return int(ref)


def parse_proof_file(filename):
    proof = []
    scope_level = 0
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            raw = line.strip('\n')
            if not raw.strip():
                continue
            if 'BeginScope' in raw:
                scope_level += 1
                proof.append(ProofLine(None, 'BeginScope', None, None, scope_level, raw))
                continue
            elif 'EndScope' in raw:
                proof.append(ProofLine(None, 'EndScope', None, None, scope_level, raw))
                scope_level -= 1
                continue
            cleaned = raw.strip()
            match = re.match(r'^(\d+)\s+(.+?)\s{4,}(.+)$', cleaned)
            if not match:
                raise ValueError(f"Invalid line: {raw}")
            number = int(match.group(1))
            formula = match.group(2).strip()
            rule_part = match.group(3).strip()
            parts = [x.strip() for x in rule_part.split(',')]
            rule = parts[0]
            refs = [parse_reference(r) for r in parts[1:]]
            proof.append(ProofLine(number, formula, rule, refs, scope_level, raw))
    return proof

def rule_output(rule, refs, known, line):
    if rule in ('Premise', 'Assumption'):
        return None
    if rule == 'Copy':
        if len(refs) != 1 or refs[0] not in known:
            return None
        return known[refs[0]]
    if rule == '⊥e':
        if len(refs) != 1 or refs[0] not in known:
            return None
        return line.formula if known[refs[0]] == '⊥' else None
    if rule == '→i':
        if len(refs) != 1 or not isinstance(refs[0], tuple):
            return None
        start, end = refs[0]
        if start not in known or end not in known or start >= end:
            return None
        return ' → '.join(
            f"({known[i]})" if len(known[i]) > 2 else known[i]
            for i in [start, end]
        )
    if rule == '¬i':
        if len(refs) != 1 or not isinstance(refs[0], tuple):
            return None
        start, end = refs[0]
        if start not in known or end not in known or start >= end:
            return None
        if known[end] != '⊥':
            return None
        return f"¬({known[start]})" if len(known[start]) > 2 else f"¬{known[start]}"
    if rule == 'PBC':
        if len(refs) != 1 or not isinstance(refs[0], tuple):
            return None
        start, end = refs[0]
        if start not in known or end not in known or start >= end:
            return None
        if known[end] != '⊥':
            return None
        return filter(known[start][1:])
    if rule == 'LEM':
        if len(refs) != 0:
            return None
        formula = line.formula
        tokens = tokenize(formula, extra='⊤⊥')
        parser = Parser(tokens, extra='⊤⊥')
        tree = parser.parse_formula()
        if not tree.is_disjunction():
            return None
        return filter(inorder(tree))
    if rule == '∨i1':
            if len(refs) != 1 or refs[0] not in known:
                return None
            formula = line.formula
            tokens= tokenize(formula, extra='⊤⊥')
            parser = Parser(tokens, extra='⊤⊥')
            tree = parser.parse_formula()
            if not tree.is_disjunction():
                return None
            left = filter(inorder(tree.left))
            if left != filter(known[refs[0]]):
                return None
            return formula
    if rule == '∨i2':
        if len(refs) != 1 or refs[0] not in known:
            return None
        formula = line.formula
        tokens= tokenize(formula, extra='⊤⊥')
        parser = Parser(tokens, extra='⊤⊥')
        tree = parser.parse_formula()
        if not tree.is_disjunction():
            return None
        right = filter(inorder(tree.right))
        if right != filter(known[refs[0]]):
            return None
        return formula
    if rule == '∨e':
        if len(refs) != 3:
            return None
        first_references = refs[0]
        formula = known.get(first_references, None)
        tokens = tokenize(formula, extra='⊤⊥')
        parser = Parser(tokens, extra='⊤⊥')
        tree = parser.parse_formula()
        if not tree.is_disjunction():
            return None
        left = filter(inorder(tree.left))
        right = filter(inorder(tree.right))
        if left != known[refs[1][0]] or right != known[refs[2][0]]:
            return None
        conc = line.formula
        if conc != known[refs[1][1]] or conc != known[refs[2][1]]:
            return None
        return conc
        
        

    func = rule_functions.get(rule)
    if func:
        # Check all references exist
        flat_refs = []
        for r in refs:
            if isinstance(r, int):
                flat_refs.append(r)
            elif isinstance(r, tuple):
                flat_refs.extend(range(r[0], r[1]+1))
        if any(r not in known for r in flat_refs):
            return None
        return func(known, flat_refs)

    return None

# ------------------ Proof Validator ------------------
def check_scopes(proof_lines):
    scope_stack = []
    scopes = []

    line_index_map = {line.number: idx for idx, line in enumerate(proof_lines) if line.number is not None}

    for i, line in enumerate(proof_lines):
        if line.formula == 'BeginScope':
            scope_stack.append(i)
        elif line.formula == 'EndScope':
            if not scope_stack:
                return "Mismatched EndScope without matching BeginScope."
            start_index = scope_stack.pop()
            scopes.append((start_index, i))

    if scope_stack:
        return "Mismatched BeginScope without matching EndScope."

    # First line must be a Premise
    for line in proof_lines:
        if line.number is not None:
            if line.rule != 'Premise':
                return f"Invalid Deduction at Line {line.number}"
            break

    for (start_idx, end_idx) in scopes:
        inner_lines = proof_lines[start_idx + 1:end_idx]
        numbered_lines = [l for l in inner_lines if l.number is not None]

        if not numbered_lines:
            continue

        first = numbered_lines[0]
        if first.rule != 'Assumption':
            return f"Invalid Deduction at Line {start_idx +1}"

        # Try to find the line **after** EndScope (end_idx + 1) as the candidate →i line
        conclusion = None
        for j in range(end_idx + 1, len(proof_lines)):
            if proof_lines[j].number is not None:
                conclusion = proof_lines[j]
                break

        if conclusion and conclusion.rule == '→i':
            if not conclusion.references or not isinstance(conclusion.references[0], tuple):
                return f"Invalid Deduction at Line {conclusion.number}"
            ref_start, ref_end = conclusion.references[0]

            last_used = numbered_lines[-1].number

            if ref_start != first.number or ref_end != last_used:
                return f"Invalid Deduction at Line {conclusion.number}"
        elif conclusion and conclusion.rule == 'PBC':
            if not conclusion.references or not isinstance(conclusion.references[0], tuple):
                return f"Invalid Deduction at Line {conclusion.number}"
            ref_start, ref_end = conclusion.references[0]
            last_used = numbered_lines[-1].number
            if ref_start != first.number or ref_end != last_used:
                return f"Invalid Deduction at Line {conclusion.number}"
        elif conclusion and conclusion.rule == '¬i':
            if not conclusion.references or not isinstance(conclusion.references[0], tuple):
                return f"Invalid Deduction at Line {conclusion.number}"
            ref_start, ref_end = conclusion.references[0]
            last_used = numbered_lines[-1].number
            if ref_start != first.number or ref_end != last_used:
                return f"Invalid Deduction at Line {conclusion.number}"
        else:
            # Not a →i, PBC, or ¬i immediately after — check if part of ∨e
            used_in_ore = False
            for l in proof_lines:
                if l.rule == '∨e':
                    if isinstance(l.references[1], tuple) and isinstance(l.references[2], tuple):
                        if not(l.references[2][0] > l.references[1][1] or l.references[1][0] > l.references[2][1]):
                            return f"Invalid Deduction at Line {l.number}"
                    for ref in l.references:
                        if isinstance(ref, tuple) and ref[0] == first.number and ref[1] == numbered_lines[-1].number:
                            used_in_ore = True
                            break
                if used_in_ore:
                    break
            if not used_in_ore:
                return f"Invalid Deduction at Line {conclusion.number}"

    return None

def validate_proof(proof_lines):
    # First check scopes
    scope_error = check_scopes(proof_lines)
    if scope_error:
        return scope_error

    known = {}
    invalid_lines = set()
    line_dependencies = {}

    def flatten_refs(refs):
        result = set()
        for r in refs:
            if isinstance(r, tuple):
                result.update(range(r[0], r[1] + 1))
            else:
                result.add(r)
        return result

    for line in proof_lines:
        if line.formula == 'BeginScope' or line.formula == 'EndScope':
            continue
        if line.rule in ('Premise', 'Assumption'):
            known[line.number] = line.formula
            line_dependencies[line.number] = set()
            continue
        expected = rule_output(line.rule, line.references, known, line)
        deps = flatten_refs(line.references)
        line_dependencies[line.number] = deps
        known[line.number] = line.formula
        if expected is None or expected != line.formula:
            invalid_lines.add(line.number)

    def depends_on_invalid(line_num, visited=None):
        if visited is None:
            visited = set()
        if line_num in visited:
            return False
        visited.add(line_num)
        if line_num in invalid_lines:
            return True
        for dep in line_dependencies.get(line_num, []):
            if depends_on_invalid(dep, visited):
                return True
        return False

    for line in proof_lines:
        if line.number is None:
            continue
        if depends_on_invalid(line.number):
            return f"Invalid Deduction at Line {line.number}"
    return "Valid Deduction"

# ------------------ Main Entrypoint ------------------

def run_validator(file_path):
    proof_lines = parse_proof_file(file_path)
    return validate_proof(proof_lines)


if __name__ == "__main__":
    import sys

    file_path = sys.argv[1] if len(sys.argv) > 1 else "ND2.txt"
    print(run_validator(file_path))
