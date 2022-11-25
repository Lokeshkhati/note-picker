import { useTheme } from "../contexts/theme-context";

const FilterNotes = () => {
  const { theme } = useTheme();
  return (
    <div
      className={` ${
        theme === "light"
          ? " bg-white text-slate-800 "
          : "  bg-[#1e2936] text-white"
      }   text-gray-900 p-6`}
    >
      <div className="border-b-2 py-2 border-gray-400">
        <h1 className="text-xl font-semibold">Filter & Sort Notes</h1>
      </div>
      <div className=" my-4">
        <h1 className="text-md font-semibold"> Sort By date</h1>
        <select
          className="border-2 rounded-sm w-full border-gray-400 outline-none mt-2 h-10 py-.5 px-2"
          name="Sort By date"
        >
          <option value="Newest First">Newest First</option>
          <option value="Oldest First">Oldest First</option>
        </select>
      </div>
      <div className=" my-4">
        <h1 className="text-md font-semibold"> Sort By Priority</h1>

        <select
          className="border-2 rounded-sm w-full border-gray-400 outline-none mt-2 h-10 py-.5 px-2"
          name="Sort By date"
        >
          {/* <option disabled>Coose</option> */}
          <option value="Newest First">High to Low</option>
          <option value="Oldest First">Low to High</option>
        </select>
      </div>

      <div className="">
        <h1 className="text-md font-semibold"> Filter By label</h1>
        <div className="flex gap-2 flex-wrap">
          <div className="flex gap-1">
            <input type="checkbox" />
            <label>Low</label>
          </div>

          <div className="flex gap-1">
            <input type="checkbox" />
            <label>Health</label>
          </div>
          <div className="flex gap-1">
            <input type="checkbox" />
            <label>Work</label>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-md font-semibold"> Filter By Priority</h1>
        <div className="flex gap-4 ">
          <div className="flex gap-1">
            <input type="checkbox" />
            <label>High</label>
          </div>

          <div className="flex gap-1">
            <input type="checkbox" />
            <label>Medium</label>
          </div>
          <div className="flex gap-1">
            <input type="checkbox" />
            <label>Low</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterNotes;
