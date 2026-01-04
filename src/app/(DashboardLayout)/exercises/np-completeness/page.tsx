import React from "react";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import CardBox from "@/app/components/shared/CardBox";
import { BlurFade } from "@/components/ui/blur-fade";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "NP-Completeness",
  },
];

function page() {
  return (
    <>
      <BreadcrumbComp title="NP-Completeness Exercises" items={BCrumb} emoji="✨" />
      <CardBox className="overflow-hidden bg-linear-to-br from-white/50 to-white/30 dark:from-slate-900/50 dark:to-slate-800/30 backdrop-blur-xl">
        <div className="space-y-8 text-lg leading-relaxed">
          <BlurFade inView delay={0.1}>
            <Card className="overflow-hidden border-0 bg-linear-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 backdrop-blur p-6 rounded-2xl">
              <div className="flex items-start gap-4 mb-4">
                <Badge className="mt-1 bg-amber-600 hover:bg-amber-700">Core Concepts</Badge>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Beyond Reductions</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Explore classic NP-completeness results, non-complete problems, and open questions about P vs NP.
                </p>
                <p>
                  Understand the fundamental aspects of computational complexity theory and how NP-completeness impacts algorithm design.
                </p>
              </div>
            </Card>
          </BlurFade>

          <BlurFade inView delay={0.2}>
            <Card className="overflow-hidden border-0 bg-linear-to-br from-red-500/10 to-pink-500/10 dark:from-red-500/20 dark:to-pink-500/20 backdrop-blur p-6 rounded-2xl space-y-4">
              <h3 className="text-xl font-bold text-foreground">Exercises</h3>
              <div className="space-y-4">
                <div className="space-y-3 pb-4 border-b border-foreground/10">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1 bg-red-600 hover:bg-red-700 shrink-0">1</Badge>
                    <div>
                      <h4 className="font-semibold text-foreground">TSP and NP-Completeness</h4>
                      <p className="text-muted-foreground text-sm mt-1">
                        Show that the Traveling Salesman Problem (TSP) is NP-complete.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pb-4 border-b border-foreground/10">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1 bg-red-600 hover:bg-red-700 shrink-0">2</Badge>
                    <div>
                      <h4 className="font-semibold text-foreground">Euler Circuits and Non-Completeness</h4>
                      <p className="text-muted-foreground text-sm mt-1">
                        Let G be an undirected graph. An Euler circuit is a simple cycle that includes all edges. The EULER problem asks if G has an Euler circuit. Show that EULER is not NP-complete.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pb-4 border-b border-foreground/10">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1 bg-red-600 hover:bg-red-700 shrink-0">3</Badge>
                    <div>
                      <h4 className="font-semibold text-foreground">Compile NP-Complete Problems</h4>
                      <p className="text-muted-foreground text-sm mt-1">
                        Consult complexity theory references to compile a list of known NP-complete problems and their characteristics.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1 bg-red-600 hover:bg-red-700 shrink-0">4</Badge>
                    <div>
                      <h4 className="font-semibold text-foreground">Undecidability and P vs NP</h4>
                      <p className="text-muted-foreground text-sm mt-1">
                        Is it possible that P = NP is undecidable within standard formal systems?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </BlurFade>

          <BlurFade inView delay={0.3}>
            <Card className="overflow-hidden border-0 bg-linear-to-br from-violet-500/10 to-purple-500/10 dark:from-violet-500/20 dark:to-purple-500/20 backdrop-blur p-6 rounded-2xl space-y-4">
              <h3 className="text-xl font-bold text-foreground">Key Concepts</h3>
              <div className="space-y-4">
                <div className="space-y-2 pb-3 border-b border-foreground/10">
                  <p className="font-semibold text-base text-foreground">NP-Completeness</p>
                  <p className="text-sm text-muted-foreground">
                    A problem is NP-complete if it is in NP and every NP problem can be reduced to it in polynomial time.
                  </p>
                </div>
                <div className="space-y-2 pb-3 border-b border-foreground/10">
                  <p className="font-semibold text-base text-foreground">P vs NP Problem</p>
                  <p className="text-sm text-muted-foreground">
                    Whether problems verifiable in polynomial time (NP) can also be solved in polynomial time (P). One of the Millennium Prize Problems.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-base text-foreground">Reduction and Hardness</p>
                  <p className="text-sm text-muted-foreground">
                    Using polynomial-time reductions to show that one problem is as hard as another, and establishing NP-hardness.
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
