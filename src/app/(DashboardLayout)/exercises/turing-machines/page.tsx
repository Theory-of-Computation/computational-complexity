'use client';

import React from "react";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import CardBox from "@/app/components/shared/CardBox";
import TuringMachineSolver from "@/app/components/solvers/TuringMachineSolver";
import CodeBlock from "@/app/components/shared/CodeBlock";
import { BlurFade } from "@/components/ui/blur-fade";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Turing Machines",
  },
];

function page() {
  return (
    <>
      <BreadcrumbComp title="Turing Machine Exercises" items={BCrumb} emoji="🤖" />
      <CardBox className="overflow-hidden bg-linear-to-br from-white/50 to-white/30 dark:from-slate-900/50 dark:to-slate-800/30 backdrop-blur-xl">
        <div className="space-y-8 text-lg leading-relaxed">
          <BlurFade inView delay={0.1}>
            <Card className="overflow-hidden border-0 bg-linear-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 backdrop-blur p-6 rounded-2xl space-y-4">
              <div className="space-y-4">
                <div className="space-y-3 pb-4 border-b border-foreground/10">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1 bg-purple-600 hover:bg-purple-700 shrink-0">1</Badge>
                    <div>
                      <h4 className="font-semibold text-foreground">Linear-Time Algorithm for ww Language</h4>
                      <p className="text-muted-foreground text-sm mt-1">
                        Find a linear-time algorithm for membership in {"{ww : w ∈ {a, b}*}"}
                        using a two-tape Turing machine. What is the best you could expect
                        on a one-tape machine?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pb-4 border-b border-foreground/10">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1 bg-purple-600 hover:bg-purple-700 shrink-0">2</Badge>
                    <div>
                      <h4 className="font-semibold text-foreground">Off-line Single-Tape to Standard Turing Machine</h4>
                      <p className="text-muted-foreground text-sm mt-1">
                        Show that any computation that can be performed on a single-tape,
                        off-line Turing machine in time O(T(n)) can also be performed on a
                        standard Turing machine in time O(T(n)).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pb-4 border-b border-foreground/10">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1 bg-purple-600 hover:bg-purple-700 shrink-0">3</Badge>
                    <div>
                      <h4 className="font-semibold text-foreground">Standard to Semi-Infinite Tape Conversion</h4>
                      <p className="text-muted-foreground text-sm mt-1">
                        Show that any computation that can be performed on a standard
                        Turing machine in time O(T(n)) can also be performed on a Turing
                        machine with one semi-infinite tape in time O(T'(n)).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pb-4 border-b border-foreground/10">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1 bg-purple-600 hover:bg-purple-700 shrink-0">6</Badge>
                    <div>
                      <h4 className="font-semibold text-foreground">Generalize Theorem 14.1 for k-Tapes</h4>
                      <p className="text-muted-foreground text-sm mt-1">
                        Show that n moves on a k-tape machine can be simulated on a
                        standard machine in O(n²) moves.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1 bg-purple-600 hover:bg-purple-700 shrink-0">7</Badge>
                    <div>
                      <h4 className="font-semibold text-foreground">Tape Configuration Growth</h4>
                      <p className="text-muted-foreground text-sm mt-1">
                        In the proof of Theorem 14.2 we ignored one fine point. When a
                        configuration grows, the rest of the tape's contents have to be
                        moved. Does this oversight affect the conclusion?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </BlurFade>

          <BlurFade inView delay={0.2}>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                Interactive Solver
              </h3>
              <TuringMachineSolver />
            </div>
          </BlurFade>

          <BlurFade inView delay={0.3}>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-3xl pb-1.5">&lt;/&gt;</span>
                Turing Machine Helpers Code (Python)
              </h3>
              <CodeBlock
            code={`def check_ww_two_tape(s):
        s = s.strip()
        if len(s) == 0:
          return { 'accepted': False, 'steps': 0, 'max_tape': 0, 'reason': 'Empty string' }
        n = len(s)
        if n % 2 != 0:
          return { 'accepted': False, 'steps': n, 'max_tape': n, 'reason': 'Length is odd; cannot be ww' }
        mid = n // 2
        first, second = s[:mid], s[mid:]
        return { 'accepted': first == second, 'steps': n, 'max_tape': n, 'reason': 'Matched' if first == second else 'Halves differ' }

      def run_machine(machine, input_str, max_steps=500):
        tapes = machine.get('tapes', 1)
        blank = machine.get('blank', '_')
        start = machine.get('start')
        accept = machine.get('accept')
        reject = machine.get('reject')
        transitions = machine.get('transitions', [])

        if tapes < 1 or tapes > 3:
          raise ValueError('Supports 1 to 3 tapes for safety')

        tape = [[] for _ in range(tapes)]
        heads = [0] * tapes
        tape[0] = list(input_str) if input_str else [blank]
        for t in range(tapes):
          if not tape[t]:
            tape[t].append(blank)

        state = start
        steps = 0
        max_tape = max(len(t) for t in tape)

        def key(q, reads):
          return (q, tuple(reads))

        table = {}
        for tr in transitions:
          table[key(tr['state'], tuple(tr['read']))] = tr

        while steps < max_steps:
          if state == accept:
            return { 'accepted': True, 'steps': steps, 'max_tape': max_tape, 'reason': 'Reached accept' }
          if state == reject:
            return { 'accepted': False, 'steps': steps, 'max_tape': max_tape, 'reason': 'Reached reject' }

          reads = [ tape[t][heads[t]] if 0 <= heads[t] < len(tape[t]) else blank for t in range(tapes) ]
          tr = table.get(key(state, tuple(reads)))
          if not tr:
            return { 'accepted': False, 'steps': steps, 'max_tape': max_tape, 'reason': 'No transition; halted' }

          # write
          for t in range(tapes):
            tape[t][heads[t]] = tr['write'][t]

          # move
          for t in range(tapes):
            mv = tr['move'][t]
            if mv == 'L':
              heads[t] -= 1
            elif mv == 'R':
              heads[t] += 1
            # ensure tape bounds
            if heads[t] < 0:
              tape[t].insert(0, blank)
              heads[t] = 0
            elif heads[t] >= len(tape[t]):
              tape[t].append(blank)
            if len(tape[t]) > max_tape:
              max_tape = len(tape[t])

          state = tr['next']
          steps += 1

        return { 'accepted': False, 'steps': steps, 'max_tape': max_tape, 'reason': 'Step limit exceeded' }

      print(check_ww_two_tape('abab'))`}
                language="python"
                showLineNumbers={true}
              />
            </div>
          </BlurFade>
        </div>
      </CardBox>
    </>
  );
}

export default page;
