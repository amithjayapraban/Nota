import { useContext, useEffect } from "react";

import { useParams } from "react-router-dom";
import { Editor } from "draft-js";
import { Tools } from "./Tools";
import { myCon } from "./Context";
import "draft-js/dist/Draft.css";
import Transition from "./Transition";
type Prop = {
  setNoteId: Function;
  logged: boolean | undefined;
};
export default function Note({ logged }: Prop) {
  const {
    editorState,

    setEditorState,
    setNoteId,
    setAllNotes,
    allNotes,
    Edit,
    fetchNote,
  } = useContext(myCon);
  const uid = useParams();

  useEffect(() => {
    setNoteId(uid.uid);

    fetchNote(uid.uid);
  }, []);
  const animationConfiguration = {
    initial: { opacity: 0 },
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
    </div>
    </Transition>
  );
}
