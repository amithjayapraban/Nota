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

import Note from "./note";
import Settings from "./settings";
import jwt_decode from "jwt-decode";

import { createClient, User } from "@supabase/supabase-js";

import { CProvider, myCon } from "./context";
import { convertFromHTML, convertToRaw, EditorState } from "draft-js";


function App() {
  const { setNoteId, noteId, Edit } = useContext(myCon);
  const [theme, setTheme]: any = useState("dark");
  const [editMode, setEditmode] = useState(true);

  const {
    logged,
    setLogged,
    signIn,
    signout,
    SelectAll,
    setAllNotes,
    getUser,
    allNotes,
  } = useContext(myCon);



  return (
    <CProvider>
      <div className="App flex max-h-[80vh]     margin-0  p-4 md:p-10   bg-mainbg  text-fontc flex-col ">
        <Router>
       <Head  editMode={editMode} />
     
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/note/:uid"
              element={<Note logged={logged} setNoteId={setNoteId} />}
            />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </div>
    </CProvider>
  );
}

export default App;
