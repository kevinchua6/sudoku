import React, { Fragment, useState } from "react";
import { Cell } from "./Cell";
import { isConflict, isHighlighted, isInitial } from "../utils/helpers";

export type SudokuElement = number | null;

const getSeparationStyle = (rowIndex: number, colIndex: number) => {
  let style = "";

  const bottomIndices = [2, 5];
  const topIndices = [3, 6];

  if (bottomIndices.includes(rowIndex)) {
    style += `border-b-2 `;
  }
  if (bottomIndices.includes(colIndex)) {
    style += `border-r-2 `;
  }

  if (topIndices.includes(rowIndex)) {
    style += `border-t-2 `;
  }
  if (topIndices.includes(colIndex)) {
    style += `border-l-2 `;
  }

  if (!style) {
    return `border-none`;
  }
  return style;
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
    <div className="grid grid-cols-9 grid-rows-9 gap-1 w-1/2">
      {puzzle.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Fragment key={`${rowIndex}-${colIndex}`}>
            <Cell
              className={getSeparationStyle(rowIndex, colIndex)}
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
          </Fragment>
        ))
      )}
    </div>
  );
};

export default SudokuBoard;
