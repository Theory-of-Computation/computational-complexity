import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { numbers } = await request.json();

    if (!Array.isArray(numbers) || numbers.length === 0) {
      return NextResponse.json(
        { hasTriplicates: false, message: 'Invalid input' },
        { status: 400 }
      );
    }

    // Check for triplicates
    const freq: { [key: number]: number } = {};
    const triplicates: number[] = [];

    for (const num of numbers) {
      freq[num] = (freq[num] || 0) + 1;
      if (freq[num] === 3 && !triplicates.includes(num)) {
        triplicates.push(num);
      }
    }

    if (triplicates.length > 0) {
      return NextResponse.json({
        hasTriplicates: true,
        triplicateValues: triplicates,
        message: `Contains ${triplicates.length} triplicate value(s): ${triplicates.join(', ')} appear(s) 3 or more times.`,
      });
    }

    return NextResponse.json({
      hasTriplicates: false,
      message: `No values appear 3 or more times in the array. No triplicates found.`,
    });
  } catch (error) {
    return NextResponse.json(
      { hasTriplicates: false, message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
