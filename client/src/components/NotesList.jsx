  import Note from "./Note";

  const NotesList = ({ notes }) => {
    return (
      <ul>
        {notes.map((note) => (
          <Note {...note} />
        ))}
      </ul>
    );
  };
  export default NotesList;
