import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { numbers } = await request.json();

    if (!Array.isArray(numbers) || numbers.length === 0) {
      return NextResponse.json(
        { hasDuplicates: false, message: 'Invalid input' },
        { status: 400 }
      );
    }

    // Check for duplicates using Set
    const uniqueSet = new Set(numbers);
    const hasDuplicates = uniqueSet.size !== numbers.length;

    if (hasDuplicates) {
      // Find which values are duplicated
      const freq: { [key: number]: number } = {};
      const duplicates: number[] = [];

      for (const num of numbers) {
        freq[num] = (freq[num] || 0) + 1;
      }

      for (const [num, count] of Object.entries(freq)) {
        if (count > 1) {
          duplicates.push(Number(num));
        }
      }

      return NextResponse.json({
        hasDuplicates: true,
        duplicateValues: duplicates,
        message: `Contains ${duplicates.length} duplicate value(s): ${duplicates.join(', ')} appear(s) more than once.`,
      });
    }

    return NextResponse.json({
      hasDuplicates: false,
      message: `All ${numbers.length} numbers are unique. No duplicates found.`,
    });
  } catch (error) {
    return NextResponse.json(
      { hasDuplicates: false, message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
