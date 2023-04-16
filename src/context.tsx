import { createContext, useState } from "react";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";

export interface allNote {
  DATA: { html: string };
  UID: string | undefined;
  Heading: string | undefined;
}

export const myCon = createContext<CInterface | undefined | any>(undefined);

export interface CInterface {
  editorState: any;
  setEditorState: any;

  Edit: (id: any) => any;
  noteId: string | undefined | null;
  setNoteId: (a: string | undefined) => void;
  fetchNote: (uid: string | undefined) => void;
  handleDel: (a: any) => void;

  SelectAll: () => allNote[];
  setAllNotes: (a: allNote[] | undefined) => void;
  change: number;
  setChange: (a: number) => void;
  allNotes: allNote[] | undefined;
}

export const CProvider = ({ children }: any) => {
  const [noteId, setNoteId] = useState<string | null | undefined>();
  let [change, setChange] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [allNotes, setAllNotes] = useState<allNote[] | undefined>();

  const Edit = (uid: any) => {
    const contentState = editorState.getCurrentContent();

    const rawData = convertToRaw(contentState);
    var data: any = { html: rawData };
    let Heading = data.html.blocks[0].text;
    if (Heading.length > 0) Heading = Heading.slice(0, 12);
    else Heading = "Untitled";

    let offNotes = localStorage.getItem("note");
    var array: any = [];
    if (offNotes) {
      array = JSON.parse(offNotes);

      let iterator = 0,
        found = false;
      for (let k of array) {
        if (k.UID == noteId) {
          found = true;
          console.log(noteId);
          array.splice(iterator, 1, {
            html: data.html,
            UID: noteId,
            Heading,
          });
          break;
        }
        iterator += 1;
      }

      if (!found) {
        array.splice(0, 0, { html: data.html, UID: noteId, Heading });
        // console.log(array);
      }
      localStorage.setItem("note", JSON.stringify(array));
    } else {
      localStorage.setItem(
        "note",
        JSON.stringify([{ html: data.html, UID: noteId, Heading }])
      );
    }

    return data;
  };

  function fetchNote(uid: string | undefined) {
    const i: any = localStorage.getItem("note");
    const state = JSON.parse(i);
    console.count("fetch note");
    // console.table(state);
    let st;
    for (let k of state) {
      if (k.UID == uid) st = k.html;
    }
    if (st != null && st != undefined) {
      const contentState: any = convertFromRaw(st);
      const newcon = EditorState.createWithContent(contentState);
      setEditorState(newcon);
    }
  }

  function SelectAll() {
    const i: any = localStorage.getItem("note");
    const note: any = JSON.parse(i);
    console.log("called select all");

    if (note !== null && note[0] !== null) return note;
  }
  var handleDel = (uid: any) => {
    const i: any = localStorage.getItem("note");
    const state = JSON.parse(i);
    let len = state.length,
      iterator = 0;

    if (len && len == 1) {
      state.pop();
      localStorage.setItem("note", JSON.stringify(state));
    } else {
      for (let k of state) {
        if (k.UID == uid.uid) {
          state.splice(iterator, 1);
          break;
        }
        iterator += 1;
      }

      localStorage.setItem("note", JSON.stringify(state));
    }
  };

  return (
    <>
      <myCon.Provider
        value={{
          handleDel,
          change,
          setChange,
          allNotes,
          setAllNotes,
          SelectAll,
          editorState,
          Edit,
          noteId,
          setNoteId,
          fetchNote,
          setEditorState,
        }}
      >
        {children}
      </myCon.Provider>
    </>
  );
};
