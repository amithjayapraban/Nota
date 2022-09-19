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
} from "draft-js";
import { createClient, SupabaseClient, User } from "@supabase/supabase-js";
import { useParams } from "react-router-dom";

const contextDefaultState = {
  editorState: EditorState,
  setEditorState: () => EditorState.createEmpty(),
  logged: undefined,
  Edit: () => {},
  noteId: undefined,
  setNoteId: () => {},
  fetchNote: () => {},
  
  signout: () => {},
  signIn: () => {},
  supabase: SupabaseClient,
  deleteNote: () => {},
  SelectAll: () => {},
  setAllNotes: () => {},
  setLogged: () => {},
  allNotes: undefined,
  user: {
    picture: undefined,
    name: undefined,
    email: undefined,
  },
  getUser:()=>{}
};

export const myCon = createContext<CInterface>(contextDefaultState);

export interface CInterface {
  editorState: any;
  setEditorState: any;
  logged: boolean | undefined;
  Edit: Function;
  noteId: string | undefined | null;
  setNoteId: Function;
  fetchNote: Function;
 
  supabase: any;
  signout: Function;
  signIn: Function;
  deleteNote: Function;
  SelectAll: Function;
  setAllNotes: Function;
  getUser:Function;
  allNotes:
    | {
        DATA: { html: string };
        UID: string | undefined;
        HEADING: string | undefined;
      }[]
    | undefined;
  user: {
    picture: string | undefined;
    name: string | undefined;
    email: string | undefined;
  };
  setLogged: Function;
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
  const [allNotes, setAllNotes] = useState<
    | {
        DATA: { html: string };
        UID: string | undefined;
        HEADING: string | undefined;
      }[]
    | undefined
  >();

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

  
    // supabase.auth.onAuthStateChange((event: any, session: any) => {
    //   if (session) {
    //     console.log(event, session.user.user_metadata);
    //     setLogged(true);
    //     setUser(session.user.user_metadata);
    //   } 
    //   else {
    //     setLogged(false);
    //     setUser({
    //       picture: undefined,
    //       name: undefined,
    //       email: undefined,
    //     });
    //   }
    // });
  

  

  async function signIn() {
    const a: any = await supabase.auth.signIn(
      {
        provider: "google",
      },
      {
        redirectTo: "https://nota-nu.vercel.app/home",
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
    console.log("uid when editing");
    const contentState = editorState.getCurrentContent();
    console.log(contentState, "contentstate before storing");

    const rawData = convertToRaw(contentState);
    var data: any = { html: rawData };
    console.log(data.html, "to raw");
    if (logged == false || logged == undefined) {
      
        localStorage.setItem("note", JSON.stringify(data.html));
      
    } else {
      if (noteId === null || noteId === "new") {
        const id = uuidv4();
        console.log(id, "uuid genertaed");
        saveNew(data, id);
      }
      if (noteId !== "new") {
        Modify(noteId, data);
      }
    }
    console.log("qqdqdqd");
  };

  async function saveNew(data: any, id: any, heading?: any) {
    const { error } = await supabase.from("nota").insert([
      {
        UID: `${id}`,
        USERID: user.email,
        DATA: data.html,
        HEADING: "heading",
      },
    ]);
  }

  async function Modify(
    UID: string | null | undefined,
    html: any,
    heading?: any
  ) {
    const { data, error } = await supabase
      .from("nota")
      .update({ DATA: html, HEADING: heading })
      .match({ UID: UID });

      if(error){
        const { error } = await supabase.from("nota").insert([
          {
            UID: `${UID}`,
            USERID: user.email,
            DATA: html.html,
            HEADING: "heading",
          },
        ]);
      }
    // setNoteId(null);
  }

  async function fetchNote(uid: any) {
   
    console.log(uid, "uid");
    // setNoteId(uid);
    const { data, error }: any = await supabase
      .from("nota")
      .select("DATA, UID")
      .match({ UID: uid })
      .limit(1);

    if (logged===true && data) {
      if (data.length > 0) {
        //  const html = JSON.parse(data.DATA.blocks);
        console.log(data[0].DATA, "fetched single");
        const contentState: any = convertFromRaw(data[0].DATA.html);
        const newcon = EditorState.createWithContent(contentState);
        setEditorState(newcon);
      }
    }
    if (logged==false||logged==undefined) {
      const i: any = localStorage.getItem("note");
      const state = JSON.parse(i);
      const contentState: any = convertFromRaw(state);
      console.log(contentState, "from raw");
      const newcon = EditorState.createWithContent(contentState);
      setEditorState(newcon);
    }
  }

 function getUser(){
  const userd: any = supabase.auth.user();
    if (userd) {
      if (userd.aud == "authenticated") {
        setUser(userd.user_metadata);
        SelectAll();
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
    if(logged===true){
    const { data, error }: any = await supabase
      .from("nota")
      .select("DATA, UID,HEADING")
      .match({ USERID: user.email })
      .order("ID", { ascending: false });
    console.log(data);
    if (data.length > 0) {
      console.log(data, "allnotes");
      setAllNotes(data);
    }
    console.log(data, error, "online dta");
  }
   if(logged===false||logged===undefined){
    const i: any = localStorage.getItem("note");
    const note:any =JSON.parse(i);
    console.log("got offline note",[JSON.parse(i)],"noteof i")
    if(note!==null){
       note[0]!==null && setAllNotes([note]);
    }
   }

    
  }

  async function deleteNote(UID: string | null | undefined) {
    const { error, data: deletedData } = await supabase
      .from("nota")
      .delete()
      .match({ UID: UID });
    console.log(error,"eroro whn del");
    console.log(error, deletedData, " del data");
    return deletedData;
  }

  return (
    <>
      <myCon.Provider
        value={{
          getUser,
       
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
