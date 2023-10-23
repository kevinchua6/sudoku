import { SudokuElement } from "./SudokuBoard";

export const getTailwindFontColor = (
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

export const getTailwindBackgroundColor = (
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

export const Cell = ({
  value,
  onClick,
  isSelected,
  isConflict,
  isInitial,
  isSecondarySelected,
  handleCellChange,
  className,
}: {
  value: SudokuElement;
  onClick: () => void;
  isSelected: boolean;
  isConflict: boolean;
  isSecondarySelected: boolean;
  isInitial: boolean;
  handleCellChange: (value: number) => void;
  className?: string;
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
      className={`cell w-full aspect-square text-center border-gray-400 rounded text-black ${tailwindFontColor} ${tailwindBackgroundColor} ${initialCellHoverStyle} ${className}`}
      onClick={onClick}
      onChange={(e) => handleCellChange(+e.target.value)}
      value={value ?? ""}
    />
  );
};
