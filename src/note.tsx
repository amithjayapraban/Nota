import React, { Fragment, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { DraftBlockType,convertFromHTML, convertFromRaw, Editor, EditorState, RichUtils } from 'draft-js';
import { Tools } from "./tools";
import { myCon } from "./context";
import "draft-js/dist/Draft.css";
type Prop = {
  deleteNote: Function;
  supabase: any;
  setNoteId: Function;
  logged: boolean | undefined;
};
export default function Note({
  deleteNote,
  supabase,
  setNoteId,
  logged,
}: Prop) {
  const { editorState, setEditorState ,fetchNote,uid} = useContext(myCon);

  const navigate = useNavigate();
  

  

  useEffect(() => {
    if (uid !== `new`) {
      fetchNote();
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
            navigate("/home");
          }
          if (await deleteNote(uid)) {
            console.log("navigate");
            navigate("/home");
          }
        }}
        className="flex justify-center px-2 md:border-none  w-[max-content] h-[36px]  items-center text-sm  rounded-[3px]  text-red-500 "
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
