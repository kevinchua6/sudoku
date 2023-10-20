import React, { useState } from "react";

type SudokuElement = number | null;

const getTailwindFontColor = (
  isInitial: boolean,
  isSelected: boolean,
  isSecondarySelected: boolean,
  isConflict: boolean
) => {
  // if (isSelected) {
  //   return "text-blue-500";
  if (isConflict) {
    return "text-red-500";
  } else if (isInitial) {
    return "text-gray-500";
  } else {
    return "text-black";
  }
};

const getTailwindBackgroundColor = (
  isInitial: boolean,
  isSelected: boolean,
  isSecondarySelected: boolean,
  isConflict: boolean
) => {
  if (isSelected) {
    return "bg-blue-200";
  } else if (isSecondarySelected) {
    return "bg-blue-100";
  } else if (isInitial) {
    return "bg-gray-200";
  } else if (isConflict) {
    return "bg-red-200";
  } else {
    return "bg-white";
  }
};

const Cell = ({
  value,
  onClick,
  isSelected,
  isConflict,
  isInitial,
  isSecondarySelected,
  handleCellChange,
}: {
  value: SudokuElement;
  onClick: () => void;
  isSelected: boolean;
  isConflict: boolean;
  isSecondarySelected: boolean;
  isInitial: boolean;
  handleCellChange: (value: number) => void;
}) => {
  const tailwindFontColor = getTailwindFontColor(
    isInitial,
    isSelected,
    isSecondarySelected,
    isConflict
  );
  const tailwindBackgroundColor = getTailwindBackgroundColor(
    isInitial,
    isSelected,
    isSecondarySelected,
    isConflict
  );

  const initialCellHoverStyle = isInitial ? "hover:cursor-default" : "";

  return (
    <input
      readOnly={isInitial}
      maxLength={1}
      type="text"
      className={`cell w-10 h-10 text-center border border-gray-300 rounded text-black ${tailwindFontColor} ${tailwindBackgroundColor} ${initialCellHoverStyle}`}
      onClick={onClick}
      onChange={(e) => handleCellChange(+e.target.value)}
      value={value ?? ""}
    />
  );
};

const isConflict = (row: number, col: number, puzzle: SudokuElement[][]) => {
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

const isInitial = (
  row: number,
  col: number,
  initialPuzzle: SudokuElement[][]
) => {
  if (!initialPuzzle) {
    return false;
  }
  return initialPuzzle[row][col] !== null;
};

const isHighlighted = (
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

const SudokuBoard = ({
  puzzle,
  handleCellChange,
  initialPuzzle,
}: {
  puzzle: SudokuElement[][];
  initialPuzzle: SudokuElement[][];
  handleCellChange: (row: number, col: number, value: number) => void;
}) => {
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
    null
  );
  const [selectedRow, selectedCol] = selectedCell || [null, null];

  // Create an array to define separator rows and columns
  const separators = [2, 5]; // Assuming you want separators after the 3rd and 6th rows and columns

  // Render the Sudoku grid based on the puzzle arrays
  return (
    <div className="grid grid-cols-9 grid-rows-9 gap-1">
      {puzzle.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            handleCellChange={(value) =>
              handleCellChange(rowIndex, colIndex, value)
            }
            onClick={() => setSelectedCell([rowIndex, colIndex])}
            isSelected={selectedRow === rowIndex && selectedCol === colIndex}
            isSecondarySelected={isHighlighted(
              rowIndex,
              colIndex,
              selectedRow,
              selectedCol
            )}
            isConflict={isConflict(rowIndex, colIndex, puzzle)}
            isInitial={isInitial(rowIndex, colIndex, initialPuzzle)}
          />
        ))
      )}
    </div>
  );
};

export default SudokuBoard;
