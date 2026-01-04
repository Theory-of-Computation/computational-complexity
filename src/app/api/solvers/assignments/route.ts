import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { n } = await request.json();

    if (typeof n !== 'number' || n < 1 || n > 20) {
      return NextResponse.json(
        { assignments: [], totalCount: 0, message: 'n must be between 1 and 20' },
        { status: 400 }
      );
    }

    const assignments: number[][] = [];
    const total = 1 << n; // 2^n

    for (let i = 0; i < total; i++) {
      const assignment: number[] = [];
      for (let j = n - 1; j >= 0; j--) {
        assignment.push((i >> j) & 1);
      }
      assignments.push(assignment);
    }

    return NextResponse.json({
      assignments,
      totalCount: total,
      message: `Generated all 2^${n} = ${total} binary assignments for ${n} variable(s).`,
    });
  } catch (error) {
    return NextResponse.json(
      { assignments: [], totalCount: 0, message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
