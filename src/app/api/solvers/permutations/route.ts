import { NextRequest, NextResponse } from 'next/server';

function generatePermutations(arr: (string | number)[]): (string | number)[][] {
  if (arr.length <= 1) return [arr];

  const result: (string | number)[][] = [];

  for (let i = 0; i < arr.length; i++) {
    const rest = arr.slice(0, i).concat(arr.slice(i + 1));
    const perms = generatePermutations(rest);

    for (const perm of perms) {
      result.push([arr[i], ...perm]);
    }
  }

  return result;
}

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();

    if (!Array.isArray(items) || items.length === 0 || items.length > 10) {
      return NextResponse.json(
        { permutations: [], totalCount: 0, message: 'Items must be an array with 1-10 elements' },
        { status: 400 }
      );
    }

    const permutations = generatePermutations(items);
    const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));

    return NextResponse.json({
      permutations,
      totalCount: permutations.length,
      message: `Generated all ${items.length}! = ${factorial(items.length)} permutations of ${items.length} item(s).`,
    });
  } catch (error) {
    return NextResponse.json(
      { permutations: [], totalCount: 0, message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
