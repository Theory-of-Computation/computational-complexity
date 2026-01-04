import { NextRequest, NextResponse } from 'next/server';

type Transition = {
  state: string;
  read: string[];
  write: string[];
  move: ('L' | 'R' | 'S')[];
  next: string;
};

type MachineDef = {
  tapes: number;
  blank: string;
  start: string;
  accept: string;
  reject: string;
  transitions: Transition[];
};

type RunResult = {
  accepted: boolean;
  steps: number;
  maxTape: number;
  reason: string;
};

function runMachine(machine: MachineDef, input: string, maxSteps: number): RunResult {
  const { tapes, blank, start, accept, reject, transitions } = machine;
  if (tapes < 1 || tapes > 3) throw new Error('Supports 1 to 3 tapes for safety');

  // Initialize tapes
  const tape: string[][] = Array.from({ length: tapes }, () => []);
  const heads: number[] = Array.from({ length: tapes }, () => 0);
  tape[0] = input.split('');
  if (tape[0].length === 0) tape[0].push(blank);

  // Ensure each tape has at least one cell
  for (let t = 0; t < tapes; t++) {
    if (tape[t].length === 0) tape[t].push(blank);
  }

  let state = start;
  let steps = 0;
  let maxTape = tape[0].length;

  const key = (q: string, reads: string[]) => `${q}|${reads.join('#')}`;
  const table = new Map<string, Transition>();
  for (const tr of transitions) {
    if (tr.read.length !== tapes || tr.write.length !== tapes || tr.move.length !== tapes) {
      throw new Error('Transition arity must match tape count');
    }
    table.set(key(tr.state, tr.read), tr);
  }

  while (steps < maxSteps) {
    if (state === accept) return { accepted: true, steps, maxTape, reason: 'Reached accept' };
    if (state === reject) return { accepted: false, steps, maxTape, reason: 'Reached reject' };

    const reads = heads.map((h, t) => tape[t][h] ?? blank);
    const tr = table.get(key(state, reads));
    if (!tr) {
      return { accepted: false, steps, maxTape, reason: 'No transition; halted' };
    }

    // Write
    for (let t = 0; t < tapes; t++) {
      tape[t][heads[t]] = tr.write[t];
    }

    // Move
    for (let t = 0; t < tapes; t++) {
      if (tr.move[t] === 'L') heads[t] -= 1;
      else if (tr.move[t] === 'R') heads[t] += 1;
      // S means stay
      if (heads[t] < 0) {
        tape[t].unshift(blank);
        heads[t] = 0;
      } else if (heads[t] >= tape[t].length) {
        tape[t].push(blank);
      }
      if (tape[t].length > maxTape) maxTape = tape[t].length;
    }

    state = tr.next;
    steps += 1;
  }

  return { accepted: false, steps, maxTape, reason: 'Step limit exceeded' };
}

export async function POST(request: NextRequest) {
  try {
    const { machine, input, maxSteps = 500 } = await request.json();
    if (!machine || typeof machine !== 'object') {
      return NextResponse.json({ message: 'machine is required' }, { status: 400 });
    }
    if (typeof input !== 'string') {
      return NextResponse.json({ message: 'input must be a string' }, { status: 400 });
    }
    const stepsCap = Math.min(Math.max(1, maxSteps), 2000);
    const result = runMachine(machine as MachineDef, input, stepsCap);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
