"use client";
import React, { useState } from "react";
import Link from "next/link";
import { LightRays } from "@/components/ui/light-rays";
import CardBox from "../components/shared/CardBox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ShineBorder } from "@/components/ui/shine-border";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { Meteors } from "@/components/ui/meteors";
import { TextAnimate } from "@/components/ui/text-animate";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Optional dashboard widgets (kept for later use)
// import SalesOverview from "../components/dashboard/SalesOverview";
// import { YearlyBreakup } from "../components/dashboard/YearlyBreakup";
// import { MonthlyEarning } from "../components/dashboard/MonthlyEarning";
// import { RecentTransaction } from "../components/dashboard/RecentTransaction";
// import { ProductPerformance } from "../components/dashboard/ProductPerformance";
// import { Footer } from "../components/dashboard/Footer";
// import { TopCards } from "../components/dashboard/TopCards";
// import ProfileWelcome from "../components/dashboard/ProfileWelcome";

function Page() {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const gallery = [
    "Screenshot from 2025-12-16 13-15-52.png",
    "Screenshot from 2025-12-16 13-16-08.png",
    "Screenshot from 2025-12-16 13-16-14.png",
    "Screenshot from 2025-12-16 13-16-24.png",
    "Screenshot from 2025-12-16 13-16-33.png",
    "Screenshot from 2025-12-16 13-16-41.png",
    "Screenshot from 2025-12-16 13-16-50.png",
    "Screenshot from 2025-12-16 13-16-54.png",
  ];

  return (
    <main className="relative min-h-screen">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950" />
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(147,51,234,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.15),transparent_50%)]" />
      </div>

      <div className="space-y-16 lg:px-4 py-8">
        {/* Hero */}
        <section
          aria-label="Computational Complexity overview"
          className="relative overflow-hidden w-dvw md:w-auto rounded-3xl border border-white/20 dark:border-white/10 bg-linear-to-br from-white/40 to-white/20 dark:from-slate-900/40 dark:to-slate-900/20 backdrop-blur-xl"
        >
          <div className="absolute inset-0">
            <LightRays speed={2} blur={35} count={13} length="80vh" />
            <Meteors number={20} />
          </div>

          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center py-20 px-6 text-center sm:py-28 md:py-40">
            {/* Badge */}
            {/* <BlurFade inView>
              <Badge variant="outline" className="mb-6 border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-900/30 dark:text-purple-300 text-sm py-1.5 px-3">
                ✨ Interactive Learning Platform
              </Badge>
            </BlurFade> */}

            {/* Main Title */}
            <BlurFade inView delay={0.1}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight drop-shadow-lg mb-6 bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                Computational Complexity
              </h1>
            </BlurFade>

            {/* Subtitle */}
            <BlurFade inView delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 font-medium">
                Master the efficiency of computation through hands-on, interactive exercises
              </p>
            </BlurFade>

            {/* CTA Buttons */}
            <BlurFade inView delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <a href="/exercises/complexity-theory">
                    Start Learning
                  </a>
                </Button>
                <Button 
                  asChild 
                  size="lg"
                  variant="outline"
                  className="font-semibold"
                >
                  <a href="/pdf/Chapter14.pdf" download>
                    Download PDF
                  </a>
                </Button>
              </div>
            </BlurFade>

            {/* Stats */}
            <BlurFade inView delay={0.4}>
              <div className="grid grid-cols-3 gap-8 mb-12 max-w-md">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">6</div>
                  <div className="text-sm text-muted-foreground mt-2">Interactive Exercises</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">50+</div>
                  <div className="text-sm text-muted-foreground mt-2">Algorithms to Solve</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">100%</div>
                  <div className="text-sm text-muted-foreground mt-2">Open Source</div>
                </div>
              </div>
            </BlurFade>

            {/* Image Gallery */}
            <BlurFade inView delay={0.5}>
              <div className="w-full">
                <p className="text-sm text-muted-foreground mb-4 font-medium">Featured Examples</p>
                <Marquee pauseOnHover className="py-4 [--duration:40s]">
                  {gallery.map((src) => (
                    <div
                      key={src}
                      onClick={() => setFullscreenImage(src)}
                      className="group relative mx-2 h-48 w-80 overflow-hidden rounded-xl border border-white/20 bg-linear-to-br from-white/40 to-white/20 dark:border-white/10 dark:from-slate-800/40 dark:to-slate-800/20 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <img
                        src={`/images/comp-comp/${src}`}
                        alt={src}
                        className="h-full w-full object-cover group-hover:brightness-110 transition-all duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </Marquee>
              </div>
            </BlurFade>

            {/* Fullscreen Image Modal */}
            {fullscreenImage && (
              <div
                onClick={() => setFullscreenImage(null)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
              >
                <img
                  src={`/images/comp-comp/${fullscreenImage}`}
                  alt="Fullscreen"
                  className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
                />
              </div>
            )}
          </div>
        </section>

        {/* Intro + Sections */}
        <CardBox className="relative overflow-hidden border-0 bg-linear-to-br from-white/50 to-white/30 dark:from-slate-900/50 dark:to-slate-800/30 backdrop-blur-xl shadow-2xl">
          <div className="absolute inset-0 opacity-20">
            <LightRays speed={5} blur={50} count={8} length="90vh" />
          </div>
          <div className="relative mx-auto max-w-4xl space-y-12">
            {/* Main intro */}
            <BlurFade inView>
              <p className="text-lg md:text-xl leading-8 text-muted-foreground font-medium">
                This chapter introduces the <span className="text-foreground font-bold">second pillar of the theory of computation</span>: complexity theory. We focus on how efficiently problems
                can be solved, outline core questions in the area, and highlight the
                role of nondeterminism.
              </p>
            </BlurFade>

            <Separator className="bg-linear-to-r from-transparent via-purple-500/30 to-transparent" />

            {/* What We Focus On */}
            <BlurFade inView delay={0.1}>
              <div className="space-y-4 p-6 rounded-2xl bg-linear-to-br from-blue-50/50 to-indigo-50/30 dark:from-blue-900/20 dark:to-indigo-900/10 border border-blue-200/30 dark:border-blue-800/30 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🎯</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    What We Focus On
                  </h2>
                </div>
                <p className="text-base md:text-lg leading-7 text-muted-foreground">
                  This site emphasizes <span className="font-semibold text-foreground">hands-on, solvable exercises</span> and runnable
                  examples. We intentionally skip long-form proofs and purely
                  conceptual drills. Instead, you will practice building and running
                  procedures, testing hypotheses on real inputs, and interpreting
                  the outputs of concrete algorithms.
                </p>
              </div>
            </BlurFade>

            {/* Efficiency of Computation */}
            <BlurFade inView delay={0.2}>
              <div className="space-y-4 p-6 rounded-2xl bg-linear-to-br from-purple-50/50 to-pink-50/30 dark:from-purple-900/20 dark:to-pink-900/10 border border-purple-200/30 dark:border-purple-800/30 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">⚡</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    14.1 Efficiency of Computation
                  </h2>
                </div>
                <p className="text-base md:text-lg leading-7 text-muted-foreground">
                  We analyze complexity using three simplifying assumptions: (1) the
                  standard computational model is the <span className="font-semibold text-foreground">Turing machine</span>, (2) the input
                  size is denoted by <code className="bg-foreground/10 px-2 py-1 rounded text-sm font-mono">n</code>, and (3)
                  we study <span className="font-semibold text-foreground">worst-case behavior</span> as <code className="bg-foreground/10 px-2 py-1 rounded text-sm font-mono">n</code> grows. We summarize running
                  time with <span className="font-semibold text-foreground">order-of-growth notation</span> (for example, Big-O).
                </p>
              </div>
            </BlurFade>

            {/* Complexity and Turing Machine Models */}
            <BlurFade inView delay={0.3}>
              <div className="space-y-4 p-6 rounded-2xl bg-linear-to-br from-orange-50/50 to-red-50/30 dark:from-orange-900/20 dark:to-red-900/10 border border-orange-200/30 dark:border-orange-800/30 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🤖</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    14.2 Complexity & Turing Machine Models
                  </h2>
                </div>
                <p className="text-base md:text-lg leading-7 text-muted-foreground">
                  The choice of machine model can affect efficiency. While
                  multi-tape and single-tape Turing machines differ by at most a
                  <span className="font-semibold text-foreground"> polynomial factor</span>, simulating a nondeterministic machine on a
                  deterministic one may require <span className="font-semibold text-foreground">exponential time</span>. This gap—central
                  to problems like SAT—lies at the heart of complexity theory.
                </p>
              </div>
            </BlurFade>

            {/* Time Complexity and Language Families */}
            <BlurFade inView delay={0.4}>
              <div className="space-y-4 p-6 rounded-2xl bg-linear-to-br from-green-50/50 to-teal-50/30 dark:from-green-900/20 dark:to-teal-900/10 border border-green-200/30 dark:border-green-800/30 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">⏱️</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    14.3 Time Complexity & Language Families
                  </h2>
                </div>
                <p className="text-base md:text-lg leading-7 text-muted-foreground">
                  We classify languages by the time resources needed to decide them.
                  For a function <code className="bg-foreground/10 px-2 py-1 rounded text-sm font-mono">T(n)</code>,
                  <code className="ml-1 bg-foreground/10 px-2 py-1 rounded text-sm font-mono">DTIME(T(n))</code> is the set of languages
                  decidable by a <span className="font-semibold text-foreground">deterministic</span> multi-tape Turing machine in time O(T(n)), and
                  <code className="ml-1 bg-foreground/10 px-2 py-1 rounded text-sm font-mono">NTIME(T(n))</code> is the analogous class
                  for <span className="font-semibold text-foreground">nondeterministic</span> machines. As <code className="bg-foreground/10 px-2 py-1 rounded text-sm font-mono">T(n)</code> increases, these classes
                  form a <span className="font-semibold text-foreground">nested hierarchy</span>.
                </p>
              </div>
            </BlurFade>
          </div>
        </CardBox>

        {/* Featured Exercises */}
        <section className="mx-auto max-w-6xl px-6 md:px-0">
          <BlurFade inView>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  Featured, Runnable Exercises
                </h2>
              </div>
              <p className="text-muted-foreground text-lg">Click on any exercise to start solving real problems</p>
            </div>
          </BlurFade>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <BlurFade inView delay={0.15}>
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 hover:from-blue-500/20 hover:to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/10 dark:hover:from-blue-500/30 dark:hover:to-blue-600/20 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-500/10 to-transparent" />

                <CardHeader className="relative">
                  <div className="text-4xl mb-3">🎯</div>
                  <CardTitle className="text-2xl">Complexity Theory</CardTitle>
                  <CardDescription className="text-base">
                    Explore core ideas with small, practical tasks.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground relative">
                  Hands-on activities that highlight growth rates, reductions, and
                  modeling choices without heavy proofs.
                </CardContent>
                <CardFooter className="relative">
                  <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold group-hover:shadow-lg transition-all">
                    <Link href="/exercises/complexity-theory">Open exercise →</Link>
                  </Button>
                </CardFooter>
              </Card>
            </BlurFade>

            <BlurFade inView delay={0.25}>
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5 hover:from-purple-500/20 hover:to-purple-600/10 dark:from-purple-500/20 dark:to-purple-600/10 dark:hover:from-purple-500/30 dark:hover:to-purple-600/20 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-purple-500/10 to-transparent" />

                <CardHeader className="relative">
                  <div className="text-4xl mb-3 text-center">🤖</div>
                  <CardTitle className="text-2xl">Turing Machines</CardTitle>
                  <CardDescription className="text-base">
                    Define, run, and inspect machine behavior.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground relative">
                  Backed by the solver and visualizer of the Turing machine
                </CardContent>
                <CardFooter className="relative">
                  <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold group-hover:shadow-lg transition-all">
                    <Link href="/exercises/turing-machines">Open exercise →</Link>
                  </Button>
                </CardFooter>
              </Card>
            </BlurFade>

            <BlurFade inView delay={0.35}>
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-pink-500/10 to-pink-600/5 hover:from-pink-500/20 hover:to-pink-600/10 dark:from-pink-500/20 dark:to-pink-600/10 dark:hover:from-pink-500/30 dark:hover:to-pink-600/20 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <ShineBorder shineColor={["#FE8FB5", "#A07CFE", "#FFBE7B"]} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-pink-500/10 to-transparent" />

                <CardHeader className="relative">
                  <div className="text-4xl mb-3 text-center">🔤</div>
                  <CardTitle className="text-2xl">String Recognition</CardTitle>
                  <CardDescription className="text-base">
                    Test whether strings belong to target sets.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground relative">
                  Use the interactive UI to quickly validate examples and counterexamples.
                </CardContent>
                <CardFooter className="relative">
                  <Button asChild className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-semibold group-hover:shadow-lg transition-all">
                    <Link href="/exercises/string-recognition">Open exercise →</Link>
                  </Button>
                </CardFooter>
              </Card>
            </BlurFade>

            <BlurFade inView delay={0.45}>
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-orange-500/10 to-orange-600/5 hover:from-orange-500/20 hover:to-orange-600/10 dark:from-orange-500/20 dark:to-orange-600/10 dark:hover:from-orange-500/30 dark:hover:to-orange-600/20 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-orange-500/10 to-transparent" />

                <CardHeader className="relative">
                  <div className="text-4xl mb-3 text-center">🔄</div>
                  <CardTitle className="text-2xl">Duplicates & Triplicates</CardTitle>
                  <CardDescription className="text-base">
                    Detect repeated elements efficiently.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground relative">
                  Practical array-processing exercises 
                </CardContent>
                <CardFooter className="relative">
                  <Button asChild className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold group-hover:shadow-lg transition-all">
                    <Link href="/exercises/duplicates%26triplicates">Open exercise →</Link>
                  </Button>
                </CardFooter>
              </Card>
            </BlurFade>

            <BlurFade inView delay={0.55}>
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-red-500/10 to-red-600/5 hover:from-red-500/20 hover:to-red-600/10 dark:from-red-500/20 dark:to-red-600/10 dark:hover:from-red-500/30 dark:hover:to-red-600/20 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <ShineBorder shineColor={["#FE8FB5", "#A07CFE", "#FFBE7B"]} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-red-500/10 to-transparent" />

                <CardHeader className="relative">
                  <div className="text-4xl mb-3 text-center">📋</div>
                  <CardTitle className="text-2xl">CNF → 3SAT</CardTitle>
                  <CardDescription className="text-base">
                    Convert formulas and inspect clause growth.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="relative">
                  <Button asChild className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold group-hover:shadow-lg transition-all">
                    <Link href="/exercises/three-sat-reductions">Open exercise →</Link>
                  </Button>
                </CardFooter>
              </Card>
            </BlurFade>

            <BlurFade inView delay={0.65}>
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-green-500/10 to-green-600/5 hover:from-green-500/20 hover:to-green-600/10 dark:from-green-500/20 dark:to-green-600/10 dark:hover:from-green-500/30 dark:hover:to-green-600/20 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <ShineBorder shineColor={["#FFBE7B", "#A07CFE", "#FE8FB5"]} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-green-500/10 to-transparent" />

                <CardHeader className="relative">
                  <div className="text-4xl mb-3 text-center">✨</div>
                  <CardTitle className="text-2xl">NP-Completeness</CardTitle>
                  <CardDescription className="text-base">
                    Practice reduction-thinking on small instances.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground relative">
                  Work through mini reduction tasks that emphasize intuition over
                  formal proofs.
                </CardContent>
                <CardFooter className="relative">
                  <Button asChild className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold group-hover:shadow-lg transition-all">
                    <Link href="/exercises/np-completeness">Open exercise →</Link>
                  </Button>
                </CardFooter>
              </Card>
            </BlurFade>
          </div>
        </section>
      </div>

      {/* How it works
      <section className="mx-auto max-w-4xl">
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>How This Site Works</CardTitle>
            <CardDescription>
              Interactive UI + server-side solvers for fast feedback.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm md:text-base text-muted-foreground space-y-2">
            <p>
              Each exercise pairs a clean interface with a solver endpoint under
              <code className="mx-1 text-xs">src/app/api/solvers/*</code>. Many pages reuse shared
              components in <code className="mx-1 text-xs">src/app/components/solvers</code> to keep
              behavior consistent while letting you focus on the inputs and
              results.
            </p>
            <p>
              You can read the source to learn implementation details or extend
              the exercises with your own variants.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/exercises/complexity-theory">Begin with examples</Link>
            </Button>
          </CardFooter>
        </Card>
      </section> */}

      {/**
       * Dashboard widgets block kept for later reference
       *
       * <div className="grid grid-cols-12 gap-6">
       *   ...
       * </div>
       */}
    </main>
  );
}

export default Page;
