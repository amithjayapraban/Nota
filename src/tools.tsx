import React, { useContext } from "react";
import { EditorState, RichUtils } from "draft-js";
import { myCon } from "./context";

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "Code", style: "code-block" },
];
var inlineTypes = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  
  { label: "Mono", style: "CODE" },
];

export const Tools = () => {
  const {logged}=useContext(myCon);
  return (
    <div className="RichEditor-controls flex gap-2 flex-wrap">
       {inlineTypes.map((type) => (
         <ButtonInline type={type}/>
        
      ))}
      {BLOCK_TYPES.map((type) => (
        
       <ButtonBlock type={type}/>

      ))}
     
    </div>
  );
};
 type Prop={type:{label:string,style:string}}

export const ButtonBlock=({type}:Prop)=>{
  const {editorState,setEditorState}=useContext(myCon);
     const currentBl=RichUtils.getCurrentBlockType(editorState);
     let className="justify-center mr-1 text-fontc items-center text-sm min-w-[36px] px-1 h-[36px]  md:bg-transparent md:border-none rounded-[2px]";
     if(currentBl===type.style){
      className="justify-center mr-1 text-fontc items-center text-sm min-w-[36px] px-1 h-[36px] bg-bg2  md:border-none rounded-[2px]";
     }
    const toggleBl = (e: any) => {
    e.preventDefault();
    let type =  e.target.value.toString();
    setEditorState(RichUtils.toggleBlockType(editorState, type));
    console.log(type);
  };

  return(
    <button className={className} value={type.style} onClick={(e)=>e.preventDefault()} onMouseDown={(e) => toggleBl(e)}>
    {type.label}
  </button>
  )
}

export const ButtonInline=({type}:Prop)=>{
  const {editorState,setEditorState}=useContext(myCon);
     const currentIn:any= editorState.getCurrentInlineStyle();
     let className="justify-center mr-1 text-fontc items-center text-sm min-w-[36px] p-1 h-[36px]   md:border-none rounded-[2px]";
     if(currentIn.has(type.style)){
      className="justify-center mr-1 text-fontc items-center text-sm min-w-[36px] p-1 h-[36px] bg-logogreen  md:border-none rounded-[2px]";
     }
    const toggleIn = (e: any) => {
    e.preventDefault();
    let type =  e.target.value.toString();
    setEditorState(RichUtils.toggleInlineStyle(editorState, type));
    console.log(type);
  };

  return(
    <button className={className} value={type.style} onClick={(e)=>e.preventDefault()} onMouseDown={(e) => toggleIn(e)}>
    {type.label}
  </button>
  )
}