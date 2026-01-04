# Computational Complexity Theory - Interactive Learning Platform

A comprehensive, hands-on learning platform for computational complexity theory featuring interactive exercises, real-time solvers, and visual demonstrations of key concepts from automata theory and complexity classes.

## 🎯 Overview

This Next.js-based platform teaches computational complexity theory through **interactive problem-solving** rather than pure theory. It covers six major exercise categories aligned with Peter Linz's *Introduction to Formal Languages and Automata* (Section 14: Complexity Theory).

## 📚 Featured Exercises

### 1. **Duplicates & Triplicates** 
- **Path**: `/exercises/duplicates&triplicates`
- Detect repeated elements in arrays efficiently
- Explore time complexity: $O(n)$ hashing vs. $O(n \log n)$ sorting
- Interactive solver with live feedback

### 2. **String Recognition**
- **Path**: `/exercises/string-recognition`
- Recognize non-context-free languages: $ww$, $ww^rw$, and $www$
- Implement linear-time algorithms: $O(n)$ recognition
- Test against DTIME(n) and NTIME(n) complexity classes

### 3. **Complexity Theory**
- **Path**: `/exercises/complexity-theory`
- Binary assignments: Generate all $2^n$ truth assignments
- Hamiltonian Path (HAMPATH): Verify $O(n^4)$ nondeterministic solutions
- Permutation generation and analysis

### 4. **Turing Machines**
- **Path**: `/exercises/turing-machines`
- Build and run custom multi-tape Turing machines (1–3 tapes)
- Linear-time $ww$ language recognition on two-tape machines
- Simulate configurations, tape growth, and state transitions
- Interactive machine runner with step-by-step execution

### 5. **3-SAT Reductions**
- **Path**: `/exercises/three-sat-reductions`
- Convert CNF expressions to 3-SAT form
- Demonstrate polynomial-time reductions
- Explore clause growth and variable encoding

### 6. **NP-Completeness**
- **Path**: `/exercises/np-completeness/`
- Study classic NP-complete problems (TSP, Clique, etc.)
- Understand polynomial reductions
- Explore the P vs NP question through concrete examples

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ with TypeScript, React 18+
- **Styling**: Tailwind CSS with custom themes (light/dark mode)
- **Components**: Shadcn UI + custom animations (Blur Fade, Light Rays, Meteors)
- **API**: Next.js Route Handlers (`/api/solvers/*`)
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── app/
│   ├── (DashboardLayout)/          # Main application layout
│   │   ├── page.tsx                # Home/dashboard
│   │   ├── exercises/              # Exercise pages
│   │   │   ├── string-recognition/
│   │   │   ├── complexity-theory/
│   │   │   ├── turing-machines/
│   │   │   ├── np-completeness/
│   │   │   ├── three-sat-reductions/
│   │   │   └── duplicates&triplicates/
│   │   └── layout/                 # Header, Sidebar, Footer
│   ├── api/
│   │   └── solvers/                # Backend solvers
│   │       ├── strings/            # ww, wwʳw, www recognition
│   │       ├── tm/run/             # Turing machine simulator
│   │       ├── assignments/        # Binary assignment generator
│   │       ├── permutations/       # Permutation generator
│   │       ├── duplicates/         # Duplicate detection
│   │       ├── triplicates/        # Triplicate detection
│   │       └── cnf-to-3sat/        # CNF to 3-SAT conversion
│   ├── components/
│   │   ├── solvers/                # Interactive solver UIs
│   │   ├── shared/                 # CodeBlock, CardBox
│   │   └── utilities/              # Tables, data helpers
│   └── css/                        # Global styles & themes
└── components/
    └── ui/                         # Shadcn UI components
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd package

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

Deploy to Vercel:
```bash
vercel deploy
```

## 🎨 Key Features

### Interactive Solvers
Every exercise includes a live solver component that:
- Accepts user input in real-time
- Provides detailed breakdown/explanation
- Shows results with visual feedback (green for match, orange for mismatch)
- Handles edge cases gracefully

### Code Examples
Each exercise displays working Python implementations:
- Color-syntax highlighted with line numbers
- Staggered animation on load
- Copy-to-clipboard functionality
- Educational comments explaining logic

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Dark mode support (system preference detected)
- Smooth animations and transitions
- Accessible UI components (ARIA labels)

