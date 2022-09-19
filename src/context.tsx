import { createContext, SetStateAction, useState } from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DraftBlockType,
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import { createClient, SupabaseClient, User } from "@supabase/supabase-js";
import { useParams } from "react-router-dom";

const contextDefaultState = {
  editorState: EditorState,
  setEditorState: () => EditorState.createEmpty(),
  logged: undefined,
  Edit:()=>{},
  noteId:undefined,
  setNoteId:()=>{},
  fetchNote:()=>{},
  uid:undefined,
  supabase:SupabaseClient
};

export const myCon = createContext<CInterface>(contextDefaultState);

export interface CInterface {
  editorState:any;
  setEditorState: any;
  logged: boolean | undefined;
  Edit:Function,
  noteId:string|undefined|null,
  setNoteId:Function,
  fetchNote:Function,
  uid:string|undefined,
  supabase:any
}

export const CProvider = ({ children }: any) => {
  const [logged, setLogged] = useState<boolean | undefined>();
  const [user, setUser] = useState<{
    picture: string | undefined;
    name: string | undefined;
    email: string | undefined;
  }>({
    picture: undefined,
    name: undefined,
    email: undefined,
  });
  const [noteId, setNoteId] = useState<string | null>();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const options = {
    schema: "public",
    headers: {},
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  };
  const supabase = createClient(
    "https://azcarsfvmwhmiimozjhf.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6Y2Fyc2Z2bXdobWlpbW96amhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjI4MzUxODcsImV4cCI6MTk3ODQxMTE4N30.12FtWNOX8P0dRBKd54BxV0VZsjsdH_-NiegUadpLoDk",
    options
  );
 

  const Edit = () => {
   
    const heading: string | undefined | null = document.querySelector(
      ".DraftEditor-editorContainer"
    )?.textContent;
    const contentState = editorState.getCurrentContent();
    console.log(contentState,"contentstate before storing");
   
    const rawData = convertToRaw(contentState);
    var data: any = { html: rawData };
    console.log(data.html,"to raw");
      
    if (!logged || logged === undefined) {
      localStorage.setItem("note", JSON.stringify(data.html));
    }
    if (noteId === null || noteId === "new") {
      const id = uuidv4();
      saveNew(data, id, heading);
    } else {
      Modify(noteId, data, heading);
    }
    // edit.contentEditable = !editMode;
    //  setEditmode(!editMode);
    console.log("qqdqdqd");
  };

  async function saveNew(data: any, id: any, heading: any) {
    const { error } = await supabase.from("nota").insert([
      {
        UID: `${id}`,
        USERID: user.email,
        DATA: data,
        HEADING: heading,
      },
    ]);
  }


  async function Modify(
    UID: string | null | undefined,
    html: any,
    heading: any
  ) {
    const { data, error } = await supabase
      .from("nota")
      .update({ DATA: html, HEADING: heading })
      .match({ UID: UID });
    setNoteId(null);
    console.log(noteId);
  }
  const { uid } = useParams();
  async function fetchNote() {
    
  setNoteId(uid);
    const { data, error }: any = await supabase
      .from("nota")
      .select("DATA, UID")
      .match({ UID: uid })
      .limit(1);

    if (logged && data.length > 0) {
      const html = JSON.parse(data[0].DATA.html);

      const editor: HTMLElement | any = document.querySelector(".DraftEditor-editorContainer");

      editor.innerHTML = html;
    }
    if (logged !== undefined || !logged) {
      const i: any = localStorage.getItem("note");
      const state=JSON.parse(i);
      const contentState:any=convertFromRaw(state);
      console.log(contentState,"from raw")
      const newcon= EditorState.createWithContent(contentState)
        setEditorState(newcon);
    }
  }
 
  
  return (
    <>
      <myCon.Provider value={{ supabase,editorState, logged,Edit,noteId,setNoteId,fetchNote,uid, setEditorState }}>
        {children}
      </myCon.Provider>
    </>
  );
};
