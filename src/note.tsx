import React, { Fragment, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  DraftBlockType,
  convertFromHTML,
  convertFromRaw,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import { Tools } from "./tools";
import { myCon } from "./context";
import "draft-js/dist/Draft.css";
import Transition from "./Transition";
type Prop = {
  setNoteId: Function;
  logged: boolean | undefined;
};
export default function Note({ logged }: Prop) {
  const {
    editorState,
    deleteNote,
    setEditorState,
    setNoteId,
    setAllNotes,
    allNotes,
    Edit,
    fetchNote,
  } = useContext(myCon);
  const uid = useParams();
  // console.log(uid.uid,"uiidddded");
  const navigate = useNavigate();

  useEffect(() => {
    fetchNote(uid.uid);
  }, [allNotes]);

  useEffect(() => {
    setNoteId(uid.uid);
    if (uid.uid !== `new`) {
      fetchNote(uid.uid);
    }
  }, []);
  const animationConfiguration = {
    initial: { opacity: 0,  },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

  return (
    <Transition animationConfiguration={animationConfiguration}>
    <div className="flex main_note justify-between md:justify-start flex-col relative gap-3  mt-3">
      <div className="toolbar bg-bgc rounded-md  border-fontc flex flex-wrap  items-baseline">
        <Tools />
      </div>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        spellCheck={true}
      />
    </div></Transition>
  );
}