### Educational Content
- **Key Concepts** cards explaining DTIME(n), NTIME(n), complexity hierarchy
- **Exercises** with numbered problems building on theory
- **Breadcrumb navigation** for easy traversal
- **Visual indicators** (badges, icons, color coding)

## 📊 Complexity Classes Covered

| Class | Definition | Example |
|-------|-----------|---------|
| **DTIME(n)** | Languages decidable by deterministic TM in $O(n)$ | $ww$ recognition |
| **NTIME(n)** | Languages decidable by nondeterministic TM in $O(n)$ | $ww$ language |
| **P** | Languages decidable in polynomial time | Most practical problems |
| **NP** | Languages verifiable in polynomial time | SAT, TSP, Clique |
| **NPC** | NP-complete (hardest NP problems) | 3-SAT, Knapsack |

## 🔧 API Endpoints

### String Recognition
```
POST /api/solvers/strings
Body: { string: "abab", pattern: "ww" | "wwrw" | "www" }
Response: { isMatch: boolean, message: string, breakdown?: string }
```

### Turing Machine Simulator
```
POST /api/solvers/tm/run
Body: {
  machine: { tapes, blank, start, accept, reject, transitions[] },
  input: string,
  maxSteps: number
}
Response: { accepted: boolean, steps: number, maxTape: number, reason: string }
```

### Permutation Generator
```
POST /api/solvers/permutations
Body: { items: any[] }
Response: { permutations: any[][], totalCount: number, message: string }
```

### Duplicate/Triplicate Detectors
```
POST /api/solvers/duplicates
POST /api/solvers/triplicates
Body: { array: (string | number)[] }
Response: { hasDuplicates: boolean, message: string }
```

## 🎓 Learning Path

1. **Start**: Home Dashboard - Overview of complexity theory
2. **Foundation**: Duplicates & Triplicates - Basic algorithms
3. **Strings**: String Recognition - Pattern matching
4. **Machines**: Turing Machines - Computational models
5. **Theory**: Complexity Theory - NP and HAMPATH
6. **Advanced**: 3-SAT & NP-Completeness - Hard problems

## 🧩 Component Architecture

### Solver Components
Located in `src/app/components/solvers`:
- `StringRecognitionSolver.tsx` - Tests $ww$, $ww^rw$, $www$ patterns
- `TuringMachineSolver.tsx` - Interactive machine simulator
- `AssignmentSolver.tsx` - Binary assignments & permutations
- `DuplicateSolver.tsx` / `TriplicateSolver.tsx` - Array analysis
- `CnfTo3SatSolver.tsx` - Formula conversion

### Shared Components
- `src/app/components/shared/CodeBlock.tsx` - Syntax-highlighted code with animations
- `CardBox.tsx` - Styled container for content sections
- UI primitives from Shadcn: Badge, Card, Button, Input, etc.

## 🌐 Theme System

Colors defined in `src/app/css/theme`:
- **Primary**: `#5d87ff` (Blue)
- **Secondary**: `#49beff` (Cyan)
- **Success**: `#13deb9` (Teal)
- **Error**: `#ef4444` (Red)
- **Dark Mode**: Custom slate palette

## 📖 References

- **Textbook**: Peter Linz, *Introduction to Formal Languages and Automata* (Section 14)
- **Concepts**: DTIME/NTIME hierarchy, P vs NP, NP-completeness, polynomial reductions
- **Algorithms**: String matching, permutation generation, Turing machine simulation

## 🤝 Contributing

To extend the platform:

1. **Add a new exercise**: Create folder in `src/app/(DashboardLayout)/exercises`
2. **Create a solver**: Add TypeScript component in `src/app/components/solvers`
3. **Add backend logic**: Implement route handler in `src/app/api/solvers`
4. **Update navigation**: Modify `src/app/(DashboardLayout)/layout/sidebar/Sidebaritems.ts`
5. **Link from home**: Add card to `src/app/(DashboardLayout)/page.tsx`

## 📄 License

This project is open source and available as part of the computational theory learning initiative.

## 🙏 Acknowledgments

- Inspired by Peter Linz's rigorous treatment of complexity theory
- Built with modern React/Next.js ecosystem
- Designed for intuitive, hands-on learning

---

**Happy learning!** 🚀 Dive into the exercises and master computational complexity through interactive problem-solving.
