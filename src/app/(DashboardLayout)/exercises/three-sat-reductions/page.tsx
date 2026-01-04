'use client';

import React from "react";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import CardBox from "@/app/components/shared/CardBox";
import CnfTo3SatSolver from "@/app/components/solvers/CnfTo3SatSolver";
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
    title: "3-SAT Reductions",
  },
];

function page() {
  return (
    <>
      <BreadcrumbComp title="Reductions to 3-SAT" items={BCrumb} emoji="📋" />
      <CardBox className="overflow-hidden bg-linear-to-br from-white/50 to-white/30 dark:from-slate-900/50 dark:to-slate-800/30 backdrop-blur-xl">
        <div className="space-y-8 text-lg leading-relaxed">
          <BlurFade inView delay={0.1}>
            <Card className="overflow-hidden border-0 bg-linear-to-br from-indigo-500/10 to-blue-500/10 dark:from-indigo-500/20 dark:to-blue-500/20 backdrop-blur p-6 rounded-2xl">
              <div className="flex items-start gap-4 mb-4">
                <Badge className="mt-1 bg-indigo-600 hover:bg-indigo-700">Focus Area</Badge>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">SAT → 3-SAT Reductions</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Explore reductions that transform general SAT instances into 3-SAT while preserving satisfiability and keeping work polynomial.
                </p>
                <p>
                  Understand how to systematically convert complex boolean formulas with many literals per clause into equivalent 3-SAT instances.
                </p>
              </div>
            </Card>
          </BlurFade>

          <BlurFade inView delay={0.2}>
            <Card className="overflow-hidden border-0 bg-linear-to-br from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20 backdrop-blur p-6 rounded-2xl space-y-4">
              <h3 className="text-xl font-bold text-foreground">Exercises</h3>
              <div className="space-y-4">
                <div className="space-y-3 pb-4 border-b border-foreground/10">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1 bg-cyan-600 hover:bg-cyan-700 shrink-0">1</Badge>
                    <div>
                      <h4 className="font-semibold text-foreground">Reduce 5-Literal Clauses to 3-SAT</h4>
                      <p className="text-muted-foreground text-sm mt-1">
                        Show how a CNF expression with clauses of five literals can be reduced to 3-SAT. Generalize to clauses with an arbitrary number of literals.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1 bg-cyan-600 hover:bg-cyan-700 shrink-0">2</Badge>
                    <div>
                      <h4 className="font-semibold text-foreground">Polynomial Time Reduction</h4>
                      <p className="text-muted-foreground text-sm mt-1">
                        Show that the SAT → 3-SAT reduction can be done in polynomial time, preserving the complexity class.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </BlurFade>

          <BlurFade inView delay={0.3}>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-3xl pb-1.5">&lt;/&gt;</span>
                CNF → 3-SAT Code (Python)
              </h3>
              <CodeBlock
                code={`def tokenize_clause(line):
        cleaned = line.replace('(', ' ').replace(')', ' ').replace(',', ' ').strip()
        if not cleaned:
          return []
        return cleaned.split()

      def transform_clause(lits, fresh_var):
        if len(lits) <= 3:
          return [lits]

        clauses = []
        current_aux = fresh_var()
        clauses.append([lits[0], lits[1], current_aux])

        for i in range(2, len(lits) - 2):
          next_aux = fresh_var()
          clauses.append([f'!{current_aux}', lits[i], next_aux])
          current_aux = next_aux

        clauses.append([f'!{current_aux}', lits[-2], lits[-1]])
        return clauses

      def cnf_to_3sat(text):
        lines = [l.strip() for l in text.splitlines() if l.strip()]
        counter = {'v': 0}
        def fresh():
          counter['v'] += 1
          return f'y{counter["v"]}'

        output = []
        for line in lines:
          lits = tokenize_clause(line)
          if not lits:
            continue
          output.extend(transform_clause(lits, fresh))

        pretty = ' ∧ '.join(['(' + ' ∨ '.join(c) + ')' for c in output])
        return { 'clauses3sat': output, 'introducedVars': counter['v'], 'pretty': pretty }

      # Example usage:
      print(cnf_to_3sat('a b c d e\n!x y z\np q r'))`}
                language="python"
                showLineNumbers={true}
              />
            </div>
          </BlurFade>

          <BlurFade inView delay={0.4}>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                Interactive 3-SAT Solver
              </h3>
              <CnfTo3SatSolver />
            </div>
          </BlurFade>

          <BlurFade inView delay={0.5}>
            <Card className="overflow-hidden border-0 bg-linear-to-br from-teal-500/10 to-cyan-500/10 dark:from-teal-500/20 dark:to-cyan-500/20 backdrop-blur p-6 rounded-2xl space-y-4">
              <h3 className="text-xl font-bold text-foreground">Key Concepts</h3>
              <div className="space-y-4">
                <div className="space-y-2 pb-3 border-b border-foreground/10">
                  <p className="font-semibold text-base text-foreground">CNF to 3-SAT Reduction</p>
                  <p className="text-sm text-muted-foreground">
                    Systematic process of converting Conjunctive Normal Form with arbitrary clause sizes into 3-SAT by introducing fresh variables.
                  </p>
                </div>
                <div className="space-y-2 pb-3 border-b border-foreground/10">
                  <p className="font-semibold text-base text-foreground">Fresh Variable Introduction</p>
                  <p className="text-sm text-muted-foreground">
                    Auxiliary variables used in the reduction to ensure satisfiability equivalence while maintaining polynomial size expansion.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-base text-foreground">Polynomial Reductions</p>
                  <p className="text-sm text-muted-foreground">
                    Methods to transform NP-complete problems into each other while preserving polynomial time bounds.
                  </p>
                </div>
              </div>
            </Card>
          </BlurFade>
        </div>
      </CardBox>
    </>
  );
}

export default page;
