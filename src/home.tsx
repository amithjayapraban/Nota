import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myCon } from "./context";
import { v4 as uuidv4 } from "uuid";
import { EditorState } from "draft-js";
type Prop = {
  allNotes:
    | {
        DATA: { html: string };
        UID: string | undefined;
        HEADING: string | undefined | null;
      }[]
    | undefined;
  logged: boolean | undefined;
};
export default function Home() {
  const [greet, setGreet] = useState<string | undefined>(undefined);
  const [l, setL] = useState<string| undefined>(undefined);
  const [g, setG] = useState<string| undefined>(undefined);
  const navigate = useNavigate();
  // console.log(allNotes, "allnotes");
  const { allNotes, logged, getUser, SelectAll, deleteNote, setEditorState } =
    useContext(myCon);

  function handleEdit(noteId: string | undefined) {
    if(logged===true){
    navigate(`/note/${noteId}`);
    }
    else{
      navigate(`/note/new`);
    }
  }

  
  useEffect(() => {
    getUser();
    SelectAll();
  }, []);
  useEffect(() => {
    SelectAll();
  }, [logged]);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  var date: any = new Date();
  var day = days[date.getDay()];
  var month = months[date.getMonth()];
  var hour =date.getHours();
  // date.getHours();
  useEffect(() => {
    const bg: any = document.querySelector(".bannertext");
    if (hour >= 4 && hour < 11) {
      setGreet(`Good Morning`);
      setL(` #1D976C`);
      setG('#E1F5C4');
    }
    if (hour >= 11 && hour < 15) {
      setGreet(`Good Afternoon`);
      setL(`#34e89e`);
      setG('#0f3443');
    }
    if (hour >= 15 && hour <= 18) {
      setGreet("Good Evening");
      setL(`#bfe9ff`);
      setG('#00CDAC');
    }
    if (hour > 18 || hour <= 3) {
      setGreet("Good Night");
      setL(`#73C8A9`);
      setG('#373B44');
      // bg.style.backgroundImage = "url('/assets/sunrise.webp')"
    }

    console.log(greet);
  }, [hour]);
  {console.log(allNotes)}
  
  return (
    <div className="flex w-[100%]   gap-3 justify-start items-start   flex-col">
      <div className="flex md:min-h-[250px] banner   gap-3  rounded-[3px]">
        <div
          style={{
            background:`linear-gradient(to bottom, ${l}  ,${g} )`,
            // background: "url(" + "/assets/" + `${l}` + ".webp" + ")",
            backgroundPosition: "bottom left",
            backdropFilter: "blur:5px",
            objectFit: "contain",
            backgroundRepeat: "no-repeat",
            minWidth: "180px",
            width: "100%",
          }}
          className=" rounded-[3px] bg-bg2 w-full  bannertext flex flex-col items-end justify-end md:p-8 p-4 text-right   md:text-3xl text-white break-word flex-wrap "
        >
          <div className="flex md:min-w-[30%] w-[100%]  md:w-[50%]  md:h-[90%] h-[max-content]   flex-col flex-wrap self-center md:self-end justify-center md:px-7 px-3 py-2 bg-[rgba(0,0,0,.01)] md:bg-[rgba(100,100,250,.05)] rounded  ">
            <span className="inline-flex  text-xl md:text-4xl text-left break-all ">
              {greet && greet}
            </span>
            <span className="text-right  md:text-right ">
              {day}
              <br /> {month} {date.getDate()} {date.getFullYear()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-start   w-[100%] justify-start gap-3 ">
        <div
          onClick={() => {
            const newcon = EditorState.createEmpty();
            if(logged===true){ setEditorState(newcon);}
            
            const id = uuidv4();
            id && navigate(`/note/${id}`);
          }}
          className="bg-logogreen   hover:bg-[#34e89e] transition-all cursor-pointer  md:min-w-[180px] md:w-[180px] min-w-[120px] flex flex-col justify-end  p-4 rounded-[3px] min-h-[150px]  md:min-h-[230px] max-h-[250px]"
        >
          {/* <a className="text-icon justify-self-center mb-[110px]   items-center  self-center font-[300] text-2xl"> Add Note</a> */}
          <a className="text-white self-end font-[400]  text-[36px]">+</a>
        </div>
  
        {allNotes &&
          allNotes.map((note,i=1) => {
            return (
              <div
                
                onClick={async() => {
                  const newcon = EditorState.createEmpty();
                  if(logged===true){ setEditorState(newcon);}
                  newcon && handleEdit(note.UID);
                }}
                className="bg-bg2 text-icon  hover:bg-[#4b4a4a] transition-all cursor-pointer md:min-w-[180px] min-w-[100px] md:w-[180px]  flex flex-col justify-end  break-all  p-4 rounded-[3px] flex-wrap  md:min-h-[230px] min-h-[150px] max-h-[250px]"
              >
              
                {logged===true ? (
                 `Note ${i+1}`
                ) : (
                  "Offline Note"
                )}
                {/* {logged===undefined ? <>{note}</>:""} */}
              </div>
            );
          })}
      </div>
    </div>
  );
}
