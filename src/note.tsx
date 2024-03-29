import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Editor } from "draft-js";
import { Tools } from "./tools";
import { myCon } from "./context";
import "draft-js/dist/Draft.css";
import Transition from "./Transition";

export default function Note() {
  const { editorState, setEditorState, setNoteId, fetchNote } =
    useContext(myCon);
  const uid: any = useParams();

  useEffect(() => {
    setNoteId(uid.uid);
    if (uid["*"] != "new") fetchNote(uid.uid);
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
