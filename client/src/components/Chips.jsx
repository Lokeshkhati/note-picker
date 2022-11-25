const Chips = ({ text }) => {
  if (!text) return null;
  return (
    <div className="flex flex-wrap mt-2 space-x-2">
      <span className="px-6 py-1 tracking-wider rounded text-slate-700 bg-gray-100 font-semibold text-md flex align-center w-max">
        {text}
      </span>
    </div>
  );
};

export default Chips;
