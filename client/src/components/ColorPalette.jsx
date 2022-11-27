import { useNotes } from "../contexts/notes-context";
import { colors } from "../utils/colors";

const ColorPalette = ({ noteId }) => {
  const { noteBgColor } = useNotes();
  return (
    <div className="absolute right-0 top-0  sm:w-72  flex flex-wrap justify-center items-center bg-white gap-2 sm:gap-4 p-2  shadow-md rounded">
      {colors.map(({ id, color }) => (
        <li
          key={id}
          onClick={() => noteBgColor(color, noteId)}
          style={{ backgroundColor: color }}
          className="h-6 w-6 sm:h-8 sm:w-8 rounded-full list-none cursor-pointer"
        ></li>
      ))}
    </div>
  );
};

export default ColorPalette;
