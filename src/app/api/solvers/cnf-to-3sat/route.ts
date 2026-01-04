import { NextRequest, NextResponse } from 'next/server';

function tokenizeClause(line: string): string[] {
  const cleaned = line.replace(/[(),]/g, ' ').trim();
  if (!cleaned) return [];
  return cleaned.split(/\s+/);
}

function clauseToString(clause: string[]): string {
  return `(${clause.join(' ∨ ')})`;
}

function transformClause(lits: string[], freshVar: () => string): string[][] {
  if (lits.length <= 3) return [lits];

  const clauses: string[][] = [];
  let currentAux = freshVar();

  // First clause uses first two literals + aux
  clauses.push([lits[0], lits[1], currentAux]);

  // Middle clauses (if any)
  for (let i = 2; i < lits.length - 2; i++) {
    const nextAux = freshVar();
    clauses.push([`!${currentAux}`, lits[i], nextAux]);
    currentAux = nextAux;
  }

  // Final clause uses the last two literals and negation of last aux
  clauses.push([`!${currentAux}`, lits[lits.length - 2], lits[lits.length - 1]]);

  return clauses;
}

export async function POST(request: NextRequest) {
  try {
    const { clauses } = await request.json();

    if (typeof clauses !== 'string') {
      return NextResponse.json({ message: 'clauses must be a string' }, { status: 400 });
    }

    const lines = clauses
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) {
      return NextResponse.json({ message: 'No clauses provided' }, { status: 400 });
    }

    const freshCounter = { value: 0 };
    const freshVar = () => `y${++freshCounter.value}`;

    const output: string[][] = [];

    for (const line of lines) {
      const lits = tokenizeClause(line);
      if (lits.length === 0) continue;
      const transformed = transformClause(lits, freshVar);
      output.push(...transformed);
    }

    const pretty = output.map(clauseToString).join(' ∧ ');

    return NextResponse.json({
      clauses3sat: output,
      introducedVars: freshCounter.value,
      pretty,
      message: `Transformed ${lines.length} clause(s) to ${output.length} clause(s) in 3-CNF.`,
    });
  } catch (error) {
    return NextResponse.json(
      { message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
