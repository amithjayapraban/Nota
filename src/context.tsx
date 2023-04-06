import { createContext, useState } from "react";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";

export interface allNote {
  DATA: { html: string };
  UID: string | undefined;
  HEADING: string | undefined;
}

const contextDefaultState = {
  editorState: EditorState.createEmpty(),
  setEditorState: () => {},
  logged: false,
  Edit: (id: any) => {},
  noteId: undefined,
  setNoteId: () => {},
  fetchNote: () => {},
  handleDel: () => {},

  setAllNotes: () => {},
  SelectAll: () => {},

  allNotes: undefined,
};

export const myCon = createContext<CInterface>(contextDefaultState);

export interface CInterface {
  editorState: any;
  setEditorState: any;
  logged: boolean | undefined;
  Edit: (id: any) => void;
  noteId: string | undefined | null;
  setNoteId: (a: string | undefined) => void;
  fetchNote: (uid: string | undefined) => void;
  handleDel: (a: any) => void;

  SelectAll: () => void;
  setAllNotes: (a: allNote[] | undefined) => void;

  allNotes: allNote[] | undefined;
}

export const CProvider = ({ children }: any) => {
  const [logged, setLogged] = useState<boolean | undefined>(false);

  const [noteId, setNoteId] = useState<string | null | undefined>();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [allNotes, setAllNotes] = useState<allNote[] | undefined>();

  const options = {
    schema: "public",
    headers: {},
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  };

  const Edit = (uid: any) => {
    const contentState = editorState.getCurrentContent();
    console.log(logged);
    const rawData = convertToRaw(contentState);
    var data: any = { html: rawData };

    if (logged == false || logged == undefined) {
      console.log(noteId);
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
            array.splice(iterator, 1, { html: data.html, UID: noteId });
            break;
          }
          iterator += 1;
        }

        if (!found) {
          array.splice(0, 0, { html: data.html, UID: noteId });
          console.log(array);
        }
        localStorage.setItem("note", JSON.stringify(array));
      } else {
        localStorage.setItem(
          "note",
          JSON.stringify([{ html: data.html, UID: noteId }])
        );
      }

      return data;
    }
  };

  async function fetchNote(uid: string | undefined) {
    if (logged === false || logged === undefined) {
      const i: any = localStorage.getItem("note");
      const state = JSON.parse(i);
      console.log(state, uid);
      let st;
      for (let k of state) {
        if (k.UID == uid) st = k.html;
      }

      const contentState: any = convertFromRaw(st);
      const newcon = EditorState.createWithContent(contentState);
      setEditorState(newcon);
    }
  }

  async function SelectAll() {
    if (logged === false) {
      const i: any = localStorage.getItem("note");
      const note: any = JSON.parse(i);

      if (note !== null) {
        note[0] !== null && setAllNotes(note);
      }
    }
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
          allNotes,
          setAllNotes,
          SelectAll,

          editorState,

          logged,
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
