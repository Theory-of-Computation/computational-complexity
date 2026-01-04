'use client';

import React from "react";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import CardBox from "@/app/components/shared/CardBox";
import AssignmentSolver from "@/app/components/solvers/AssignmentSolver";
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
    title: "Complexity Theory",
  },
];

function page() {
    const ASSIGN_PY = `def generate_assignments(n):
    """Generate all 2^n binary assignments as lists of 0/1."""
    if not isinstance(n, int) or n < 1 or n > 20:
      raise ValueError("n must be between 1 and 20")

    assignments = []
    total = 1 << n  # 2^n

    for i in range(total):
      assignment = []
      for j in range(n - 1, -1, -1):
        assignment.append((i >> j) & 1)
      assignments.append(assignment)

    return assignments

  print(len(generate_assignments(3)))  # -> 8
  `;

    const PERM_PY = `def generate_permutations(arr):
    """Return a list of all permutations of arr."""
    if len(arr) <= 1:
      return [arr]

    result = []
    for i in range(len(arr)):
      rest = arr[:i] + arr[i+1:]
      for perm in generate_permutations(rest):
        result.append([arr[i]] + perm)

    return result

  print(generate_permutations([1,2,3]))  # -> [[1,2,3], [1,3,2], ...]
  `;
  return (
    <>
      <BreadcrumbComp title="Complexity Theory Exercises" items={BCrumb} emoji="🎯" />
      <CardBox className="overflow-hidden bg-linear-to-br from-white/50 to-white/30 dark:from-slate-900/50 dark:to-slate-800/30 backdrop-blur-xl">
        <div className="space-y-8 text-lg leading-relaxed">
          <BlurFade inView delay={0.1}>
            <Card className="overflow-hidden border-0 bg-linear-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 backdrop-blur p-6 rounded-2xl">
              <div className="flex items-start gap-4 mb-4">
                <Badge className="mt-1 bg-blue-600 hover:bg-blue-700">Example 14.6</Badge>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">SAT and NP</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Revisit SAT. A CNF expression of length n with m literals (m &lt; n) can
                  be encoded over Σ = {"{x, ∨, ∧, (, ), ¬, 0, 1}"} by writing subscripts in
                  binary. For instance, (x₁ ∨ x₂) ∧ (x₃ ∨ x₄) becomes (x1 ∨ x10) ∧
                  (x11 ∨ x100), giving an O(n log n) encoded length.
                </p>
                <p>
                  A nondeterministic machine can guess a trial assignment in O(n)
                  time, substitute it into the input in O(n² log n) time, and finish in
                  O(n³) overall—showing SAT ∈ NP.
                </p>
              </div>
            </Card>
          </BlurFade>

          <BlurFade inView delay={0.2}>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                Exercises on Example 14.6
              </h3>
              <Card className="overflow-hidden border-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 backdrop-blur p-6 rounded-2xl space-y-4">
                <div className="space-y-4">
                  <div className="space-y-3 pb-4 border-b border-foreground/10">
                    <div className="flex items-start gap-3">
                      <Badge className="mt-1 bg-purple-600 hover:bg-purple-700 shrink-0">1</Badge>
                      <p className="text-muted-foreground">
                        Show how a trial solution can be generated in O(n) time. All 2ⁿ
                        assignments must appear in a decision tree of height O(n).
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pb-4 border-b border-foreground/10">
                    <div className="flex items-start gap-3">
                      <Badge className="mt-1 bg-purple-600 hover:bg-purple-700 shrink-0">2</Badge>
                      <p className="text-muted-foreground">Show that checking a trial solution can be done in O(n² log n) time.</p>
                    </div>
                  </div>

                  <div className="space-y-3 pb-4 border-b border-foreground/10">
                    <div className="flex items-start gap-3">
                      <Badge className="mt-1 bg-purple-600 hover:bg-purple-700 shrink-0">3</Badge>
                      <p className="text-muted-foreground">
                        Discuss how, in HAMPATH, a permutation can be generated
                        nondeterministically in O(n⁴) time.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Badge className="mt-1 bg-purple-600 hover:bg-purple-700 shrink-0">4</Badge>
                      <p className="text-muted-foreground">In HAMPATH, show how the Hamiltonian path check can be done in O(n⁴) time.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </BlurFade>

          <BlurFade inView delay={0.3}>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-3xl pb-1.5">&lt;/&gt;</span>
                Assignment / Permutation Code (Python)
              </h3>
              <p className="text-sm text-muted-foreground">Python translations of the server helpers used by the interactive solver.</p>
              <CodeBlock code={ASSIGN_PY} language="python" showLineNumbers={true} />
              <div className="h-2" />
              <CodeBlock code={PERM_PY} language="python" showLineNumbers={true} />
            </div>
          </BlurFade>

          <BlurFade inView delay={0.4}>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                Interactive Solver
              </h3>
              <AssignmentSolver />
            </div>
          </BlurFade>
        </div>
      </CardBox>
    </>
  );
}

export default page;
