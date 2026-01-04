'use client';

import React from "react";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import CardBox from "@/app/components/shared/CardBox";
import StringRecognitionSolver from "@/app/components/solvers/StringRecognitionSolver";
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
    title: "String Recognition",
  },
];

function page() {
  return (
    <>
      <BreadcrumbComp title="String Recognition Exercises" items={BCrumb} />
      <CardBox className="overflow-hidden bg-linear-to-br from-white/50 to-white/30 dark:from-slate-900/50 dark:to-slate-800/30 backdrop-blur-xl">
        <div className="space-y-8 text-lg leading-relaxed">
          <BlurFade inView>
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">🔤</div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-pink-600 to-red-600 dark:from-pink-400 dark:to-red-400">
                String Recognition Exercises
              </h1>
            </div>
          </BlurFade>

          <BlurFade inView delay={0.1}>
            <Card className="overflow-hidden border-0 bg-linear-to-br from-pink-500/10 to-red-500/10 dark:from-pink-500/20 dark:to-red-500/20 backdrop-blur p-6 rounded-2xl">
              <div className="flex items-start gap-4 mb-4">
                <Badge className="mt-1 bg-pink-600 hover:bg-pink-700">Example 14.4</Badge>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Non-Context-Free Language Recognition</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  The non-context-free language L = {"{ww : w ∈ {a, b}*}"} is in NTIME(n).
                </p>
                <p>
                  Recognize strings where the input is of the form ww (a string concatenated with itself).
                </p>
              </div>
            </Card>
          </BlurFade>

          <BlurFade inView delay={0.2}>
            <Card className="overflow-hidden border-0 bg-linear-to-br from-orange-500/10 to-pink-500/10 dark:from-orange-500/20 dark:to-pink-500/20 backdrop-blur p-6 rounded-2xl space-y-4">
              <div className="space-y-4">
                <div className="space-y-3 pb-4 border-b border-foreground/10">
                  <h3 className="font-bold text-lg text-foreground">1. Complete the Argument</h3>
                  <p className="text-muted-foreground">
                    Complete the argument showing L = {"{ww : w ∈ {a, b}*}"} is in DTIME(n) by devising an
                    algorithm for finding the middle of a string in O(n) time.
                  </p>
                </div>

                <div className="space-y-3 pb-4 border-b border-foreground/10">
                  <h3 className="font-bold text-lg text-foreground">2. String Pattern wwᵣw</h3>
                  <p className="text-muted-foreground">
                    Show that L = {"{wwᵣw : w ∈ {a, b}*}"} is in DTIME(n).
                  </p>
                </div>

                <div className="space-y-3 pb-4 border-b border-foreground/10">
                  <h3 className="font-bold text-lg text-foreground">3. String Pattern www</h3>
                  <p className="text-muted-foreground">
                    Show that L = {"{www : w ∈ {a, b}*}"} is in DTIME(n).
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-foreground">4. Languages Outside NTIME(2ⁿ)</h3>
                  <p className="text-muted-foreground">
                    Discuss complexity bounds and time hierarchies in language recognition.
                  </p>
                </div>
              </div>
            </Card>
          </BlurFade>

          <BlurFade inView delay={0.3}>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-3xl">💻</span>
                String Recognition (Python)
              </h3>
              <CodeBlock
                code={`def is_ww(s):
        if len(s) % 2 != 0:
          return { 'match': False, 'breakdown': f"String length ({len(s)}) is odd." }
        mid = len(s) // 2
        first, second = s[:mid], s[mid:]
        return { 'match': first == second, 'breakdown': f'First: "{first}", Second: "{second}"' }

      def is_wwrw(s):
        for i in range(1, len(s)):
          w = s[:i]
          if s == w + w[::-1] + w:
            return { 'match': True, 'breakdown': f'w="{w}", w^r="{w[::-1]}"' }
        return { 'match': False, 'breakdown': 'No valid w found' }

      def is_www(s):
        if len(s) % 3 != 0:
          return { 'match': False, 'breakdown': f"Length {len(s)} not divisible by 3." }
        part = len(s) // 3
        a, b, c = s[:part], s[part:2*part], s[2*part:]
        return { 'match': a == b == c, 'breakdown': f'Parts: "{a}", "{b}", "{c}"' }

      print(is_ww('abab'))
      print(is_wwrw('abaaba'))
      print(is_www('xyzxyzxyz'))`}
                language="python"
                showLineNumbers={true}
              />
            </div>
          </BlurFade>

          <BlurFade inView delay={0.4}>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-3xl">🧪</span>
                Interactive Solver
              </h3>
              <StringRecognitionSolver />
            </div>
          </BlurFade>

          <BlurFade inView delay={0.5}>
            <Card className="overflow-hidden border-0 bg-linear-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 backdrop-blur p-6 rounded-2xl space-y-4">
              <h3 className="text-xl font-bold text-foreground">Key Concepts</h3>
              <div className="space-y-4">
                <div className="space-y-2 pb-3 border-b border-foreground/10">
                  <p className="font-semibold text-base text-foreground">DTIME(n)</p>
                  <p className="text-sm text-muted-foreground">
                    Class of languages recognized by deterministic Turing machines in linear time O(n).
                  </p>
                </div>
                <div className="space-y-2 pb-3 border-b border-foreground/10">
                  <p className="font-semibold text-base text-foreground">NTIME(n)</p>
                  <p className="text-sm text-muted-foreground">
                    Class of languages recognized by nondeterministic Turing machines in linear time O(n).
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-base text-foreground">Time Hierarchy Theorem</p>
                  <p className="text-sm text-muted-foreground">
                    For any properly-defined time function f, DTIME(f) ⊂ DTIME(f² log f).
                    There are languages not recognizable in any fixed bounded time.
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
