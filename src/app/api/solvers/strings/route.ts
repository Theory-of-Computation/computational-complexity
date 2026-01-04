import { NextRequest, NextResponse } from 'next/server';

function isWW(s: string): { match: boolean; breakdown?: string } {
  if (s.length % 2 !== 0) {
    return { match: false, breakdown: `String length (${s.length}) is odd. Cannot be ww format.` };
  }

  const mid = s.length / 2;
  const first = s.slice(0, mid);
  const second = s.slice(mid);

  if (first === second) {
    return { match: true, breakdown: `First half: "${first}", Second half: "${second}" ✓` };
  }

  return { match: false, breakdown: `First half: "${first}", Second half: "${second}" ✗` };
}

function isWWrW(s: string): { match: boolean; breakdown?: string } {
  // Find all possible split points
  for (let i = 1; i < s.length; i++) {
    const w = s.slice(0, i);
    const reverse = w.split('').reverse().join('');
    const wr = reverse;

    if (s === w + wr + w) {
      return {
        match: true,
        breakdown: `w="${w}", w^r="${wr}", w="${w}" → wwʳw = "${s}" ✓`,
      };
    }
  }

  return { match: false, breakdown: 'No valid w found where string = w + w^r + w' };
}

function isWWW(s: string): { match: boolean; breakdown?: string } {
  if (s.length % 3 !== 0) {
    return { match: false, breakdown: `String length (${s.length}) is not divisible by 3. Cannot be www format.` };
  }

  const part = s.length / 3;
  const first = s.slice(0, part);
  const second = s.slice(part, 2 * part);
  const third = s.slice(2 * part);

  if (first === second && second === third) {
    return {
      match: true,
      breakdown: `Part 1: "${first}", Part 2: "${second}", Part 3: "${third}" ✓`,
    };
  }

  return {
    match: false,
    breakdown: `Part 1: "${first}", Part 2: "${second}", Part 3: "${third}" ✗`,
  };
}

export async function POST(request: NextRequest) {
  try {
    const { string, pattern } = await request.json();

    if (!string || !pattern) {
      return NextResponse.json(
        { isMatch: false, pattern, message: 'Invalid input' },
        { status: 400 }
      );
    }

    let result;

    if (pattern === 'ww') {
      result = isWW(string);
      return NextResponse.json({
        isMatch: result.match,
        pattern: 'ww',
        message: result.match
          ? `"${string}" is of the form ww (two identical halves).`
          : `"${string}" is NOT of the form ww.`,
        breakdown: result.breakdown,
      });
    } else if (pattern === 'wwrw') {
      result = isWWrW(string);
      return NextResponse.json({
        isMatch: result.match,
        pattern: 'wwʳw',
        message: result.match
          ? `"${string}" is of the form wwʳw (string + reverse + string).`
          : `"${string}" is NOT of the form wwʳw.`,
        breakdown: result.breakdown,
      });
    } else if (pattern === 'www') {
      result = isWWW(string);
      return NextResponse.json({
        isMatch: result.match,
        pattern: 'www',
        message: result.match
          ? `"${string}" is of the form www (three identical parts).`
          : `"${string}" is NOT of the form www.`,
        breakdown: result.breakdown,
      });
    }

    return NextResponse.json(
      { isMatch: false, pattern, message: 'Unknown pattern' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        isMatch: false,
        pattern: 'unknown',
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 500 }
    );
  }
}
