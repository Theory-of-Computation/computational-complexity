from WFF import *

def convert_to_postfix(expression):
    '''
    Converts an infix Well-Formed Formula (WFF) to postfix notation.
    Precondition: expression is a valid WFF in infix notation.
    Postcondition: Returns a string representing the expression in postfix notation.
    '''
    precedence = {'¬': 3, '∧': 2, '∨': 1, '→': 0}
    output = []
    stack = []
    # Remove all spaces and then split the expression into tokens character by character
    expression = expression.replace(' ', '')
    tokens = tokenize(expression)
    for token in tokens:
        if token.islower():  # Variable
            output.append(token)
        elif token == '¬':  # Unary operator
            stack.append(token)
        elif token in ('∧', '∨', '→'):  # Binary operators
            while (stack and stack[-1] != '(' and
                   precedence[stack[-1]] >= precedence[token]):
                output.append(stack.pop())
            stack.append(token)
        elif token == '(':
            stack.append(token)
        elif token == ')':
            while stack and stack[-1] != '(':
                output.append(stack.pop())
            stack.pop()  # Pop the '(' from the stack
        else:
            raise ValueError(f"Invalid token: {token}")
    while stack:
        output.append(stack.pop())
    return ' '.join(output)

def IMPLICATION_FREE(phi):
    '''
    precondition: phi is a WFF in postfix notation
    postcondition: IMPLICATION_FREE(phi) returns a WFF in NNF without implications
    '''
    phi = convert_to_postfix(phi)
    tokens = tokenize(phi)
    if not tokens:
        raise ValueError("Invalid formula")
    
    stack = []
    for token in tokens:
        if token.islower():
            stack.append(token)
        elif token == '¬':
            operand = stack.pop()
            if operand.startswith('¬'):
                # Double negation elimination
                stack.append(operand[1:])
            else:
                stack.append(f"¬{operand}")
        elif token in ('∧', '∨'):
            right = stack.pop()
            left = stack.pop()
            stack.append(f"({left} {token} {right})")
        elif token == '→':
            right = stack.pop()
            left = stack.pop()
            stack.append(f"(¬{left} ∨ {right})")
        else:
            raise ValueError(f"Invalid token: {token}")
    
    return stack[0] if stack else ''

def DISTR(n1: Node, n2: Node):
    '''
    precondition: n1 and n2 are in CNF
    postcondition: DISTR (n1, n2) computes a CNF for n1 ∨ n2
    '''
    if n1.is_conjunction():
        return Node('∧', DISTR(n1.left, n2), DISTR(n1.right, n2))
    elif n2.is_conjunction():
        return Node('∧', DISTR(n1, n2.left), DISTR(n1, n2.right))
    else:
        return Node('∨', n1, n2)

def NNF(phi: Node):
    '''
    precondition: phi is implication free
    postcondition: NNF(phi) computes a NNF for phi
    '''
    if phi.is_literal() and phi.value.islower():
        return phi
    elif phi.is_conjunction():
        # return NNF for each argument in conjunction
        return Node('∧', NNF(phi.left), NNF(phi.right))
    elif phi.is_disjunction():
        return Node('∨', NNF(phi.left), NNF(phi.right))
    elif phi.is_negation():
        if phi.left.is_literal():
            if phi.left.value.islower():
                # Negation of a literal
                return Node('¬', phi.left)
            else:
                # Negation of a negation (double negation elimination)
                return Node(phi.left.left.value)
        elif phi.left.is_conjunction():
            # De Morgan's Law: ¬(A ∧ B) = ¬A ∨ ¬B
            return Node('∨', NNF(Node('¬', phi.left.left)), NNF(Node('¬', phi.left.right)))
        elif phi.left.is_disjunction():
            # De Morgan's Law: ¬(A ∨ B) = ¬A ∧ ¬B
            return Node('∧', NNF(Node('¬', phi.left.left)), NNF(Node('¬', phi.left.right)))
    else:
        raise ValueError("Input must be a literal, conjunction, disjunction, or negation.")

def CNF(phi: Node):
    ''' 
    precondition: phi implication free and in NNF
    postcondition: CNF(phi) computes an equivalent CNF for phi
    '''
    if phi.is_literal():
        if phi.value.islower():
            return Node(phi.value)
        else:
            return Node('¬', Node(phi.left.value))
    elif phi.is_conjunction():
        return Node('∧', CNF(phi.left), CNF(phi.right))
    elif phi.is_disjunction():
        return DISTR(CNF(phi.left), CNF(phi.right))
    else:
        raise ValueError("Input must be a literal, conjunction, or disjunction.")
    
def inorder(node: Node):
    '''
    prints the CNF in WFF using parse tree.
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
    elif node.is_double_negation():
        return f"¬¬{inorder(node.left.left)}"
    elif node.is_negation():
        return f"¬{inorder(node.left)}"

def filtered(result: str):
    '''
    Filters the CNF result to ensure it is in the correct format.
    '''
    items = result.split(' ∧ ')
    # Remove all parentheses
    items = [item.replace('(', '').replace(')', '') for item in items]
    if len(items) == 1:
        return items[0]
    # Join the items with ' ∧ ' and return
    return ' ∧ '.join(
        f"({item})" if len(item) > 2 else item
        for item in items
    )

def main():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    input_path = os.path.join(current_dir, "CNF_Input.txt")
    
    try:
        with open(input_path, "r", encoding="utf-8") as f:
            expression = f.readline().strip()
            if not expression:
                raise ValueError("Input file is empty.")

            imp = IMPLICATION_FREE(expression)
            tokens = tokenize(imp)
            parser = Parser(tokens)
            tree = parser.parse_formula()
        
            result = CNF(NNF(tree))

            print(filtered(inorder(result)))
    
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()