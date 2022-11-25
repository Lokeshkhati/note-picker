import {
  BsPalette,
  BsTrash,
  BsPencil,
  BsFillPinFill,
  BsPin,
} from "react-icons/bs";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import { FaTrashRestore } from "react-icons/fa";
import { MdLabelOutline } from "react-icons/md";
import ColorPalette from "./ColorPalette";
import { useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import Chips from "./Chips";
import NoteForm from "./NoteForm";
import { useNotes } from "../contexts/notes-context";
import { useToggle } from "../hooks/useToggle";
import { useTheme } from "../contexts/theme-context";
import Modal from "./Modal";

const Note = (note) => {
  const { id, title, description, createdOn, bgColor, label } = note;
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [labelText, setLabelText] = useState(label);
  const [editTtitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [isOpen, setIsOpen] = useToggle();
  const {
    archive,
    notes,
    trash,
    pinnedNotes,
    addToArchive,
    removeFromArchive,
    addToTrash,
    restoreFromTrash,
    deleteNoteForever,
    noteBgColor,
    pinNote,
    unPinNote,
    createLabel,
  } = useNotes();
  const ref = useRef(null);
  const { theme } = useTheme();
  const [show, setShow] = useToggle();

  const archivedNotes = archive?.find((note) => note.id === id);
  const isArchived = archivedNotes ? true : false;

  const notesInTrash = trash?.find((note) => note.id === id);
  const isInTrash = notesInTrash ? true : false;

  const notesInPin = pinnedNotes?.find((note) => note.id === id);
  const isPinned = notesInPin ? true : false;

  useClickOutside(ref, () => setShowColorPalette(false));

  const handleSubmit = (event) => {
    event.preventDefault();
    createLabel(note, labelText);
    setLabelText("");
  };

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={` ${
        theme === "light"
          ? " bg-white text-slate-800 "
          : "  bg-gray-800 text-gray-200"
      }   rounded mt-4 p-4`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        {isPinned ? (
          <button onClick={() => unPinNote(note)}>
            <BsFillPinFill size="18" />
          </button>
        ) : (
          <button onClick={() => pinNote(note)}>
            <BsPin size="18" />
          </button>
        )}
      </div>

      <p className="md:text-lg">{description}</p>
      <Chips text={label} />

      <div className="flex flex-wrap gap-2 mt-4 justify-between  items-center">
        <p
          className={` ${
            theme === "light" ? "  text-slate-800 " : "   text-white"
          } tracking-wide `}
        >
          {`Created on ${createdOn.toString()}`}
        </p>
        <div className="flex gap-6 ">
          <div className="relative" ref={ref}>
            {isInTrash || isArchived ? null : (
              <button onClick={setIsOpen}>
                <MdLabelOutline size="18" />
              </button>
            )}

            {isOpen && (
              <div className=" shadow-lg z-40  w-96 md:w-2/5 rounded  absolute top-6 right-6 ">
                <form
                  onSubmit={handleSubmit}
                  className="flex justify-between items-start mt-2 pt-4 p-2 h-24 w-52 rounded-sm bg-white "
                >
                  <input
                    value={labelText}
                    autoFocus={true}
                    onChange={(event) => setLabelText(event.target.value)}
                    placeholder="Create a new label"
                    className="border rounded-sm w-full border-gray-400 outline-none  py-.5 px-2"
                  />
                  <button
                    type="submit"
                    className="font-bold  rounded-sm border border-blue-500 bg-blue-500 px-2 py-.5 "
                  >
                    +
                  </button>
                </form>
              </div>
            )}
          </div>
          <div ref={ref}>
            {isInTrash ? null : (
              <button onClick={() => setShowColorPalette(!showColorPalette)}>
                <BsPalette size="18" />
              </button>
            )}

            {showColorPalette && (
              <div className="  z-40  w-96 md:w-2/5 rounded  absolute top-1/5 right-1/3   ">
                <ColorPalette noteId={id} />
              </div>
            )}
          </div>

          {isInTrash ? null : isArchived ? (
            <button onClick={() => removeFromArchive(note)}>
              <BiArchiveOut size="18" />
            </button>
          ) : (
            <button onClick={() => addToArchive(note)}>
              <BiArchiveIn size="18" />
            </button>
          )}

          {isInTrash ? null : (
            <button onClick={setShow}>
              <BsPencil size="18" />
            </button>
          )}

          {isInTrash ? (
            <button onClick={() => deleteNoteForever(id)}>
              <BsTrash size="18" />
            </button>
          ) : null}

          {isInTrash ? (
            <button onClick={() => restoreFromTrash(note)}>
              <FaTrashRestore size="18" />
            </button>
          ) : (
            <button onClick={() => addToTrash(note, id)}>
              <BsTrash size="18" />
            </button>
          )}
        </div>
      </div>
      <Modal showModal={show} setShowModal={setShow}>
        <div className="w-80  sm:w-[30rem] ">
          <NoteForm
            title={editTtitle}
            setTitle={setEditTitle}
            description={editDescription}
            setDescription={setEditDescription}
            buttonText="Edit Note"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Note;
