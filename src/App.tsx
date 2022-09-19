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
  
  
  const {logged,setLogged,signIn,signout,SelectAll,setAllNotes,getUser,allNotes}=useContext(myCon);
  
  
useEffect(()=>{
  getUser();
  SelectAll();
},[])
 
 

  useEffect(() => {
    console.log(logged,"loddeg");
    var t: any = localStorage.getItem("data-theme");
    if (t) {
      setTheme(t);
      document.documentElement.setAttribute("data-theme", t);
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    if (logged===false ||logged ===undefined ) {
      var note: any = localStorage.getItem("note");
     if(note) var data: any = { html: JSON.parse(note) };
      
      setAllNotes([data]);
      
    }
    else{
      setLogged(true);
      SelectAll();
    }
    
    setEditmode(editMode);
    console.log("theme");
  }, [logged]);
  
  

  

  

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
  

  

  return (
    <CProvider > 
    <div className="App flex  overflow-y-hidden   bg-bgc h-screen text-fontc flex-col p-5 md:p-12">
   
      <Router>
        <Head editMode={editMode} />
        
        
        <Routes>
          <Route path="/" element={<Login   />} />
          <Route path="/home" element={<Home  />} />
          <Route
            path="/note/:uid"
            element={
              <Note logged={logged}  
                
              
                setNoteId={setNoteId}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                
                
                
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
