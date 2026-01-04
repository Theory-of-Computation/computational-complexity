"use client";

import React from "react";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import CardBox from "@/app/components/shared/CardBox";
import DuplicateSolver from "@/app/components/solvers/DuplicateSolver";
import TriplicateSolver from "@/app/components/solvers/TriplicateSolver";
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
    title: "Duplicates & Triplicates",
  },
];

function page() {
  const DUP_PY = `from collections import Counter

def has_duplicates(numbers):
  if not isinstance(numbers, list) or len(numbers) == 0:
    raise ValueError('Invalid input')

  freq = Counter(numbers)
  duplicates = [num for num, cnt in freq.items() if cnt > 1]

  return {
    'hasDuplicates': len(duplicates) > 0,
    'duplicateValues': duplicates,
    'message': f"Contains {len(duplicates)} duplicate value(s): {', '.join(map(str, duplicates))}" if duplicates else f"All {len(numbers)} numbers are unique."
  }
`;

  const TRIP_PY = `from collections import Counter

def has_triplicates(numbers):
  if not isinstance(numbers, list) or len(numbers) == 0:
    raise ValueError('Invalid input')

  freq = Counter(numbers)
  triplicates = [num for num, cnt in freq.items() if cnt >= 3]

  return {
    'hasTriplicates': len(triplicates) > 0,
    'triplicateValues': triplicates,
    'message': f"Contains {len(triplicates)} triplicate value(s): {', '.join(map(str, triplicates))} appear(s) 3 or more times." if triplicates else 'No values appear 3 or more times.'
  }
`;

  return (
    <>
      <BreadcrumbComp
        title="Determine Duplicates & Triplicates"
        items={BCrumb}
        emoji="🔄"
      />
      <CardBox className="overflow-hidden bg-linear-to-br from-white/50 to-white/30 dark:from-slate-900/50 dark:to-slate-800/30 backdrop-blur-xl">
        <div className="space-y-8 text-lg leading-relaxed">
          {/* <BlurFade inView>
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">🔄</div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
                Duplicates & Triplicates Exercises
              </h1>
            </div>
          </BlurFade> */}

          <BlurFade inView delay={0.1}>
            <Card className="overflow-hidden border-0 bg-linear-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 backdrop-blur p-6 rounded-2xl">
              {/* <div className="flex items-start gap-4 mb-4">
                <Badge className="mt-1 bg-green-600 hover:bg-green-700">Problem Definition</Badge>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Detect Duplicates & Triplicates in a Set</h2>
              </div> */}
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Given a set of <em>n</em> numbers x₁, x₂, …, xₙ, analyze the
                  complexity of determining whether this set contains duplicates
                  or triplicates.
                </p>
                <p>
                  Examine how the choice of algorithm and underlying
                  computational model (standard algorithm vs. Turing machine)
                  affects time complexity.
                </p>
              </div>
            </Card>
          </BlurFade>

          <BlurFade inView delay={0.2}>
            <Card className="overflow-hidden border-0 bg-linear-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 backdrop-blur p-6 rounded-2xl space-y-4">
              <div className="space-y-4">
                <div className="space-y-3 pb-4 border-b border-foreground/10">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1 bg-sky-600 hover:bg-sky-700 shrink-0">
                      1
                    </Badge>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Duplicate Detection
                      </h4>
                      <p className="text-muted-foreground text-sm mt-1">
                        Determine whether a set contains any duplicates.
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mt-2 text-muted-foreground text-sm">
                        <li>
                          <strong>(a)</strong> Suggest an algorithm and provide
                          an order-of-magnitude expression for its time
                          complexity.
                        </li>
                        <li>
                          <strong>(b)</strong> Examine whether implementing the
                          algorithm on a Turing machine affects the conclusion.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pb-4 border-b border-foreground/10">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1 bg-sky-600 hover:bg-sky-700 shrink-0">
                      2
                    </Badge>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Triplicate Detection
                      </h4>
                      <p className="text-muted-foreground text-sm mt-1">
                        Determine if the set contains any triplicates. Is the
                        algorithm as efficient as possible?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1 bg-sky-600 hover:bg-sky-700 shrink-0">
                      3
                    </Badge>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Algorithm Efficiency in Sorting
                      </h4>
                      <p className="text-muted-foreground text-sm mt-1">
                        Review how the choice of algorithm affects sorting
                        efficiency. What is the time complexity of the most
                        efficient sorting algorithms?
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
                Duplicate Detection Code (Python)
              </h3>
              <CodeBlock
                code={DUP_PY}
                language="python"
                showLineNumbers={true}
              />
            </div>
          </BlurFade>

          <BlurFade inView delay={0.4}>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                {/* <span className="text-3xl">🧪</span> */}
                Interactive Duplicate Solver
              </h3>
              <DuplicateSolver />
            </div>
          </BlurFade>

          <BlurFade inView delay={0.5}>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                {/* <span className="text-3xl">💻</span> */}
                <span className="text-3xl pb-1.5">&lt;/&gt;</span>
                Triplicate Detection Code (Python)
              </h3>
              <CodeBlock
                code={TRIP_PY}
                language="python"
                showLineNumbers={true}
              />
            </div>
          </BlurFade>

          <BlurFade inView delay={0.6}>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                {/* <span className="text-3xl">🧪</span> */}
                Interactive Triplicate Solver
              </h3>
              <TriplicateSolver />
            </div>
          </BlurFade>

          <BlurFade inView delay={0.7}>
            <Card className="overflow-hidden border-0 bg-linear-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 backdrop-blur p-6 rounded-2xl space-y-4">
              <h3 className="text-xl font-bold text-foreground">
                Key Concepts
              </h3>
              <div className="space-y-4">
                <div className="space-y-2 pb-3 border-b border-foreground/10">
                  <p className="font-semibold text-base text-foreground">
                    Time Complexity Analysis
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Analyzing the efficiency of algorithms for detecting
                    duplicates and triplicates in sets.
                  </p>
                </div>
                <div className="space-y-2 pb-3 border-b border-foreground/10">
                  <p className="font-semibold text-base text-foreground">
                    Sorting and Hashing Approaches
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Different approaches including sorting (O(n log n)) and
                    hashing (O(n) average case).
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-base text-foreground">
                    Turing Machine Considerations
                  </p>
                  <p className="text-sm text-muted-foreground">
                    How computational models affect the analysis of algorithm
                    efficiency and complexity bounds.
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
