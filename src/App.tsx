import { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Head } from "./head";
import Home from "./home";
import Login from "./login";
import Note from "./note";
import Settings from "./settings";
import jwt_decode from "jwt-decode";
import { useScript } from "./hook";
import { createClient, User } from "@supabase/supabase-js";

import { CProvider, myCon } from "./context";
import {convertFromHTML,convertToRaw,EditorState} from 'draft-js';
function App() {
  const { setNoteId, noteId,Edit } = useContext(myCon);
  const [theme, setTheme]: any = useState("dark");
  const [editMode, setEditmode] = useState(true);
  const [logged, setLogged] = useState<boolean | undefined>();
  const [allNotes, setAllNotes] = useState<
    | {
        DATA: { html: string };
        UID: string | undefined;
        HEADING: string | undefined;
      }[]
    | undefined
  >();
 
  const [user, setUser] = useState<{
    picture: string | undefined;
    name: string | undefined;
    email: string | undefined;
  }>({
    picture: undefined,
    name: undefined,
    email: undefined,
  });
  const {editorState,setEditorState}=useContext(myCon);
  
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

  async function signIn() {
    const a: any = await supabase.auth.signIn(
      {
        provider: "google",
      },
      {
        redirectTo: window.location.href,
      }
    );
  }
  async function signout() {
    const { error } = await supabase.auth.signOut();
    setLogged(false);
  }

  useEffect(() => {
    var t: any = localStorage.getItem("data-theme");
    if (t) {
      setTheme(t);
      document.documentElement.setAttribute("data-theme", t);
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    if (!logged || logged === undefined) {
      var note: any = localStorage.getItem("note");
      var data: any = { html: JSON.parse(note) };
      // console.log(data.html,"retrieved");
      setAllNotes([data]);

    }
    
    setEditmode(editMode);
    console.log("theme");
  }, []);

  useEffect(() => {
    const userd: any = supabase.auth.user();
    if (userd) {
      if (userd.aud == "authenticated") {
        // console.log(userd);
        setUser(userd.user_metadata);
        setLogged(true);
        SelectAll();
      } else {
        setLogged(false);
      }
    }
  }, [logged]);

  

  async function SelectAll() {
    const { data, error }: any = await supabase
      .from("nota")
      .select("DATA, UID,HEADING")
      .match({ USERID: user.email })
      .order("ID", { ascending: false });
    console.log(data);
    if (data.length > 0) {
      setAllNotes(data);
    }
  }

  // async function saveNew(data: any, id: any, heading: any) {
  //   const { error } = await supabase.from("nota").insert([
  //     {
  //       UID: `${id}`,
  //       USERID: user.email,
  //       DATA: data,
  //       HEADING: heading,
  //     },
  //   ]);
  // }

  // async function Modify(
  //   UID: string | null | undefined,
  //   html: any,
  //   heading: any
  // ) {
  //   const { data, error } = await supabase
  //     .from("nota")
  //     .update({ DATA: html, HEADING: heading })
  //     .match({ UID: UID });
  //   setNoteId(null);
  //   console.log(noteId);
  // }
  async function deleteNote(UID: string | null | undefined) {
    const { error, data: deletedData } = await supabase
      .from("nota")
      .delete()
      .match({ UID: UID });
    console.log(error);
    console.log(error, deletedData, "error when del");
    return deletedData;
  }

  

  return (
    <CProvider > 
    <div className="App flex  overflow-y-scroll   bg-bgc h-screen text-fontc flex-col p-5 md:p-12">
      <Router>
        <Head editMode={editMode} />
        <Routes>
          <Route path="/" element={<Login signin={signIn} logged={logged} />} />
          <Route path="/home" element={<Home allNotes={allNotes} logged={logged} />} />
          <Route
            path="/note/:uid"
            element={
              <Note logged={logged}  
                deleteNote={deleteNote}
                supabase={supabase}
                setNoteId={setNoteId}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                signin={signIn}
                signout={signout}
                picture={user.picture}
                name={user.name}
                logged={logged}
              />
            }
          />
        </Routes>
      </Router>
    </div>
    </CProvider>
  );
}

export default App;
