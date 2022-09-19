import React, { Fragment, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { DraftBlockType,convertFromHTML, convertFromRaw, Editor, EditorState, RichUtils } from 'draft-js';
import { Tools } from "./tools";
import { myCon } from "./context";
import "draft-js/dist/Draft.css";
type Prop = {
  

  setNoteId: Function;
  logged: boolean | undefined;
};
export default function Note({
  
 
  logged,
}: Prop) {
  const { editorState,deleteNote, setEditorState,setNoteId,setAllNotes,allNotes ,Edit,fetchNote} = useContext(myCon);
  const uid=useParams();
  // console.log(uid.uid,"uiidddded");
  const navigate = useNavigate();
 

useEffect(()=>{
  setNoteId(uid.uid);
},[ ])
   useEffect(()=>{
    fetchNote(uid.uid);
   },[allNotes])

  useEffect(() => {
   
    // const newcon = EditorState.createEmpty();
    // setEditorState(newcon);
     if (uid.uid !== `new`) {
      fetchNote(uid.uid);
     }
  }, []);

  return (
    <div className="flex justify-between md:justify-start flex-col relative gap-3">
      
      
       <div className="toolbar flex flex-wrap justify-start items-baseline">
      <Tools  />
      <button
        // data-tooltip="Delete Note"
        onClick={async () => {
          if (logged !== undefined || !logged) {
            localStorage.removeItem("note");
            setAllNotes(null);
            navigate("/home");
          }
          if (await deleteNote(uid.uid)) {
            console.log("navigate");
            navigate("/home");
          }
        }}
        className="flex justify-center px-2 md:border-none transition w-[max-content] h-[36px]  items-center text-sm  rounded-[3px] hover:text-red-500 md:text-red-400  text-red-500"
      >
        Delete
      </button>
      <button  className="flex justify-center   md:border-none w-[max-content]  h-[36px] items-center text-sm px-2 rounded-[3px]   " onClick={(e)=>{e.preventDefault()}} onMouseDown={()=>{let s=EditorState.redo(editorState); setEditorState(s);}}> Redo</button>
      
      <button className=" flex justify-center   md:border-none w-[max-content]  h-[36px] items-center text-sm px-2 rounded-[3px]  "  onClick={(e)=>{e.preventDefault()}} onMouseDown={()=>{let s=EditorState.undo(editorState); setEditorState(s);}}> Undo</button>
      </div>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        spellCheck={true}
      />
    </div>
  );
}
