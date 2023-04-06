import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export interface allNote {
  DATA: { html: string };
  UID: string | undefined;
  HEADING: string | undefined;
}

export interface user {
  picture: string | undefined;
  name: string | undefined;
  email: string | undefined;
}
const contextDefaultState = {
  editorState: EditorState.createEmpty(),
  setEditorState: () => {},
  logged: false,
  Edit: () => {},
  noteId: undefined,
  setNoteId: () => {},
  fetchNote: () => {},
  saveNew: () => {},
  signout: () => {},
  signIn: () => {},
  supabase: SupabaseClient,
  deleteNote: () => {},
  SelectAll: () => {},
  setAllNotes: () => {},
  setLogged: () => {},
  allNotes: undefined,
  user: {
    picture: "",
    name: "",
    email: "",
  },
  getUser: () => {},
  setUser: () => {},
};

export const myCon = createContext<CInterface>(contextDefaultState);

export interface CInterface {
  editorState: any;
  setEditorState: any;
  logged: boolean | undefined;
  Edit: () => void;
  noteId: string | undefined | null;
  setNoteId: (a: string | undefined) => void;
  fetchNote: (uid: string | undefined) => void;
  saveNew: (data: any, id: any, heading?: any) => void;
  supabase: any;
  signout: () => void;
  signIn: () => void;
  deleteNote: (UID: string | null | undefined) => any;
  SelectAll: () => void;
  setAllNotes: (a: allNote[] | undefined) => void;
  getUser: () => void;
  allNotes: allNote[] | undefined;
  user: user;
  setLogged(a: boolean): void;
  setUser(a: user): void;
}

export const CProvider = ({ children }: any) => {
  const [logged, setLogged] = useState<boolean | undefined>(false);
  const [user, setUser] = useState<user>({ picture: "", email: "", name: "" });
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
  var key: any =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6Y2Fyc2Z2bXdobWlpbW96amhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjI4MzUxODcsImV4cCI6MTk3ODQxMTE4N30.12FtWNOX8P0dRBKd54BxV0VZsjsdH_-NiegUadpLoDk";
  const supabase = createClient(
    "https://azcarsfvmwhmiimozjhf.supabase.co",
    key,
    options
  );

  async function signIn() {
    const a: any = await supabase.auth.signIn(
      {
        provider: "google",
      },
      {
        redirectTo: "https://nota-nu.vercel.app/settings",
      }
    );
  }

  async function signout() {
    const { error } = await supabase.auth.signOut();
    console.log(error);
    setLogged(false);
    setUser({
      picture: undefined,
      name: undefined,
      email: undefined,
    });
  }

  const Edit = () => {
    const contentState = editorState.getCurrentContent();
    console.log(logged);
    const rawData = convertToRaw(contentState);
    var data: any = { html: rawData };

    if (logged == false || logged == undefined) {
      console.log(noteId)
      let offNotes=localStorage.getItem('note');
      var array:any=[];
      if (offNotes){
         array= JSON.parse(offNotes);
        
        array.splice(0,0,{ html: data.html, UID: noteId });
        console.log(array)
        localStorage.setItem("note", JSON.stringify(array));
      }else{
         localStorage.setItem(
           "note",
           JSON.stringify([{ html: data.html, UID: noteId }])
         );
      }
      
      return data;
    } else {
      if (noteId === null || noteId ===undefined || noteId === "new") {
        const id: string = uuidv4();
        console.log(id, "uuid genertaed");
        saveNew(data, id);
        return data;
      }
      if (noteId !== "new") {
        Modify(noteId, data);
        return data;
      }
    }
  };

  async function saveNew(
    data: any,
    id: string | null | undefined,
    heading?: any
  ) {
    const { error } = await supabase.from("nota").insert([
      {
        UID: `${id}`,
        USERID: user.email,
        DATA: data.html,
        HEADING: "heading",
      },
    ]);
    console.log(error)
  }

  async function Modify(
    UID: string | null | undefined,
    html: any,
    heading?: any
  ): Promise<void> {
    const { data, error } = await supabase
      .from("nota")
      .update({ DATA: html, HEADING: heading })
      .match({ UID: UID });

    if (error) {
      const { error } = await supabase.from("nota").insert([
        {
          UID: `${UID}`,
          USERID: user.email,
          DATA: html.html,
          HEADING: "heading",
        },
      ]);
    }
  }

  async function fetchNote(uid: string | undefined) {
    const { data, error }: any = await supabase
      .from("nota")
      .select("DATA, UID")
      .match({ UID: uid })
      .limit(1);

    if (logged === true && data) {
      const contentState: any = convertFromRaw(data[0].DATA);

      const newcon = EditorState.createWithContent(contentState);
      setEditorState(newcon);
    }
    if (logged === false || logged === undefined) {
      const i: any = localStorage.getItem("note");
      const state = JSON.parse(i);
      console.log(state,uid);
      let st;
      for (let k of state){
        if (k.UID==uid) st=k.html
       
      }
      
      const contentState: any = convertFromRaw(st);
      const newcon = EditorState.createWithContent(contentState);
      setEditorState(newcon);
    }
  }

  function getUser() {
    const userd: any = supabase.auth.user();
    if (userd) {
      if (userd.aud == "authenticated") {
        setUser(userd.user_metadata);
        setLogged(true);
      } else {
        setLogged(false);
        setUser({
          picture: undefined,
          name: undefined,
          email: undefined,
        });
      }
    }
  }

  async function SelectAll() {
    if (logged === true) {
      const { data, error }: any = await supabase
        .from("nota")
        .select("DATA, UID,HEADING")
        .match({ USERID: user.email })
        .order("ID", { ascending: false });
      console.log(data, error);
      if (data.length > 0) {
        console.log(data);
        setAllNotes(data);
      }
    }
    if (logged === false) {
      const i: any = localStorage.getItem("note");
      const note: any = JSON.parse(i);

      if (note !== null) {
        note[0] !== null && setAllNotes(note);
      }
    }

    console.log(allNotes, "all notes");
  }

  async function deleteNote(UID: string | null | undefined) {
    const { error, data: deletedData } = await supabase
      .from("nota")
      .delete()
      .match({ UID: UID });
    return deletedData;
  }

  return (
    <>
      <myCon.Provider
        value={{
          setUser,
          getUser,
          saveNew,
          allNotes,
          setAllNotes,
          SelectAll,
          deleteNote,
          signout,
          signIn,
          supabase,
          editorState,
          user,
          setLogged,
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
