import { SudokuElement } from "../components/SudokuBoard";

export const isConflict = (
  row: number,
  col: number,
  puzzle: SudokuElement[][]
) => {
  const value = puzzle[row][col];
  if (!value) {
    return false;
  }

  for (let i = 0; i < 9; i++) {
    if (puzzle[row][i] === value && i !== col) {
      return true;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (puzzle[i][col] === value && i !== row) {
      return true;
    }
  }

  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (puzzle[i][j] === value && i !== row && j !== col) {
        return true;
      }
    }
  }

  return false;
};

export const isInitial = (
  row: number,
  col: number,
  initialPuzzle: SudokuElement[][]
) => {
  if (!initialPuzzle) {
    return false;
  }
  return initialPuzzle[row][col] !== null;
};

export const isHighlighted = (
  row: number,
  col: number,
  selectedRow: SudokuElement,
  selectedCol: SudokuElement
) => {
  if (selectedRow === null || selectedCol === null) {
    return false;
  }
  if (row === selectedRow || col === selectedCol) {
    return true;
  }

  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  if (
    selectedRow >= boxRow &&
    selectedRow < boxRow + 3 &&
    selectedCol >= boxCol &&
    selectedCol < boxCol + 3
  ) {
    return true;
  }

  return false;
};
