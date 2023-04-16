import { useContext } from "react";
import { EditorState, RichUtils } from "draft-js";
import { myCon } from "./context";
import { useNavigate, useParams } from "react-router-dom";

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Quote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "Code", style: "code-block" },
];
var inlineTypes = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },

  { label: "Mono", style: "CODE" },
];

export const Tools = () => {
  const { handleDel, editorState, setEditorState, setChange, change } =
    useContext(myCon);
  const uid = useParams();

  const navigate = useNavigate();
  return (
    <div className="RichEditor-controls flex margin-0  justify-evenly  gap-2 flex-wrap">
      {inlineTypes.map((type, i) => (
        <ButtonInline key={i} type={type} />
      ))}
      {BLOCK_TYPES.map((type, i) => (
        <ButtonBlock key={i} type={type} />
      ))}

      <button
        onClick={() => {
          handleDel(uid);
          setChange(!change);
          navigate("/");
        }}
        className="flex ml-auto justify-center px-2 md:border-none transition w-[max-content] h-[36px]  items-center text-sm  rounded-[3px] text-red-500"
      >
        Delete
      </button>
      <button
        className="flex  justify-center   md:border-none w-[max-content]  h-[36px] items-center text-sm px-2 rounded-[3px]   "
        onClick={(e) => {
          e.preventDefault();
        }}
        onMouseDown={() => {
          let s = EditorState.redo(editorState);
          setEditorState(s);
        }}
      >
        {" "}
        Redo
      </button>

      <button
        className=" flex justify-center   md:border-none w-[max-content]  h-[36px] items-center text-sm px-2 rounded-[3px]  "
        onClick={(e) => {
          e.preventDefault();
        }}
        onMouseDown={() => {
          let s = EditorState.undo(editorState);
          setEditorState(s);
        }}
      >
        {" "}
        Undo
      </button>
    </div>
  );
};
type Prop = { type: { label: string; style: string } };

export const ButtonBlock = ({ type }: Prop) => {
  const { editorState, setEditorState } = useContext(myCon);
  const currentBl = RichUtils.getCurrentBlockType(editorState);
  let className =
    "flex justify-center  text-fontc items-center text-sm w-[46px] px-1 h-[36px]  md:bg-transparent md:border-none rounded-[2px]";
  if (currentBl === type.style) {
    className =
      "flex justify-center  text-fontc items-center text-sm w-[46px] px-1 h-[36px] bg-logogreen  md:border-none rounded-[2px]";
  }
  const toggleBl = (e: any) => {
    e.preventDefault();
    let type = e.target.value.toString();
    setEditorState(RichUtils.toggleBlockType(editorState, type));
    // console.log(type);
  };

  return (
    <button
      className={className}
      value={type.style}
      onClick={(e) => e.preventDefault()}
      onMouseDown={(e) => toggleBl(e)}
    >
      {type.label}
    </button>
  );
};

export const ButtonInline = ({ type }: Prop) => {
  const { editorState, setEditorState } = useContext(myCon);
  const currentIn: any = editorState.getCurrentInlineStyle();
  let className =
    "flex justify-center  text-fontc items-center text-sm w-[46px] p-1 h-[36px]   md:border-none rounded-[2px]";
  if (currentIn.has(type.style)) {
    className =
      "flex justify-center  text-fontc items-center text-sm w-[46px] p-1 h-[36px] bg-logogreen  md:border-none rounded-[2px]";
  }
  const toggleIn = (e: any) => {
    e.preventDefault();
    let type = e.target.value.toString();
    setEditorState(RichUtils.toggleInlineStyle(editorState, type));
  };

  return (
    <button
      className={className}
      value={type.style}
      onClick={(e) => e.preventDefault()}
      onMouseDown={(e) => toggleIn(e)}
    >
      {type.label}
    </button>
  );
};
