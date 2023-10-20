"use client";

import { useState } from "react";
import SudokuBoard from "./components/SudokuBoard";

export default function Home() {
  const initialPuzzle = [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9],
  ];
  const [puzzle, setPuzzle] = useState(initialPuzzle);

  const handleCellChange = (row: number, col: number, value: number) => {
    // Create a copy of the puzzle
    const updatedPuzzle = [...puzzle];
    updatedPuzzle[row][col] = value ? value : null;
    setPuzzle(updatedPuzzle);
  };

  return (
    <>
      <SudokuBoard
        puzzle={puzzle}
        handleCellChange={handleCellChange}
        initialPuzzle={initialPuzzle}
      />
    </>
  );
}
