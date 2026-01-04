from CNF import convert_to_postfix
from WFF import *

def inorder(node: Node):
    '''
    Convert a WFF node to an infix string representation.
    '''
    if node is None:
        return ''
    if node.is_literal() and node.value.islower():
        return node.value
    elif node.is_conjunction():
        return f"({inorder(node.left)} ∧ {inorder(node.right)})"
    elif node.is_disjunction():
        return f"({inorder(node.left)} ∨ {inorder(node.right)})"
    elif node.is_implication():
        return f"({inorder(node.left)} → {inorder(node.right)})"
    elif node.is_negation():
        return f"(¬{inorder(node.left)})"
    elif node.value in '⊤⊥':
        return node.value

def filter(expression: str):
    '''
    If there is only one operand except negation or double negation, it will be returned without parentheses.
    '''
    # Remove outer parentheses if they are not needed
    if expression.startswith('(') and expression.endswith(')'):
        inner = expression[1:-1].strip()
        try:
            convert_to_postfix(inner)
            return inner
        except:
            return expression
    return expression

def and_intro(formulas, lines):
    if len(lines) != 2:
        return None
    try:
        formulas = [filter(formulas[i]) for i in lines]
    except:
        return None
    return ' ∧ '.join(f"({formulas[i]})" if len(formulas[i]) > 2 else formulas[i] for i in range(len(formulas)))

def and_elim_1(formulas, lines):
    if len(lines) != 1:
        return None
    try:
        formula = formulas[lines[0]]
        formula = filter(formula.strip())
        tokens = tokenize(formula, extra='⊤⊥')
        parser = Parser(tokens, extra='⊤⊥')
        tree = parser.parse_formula()
        if not tree.is_conjunction():
            return None
        return filter(inorder(tree.left))
    except:
        return None

def and_elim_2(formulas, lines):
    if len(lines) != 1:
        return None
    try:
        formula = formulas[lines[0]]
        formula = filter(formula.strip())
        tokens = tokenize(formula, extra='⊤⊥')
        parser = Parser(tokens, extra='⊤⊥')
        tree = parser.parse_formula()
        if not tree.is_conjunction():
            return None
        return filter(inorder(tree.right))
    except:
        return None

def implication_elim(formulas, lines):
    if len(lines) != 2:
        return None
    try:
        imp = filter(formulas[lines[0]])
        premise = filter(formulas[lines[1]])
        imp_tokens = tokenize(imp, extra='⊤⊥')
        premise_tokens = tokenize(premise, extra='⊤⊥')
        imp_parser = Parser(imp_tokens, extra='⊤⊥')
        premise_parser = Parser(premise_tokens, extra='⊤⊥')
        imp_tree = imp_parser.parse_formula()
        premise_tree = premise_parser.parse_formula()
        if not imp_tree.is_implication():
            return None
        if filter(inorder(premise_tree)) == filter(inorder(imp_tree.left)):
            return filter(inorder(imp_tree.right))
        return None
        
    except:
        return None

def negation_elim(formulas, lines):
    if len(lines) != 2:
        return None
    try:
        first_formula = convert_to_postfix(formulas[lines[0]])
        second_formula = convert_to_postfix(formulas[lines[1]])
    except:
        return None
    if second_formula == first_formula + " ¬":
        return "⊥"
    return None

def double_neg_elim(formulas, lines):
    if len(lines) != 1:
        return None
    try:
        formula = filter(formulas[lines[0]])
        tokens = tokenize(formula, extra='⊤⊥')
        parser = Parser(tokens, extra='⊤⊥')
        tree = parser.parse_formula()
        if not tree.is_double_negation():
            return None
        inner_formula = inorder(tree.left.left)
        return filter(inner_formula)
    except:
        return None

def double_neg_intro(formulas, lines):
    if len(lines) != 1:
        return None
    try:
        formula = filter(formulas[lines[0]])
        tokens = tokenize(formula, extra='⊤⊥')
        parser = Parser(tokens, extra='⊤⊥')
        tree = parser.parse_formula()
        return f"¬¬{formula}" if tree.is_literal() else f"¬¬({formula})"
    except:
        return None

def modus_tollens(formulas, lines):
    if len(lines) != 2:
        return None
    try:
        imp_line = filter(formulas[lines[0]])
        neg_line = filter(formulas[lines[1]])
        imp_tokens = tokenize(imp_line, extra='⊤⊥')
        imp_parser = Parser(imp_tokens, extra='⊤⊥')
        imp_tree = imp_parser.parse_formula()
        neg_tokens = tokenize(neg_line, extra='⊤⊥')
        neg_parser = Parser(neg_tokens, extra='⊤⊥')
        neg_tree = neg_parser.parse_formula()
        if not neg_tree.is_negation():
            return None
        if not imp_tree.is_implication():
            return None
        if filter(inorder(neg_tree)) == filter(f"¬{inorder(imp_tree.right)}"):
            return filter(f"(¬{inorder(imp_tree.left)})")
        return None
    except:
        return None

rule_functions = {
    '∧i': and_intro,
    '∧e1': and_elim_1,
    '∧e2': and_elim_2,
    '→e': implication_elim,
    '¬e': negation_elim,
    '¬¬e': double_neg_elim,
    '¬¬i': double_neg_intro,
    'MT': modus_tollens,
}


def parse_input(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        lines = file.read().strip().split('\n')
    formulas = {}
    for line in lines[:-1]:
        if line.strip():
            number, formula = line.split('    ')
            formulas[int(number)] = formula.strip()
    rule_line = lines[-1].strip()
    rule_parts = [x.strip() for x in rule_line.split(',')]
    rule_name = rule_parts[0]
    rule_lines = [int(x) for x in rule_parts[1:]]
    return formulas, rule_name, rule_lines

def apply_rule(formulas, rule_name, rule_lines):
    func = rule_functions.get(rule_name)
    if not func:
        return None
    return func(formulas, rule_lines)

if __name__ == '__main__':
    input_file = 'Natural_Deduction_Input.txt'
    formulas, rule_name, rule_lines = parse_input(input_file)
    result = apply_rule(formulas, rule_name, rule_lines)
    if result is None:
        print("Rule Cannot Be Applied")
    else:
        print(result)