const Chips = ({ text }) => {
  if (!text) return null;
  return (
    <div className="flex flex-wrap mt-2 space-x-2">
      <span className="px-6 py-1 tracking-wider rounded text-black bg-black/20 font-semibold text-md flex align-center w-max">
        {text}
      </span>
    </div>
  );
};

export default Chips;
