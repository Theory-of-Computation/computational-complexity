import os
import sys

class Node:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

    def is_literal(self):
        '''
        Checks if the token is a literal (a lowercase letter).
        '''
        return True if ((self.value.islower() and not (self.left or self.right))) or (self.value.startswith('¬') and self.left.value.islower() and self.left.right is None) else False

    def is_conjunction(self):
        '''
        Checks if the token is a conjunction (∧).
        '''
        return True if (self.value == '∧' and (self.left and self.right)) else False

    def is_disjunction(self):
        '''
        Checks if the token is a disjunction (∨).
        '''
        return True if (self.value == '∨' and (self.left and self.right)) else False

    def is_implication(self):
        '''
        Checks if the token is an implication (→).
        '''
        return True if (self.value == '→' and (self.left and self.right)) else False
    
    def is_double_negation(self):
        '''
        Checks if the token is a double negation (¬¬).
        '''
        return True if (self.value == '¬' and self.left and self.left.value == '¬' and not self.right) else False

    def is_negation(self):
        '''
        Checks if the token is a negation (¬).
        '''
        return True if (self.value == '¬' and not self.right) else False

def tokenize(s: str, extra=''):
    tokens = []
    i = 0
    while i < len(s):
        c = s[i]
        if c in '()':
            tokens.append(c)
        elif c in '¬∧∨':
            tokens.append(c)
        elif c == '→':
            tokens.append('→')
        elif c.islower() or c in extra:
            tokens.append(c)
        elif c == ' ':
            pass
        else:
            return None
        i += 1
    return tokens

class Parser:
    def __init__(self, tokens, extra=''):
        self.tokens = tokens
        self.pos = 0
        self.extra = extra

    def current(self):
        return self.tokens[self.pos] if self.pos < len(self.tokens) else None

    def consume(self):
        self.pos += 1

    def parse_formula(self):
        return self.parse_binary()

    def parse_binary(self):
        node = self.parse_unary()
        while self.current() in ('∧', '∨', '→'):
            op = self.current()
            self.consume()
            right = self.parse_unary()
            node = Node(op, node, right)
        return node

    def parse_unary(self):
        token = self.current()
        if token == '¬':
            self.consume()
            operand = self.parse_unary()
            return Node('¬', operand)
        elif token == '(':
            self.consume()
            node = self.parse_formula()
            if self.current() != ')':
                raise ValueError("Missing closing parenthesis")
            self.consume()
            return node
        elif token and (token.islower() or token in self.extra):
            self.consume()
            return Node(token)
        else:
            raise ValueError("Unexpected token")


def print_tree(node, depth=0):
    if node is None:
        return
    print('  ' * depth + node.value)
    if node.left:
        print_tree(node.left, depth + 1)
    if node.right:
        print_tree(node.right, depth + 1)

def main():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    input_path = os.path.join(current_dir, "WFF_Input.txt")
    
    try:
        with open(input_path, "r", encoding="utf-8") as f:
            formula = f.readline().strip()
    except FileNotFoundError:
        print("Invalid Formula")
        return

    tokens = tokenize(formula)
    if not tokens:
        print("Invalid Formula")
        return

    try:
        parser = Parser(tokens)
        tree = parser.parse_formula()
        if parser.current() is not None:
            raise ValueError("Extra input after valid formula")
        print("Valid Formula")
        print_tree(tree)
    except Exception:
        print("Invalid Formula")

if __name__ == "__main__":
    main()
