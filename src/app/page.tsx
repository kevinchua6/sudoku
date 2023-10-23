"use client";

import { useEffect, useState } from "react";
import SudokuBoard from "./components/SudokuBoard";

import { createClient } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { ResponseData } from "./utils/types";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://xljoupyjnzyrzkjgrdek.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_KEY || ""
);

export default function Home() {
  // Get all puzzles using react-query
  const [fetchedData, setFetchedData] = useState<ResponseData["data"] | null>(
    null
  );
  useEffect(() => {
    const fetchSudokuPuzzles = async () => {
      const { data, error } = (await supabase
        .from("sudoku_puzzles")
        .select()) as ResponseData;
      if (error) {
        throw new Error(error.message);
      }
      setFetchedData(data);
      return data;
    };

    fetchSudokuPuzzles();
  }, []);

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

  const getRandomPuzzle = () => {
    if (!fetchedData) {
      return;
    }
    const randomPuzzle =
      fetchedData[Math.floor(Math.random() * fetchedData.length)];
    const puzzle = randomPuzzle.puzzle;
    const flatPuzzle = puzzle
      .split("")
      .map((char) => (char === "." ? null : parseInt(char)));
    const formattedPuzzle = [];
    while (flatPuzzle.length) {
      formattedPuzzle.unshift(flatPuzzle.splice(0, 9));
    }
    setPuzzle(formattedPuzzle);
  };

  const handleCellChange = (row: number, col: number, value: number) => {
    // Create a copy of the puzzle
    const updatedPuzzle = [...puzzle];
    updatedPuzzle[row][col] = value ? value : null;
    setPuzzle(updatedPuzzle);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-4xl m-5">Sudoku</h1>
      <button onClick={getRandomPuzzle}>Load Random Level</button>
      <SudokuBoard
        puzzle={puzzle}
        handleCellChange={handleCellChange}
        initialPuzzle={initialPuzzle}
      />
    </div>
  );
}
