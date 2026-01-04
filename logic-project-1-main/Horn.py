from WFF import *

def is_kind_of_P(token: Node):
    '''
    Checks if the token is a positive literal (a lowercase letter) or a special symbol (⊥ or ⊤).
    '''
    return (token.is_literal() and not token.is_negation()) or token.value in ('⊥', '⊤')

def is_horn_clause(clause: str):
    '''
    P ::= ⊥ | ⊤ | p
    A ::= P | P ∧ A
    Horn Clause ::= A → P
    '''
    tokens = tokenize(clause, extra='⊥⊤')
    parser = Parser(tokens, extra='⊥⊤')
    tree = parser.parse_formula()
    if tree.value == '→':
        if tree.left and tree.right:
            if not(is_kind_of_P(tree.right)):
                return False
            while tree.left is not None:
                if not (tree.left.is_conjunction() or is_kind_of_P(tree.left)):
                    return False
                if not is_kind_of_P(tree.right):
                    return False
                tree = tree.left
            return True
        return False
    return False

def is_horn_formula(formula):
    '''
    Checks if the formula is a Horn formula.
    A Horn formula is a conjunction of Horn clauses.
    '''
    clauses = formula.split(')∧(')
    for clause in clauses:
        clause = clause.replace('(', '').replace(')', '')
        if not is_horn_clause(clause.strip()):
            return False
    return True

def is_satisfiable(formula):
    '''
    Checks if the Horn formula is satisfiable.
    '''
    marked = '⊤ '
    clauses = formula.split(')∧(')
    remaining_clauses = dict()
    for clause in clauses:
        clause = clause.replace('(', '').replace(')', '')
        implication_parts = clause.split('→')
        left_literals = implication_parts[0].strip().split('∧')
        if tuple(left_literals) not in remaining_clauses.keys():
            remaining_clauses[tuple(left_literals)] = implication_parts[1].strip()
        else:
            remaining_clauses[tuple(left_literals)] += ' ' + implication_parts[1].strip()
    while True:
        previous_marked = marked
        for clause in remaining_clauses:
            if all(literal in marked for literal in clause):
                if remaining_clauses[clause] not in marked:
                    marked += remaining_clauses[clause] + ' '
                    remaining_clauses.pop(clause)
                    break
        if marked == previous_marked:
            break
    if '⊥' in marked:
        return False, ''
    else:
        return True, marked.replace('⊤', '').strip()

def main():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    input_path = os.path.join(current_dir, "Horn_Input.txt")

    try:
        with open(input_path, "r", encoding="utf-8") as f:
            expression = f.readline().strip()
            if not expression:
                raise ValueError("Input file is empty.")
            
            expression = expression.replace('¬¬', '').replace(' ', '')
            if not is_horn_formula(expression):
                print("Invalid Horn Formula")
            else:
                answer, trues = is_satisfiable(expression)
                if answer:
                    print("Satisfiable")
                    if trues:
                        print(trues)
                else:
                    print("Unsatisfiable")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()