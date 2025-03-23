import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const arr = Array.from({ length: 100000 }, () =>
    Math.floor(Math.random() * 100000)
  );

  function quickSort(arr: number[]): number[] {
    if (arr.length <= 1) {
      return arr;
    }

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter((x) => x < pivot);
    const right = arr.filter((x) => x > pivot);
    const middle = arr.filter((x) => x === pivot);

    return [...quickSort(left), ...middle, ...quickSort(right)];
  }

  const sortedArr = quickSort(arr);

  const endTime = Date.now();
  const executionTime = (endTime - startTime) / 1000; // Time in seconds

  return NextResponse.json(executionTime);
}
