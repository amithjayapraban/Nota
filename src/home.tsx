import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { myCon } from "./context";
import { v4 as uuidv4 } from "uuid";
import { EditorState } from "draft-js";
import Transition from "./Transition";
import { MotionConfig } from "framer-motion";

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
  const [l, setL] = useState<string | undefined>(undefined);
  const [g, setG] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  // console.log(allNotes, "allnotes");
  const {
    allNotes,
    logged,
    getUser,
    saveNew,
    user,
    SelectAll,
    Edit,
    deleteNote,
    setEditorState,
    setUser,
    setLogged,
    fetchNote,
  } = useContext(myCon);

  function handleEdit(noteId: string | undefined) {
    if (logged === true) {
      navigate(`/note/${noteId}`);
    } else {
      navigate(`/note/new`);
    }
  }

  useEffect(() => {
    getUser();
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
  var hour = date.getHours();
  // date.getHours();
  useEffect(() => {
    const bg: any = document.querySelector(".bannertext");
    if (hour >= 4 && hour < 11) {
      setGreet(`Good Morning`);
      setL(` #1D976C`);
      setG("#E1F5C4");
    }
    if (hour >= 11 && hour < 15) {
      setGreet(`Good Afternoon`);
      setL(`#34e89e`);
      setG("#0f3443");
    }
    if (hour >= 15 && hour <= 18) {
      setGreet("Good Evening");
      setL(`#bfe9ff`);
      setG("#00CDAC");
    }
    if (hour > 18 || hour <= 3) {
      setGreet("Good Night");
      setL(`#73C8A9`);
      setG("yellow");
      // bg.style.backgroundImage = "url('/assets/sunrise.webp')"
    }
  }, [hour]);
  const animationConfiguration = {
    initial: { opacity: 0, x: -3 },
    animate: { opacity: 1 , x: 0 },
    exit: { opacity: 0 },
};
const animationConfiguration2 = {
  initial: { opacity: 0,  },
  animate: { opacity: 1 ,  },
  exit: { opacity: 0 },
};

  return (
    <>
      <div
        onClick={() => {
          document.querySelector(".mod")?.classList.add("hidden");
        }}
        className="flex  w-[100%] overflow-y-hidden md:min-h-[80vh] min-h-[72vh] relative  gap-3 justify-start items-start    flex-col"
      >
        
        <div className="flex   flex-col min-h-[15vh] md:min-h-[20vh] banner   gap-3  ">
        <Transition animationConfiguration={animationConfiguration2}>
          <div className=" bg-bgc   w-full  bannertext flex flex-col items-start justify-end md:py-4 py-4 text-right  text-xl md:text-3xl text-black break-word flex-wrap rounded-md ">
            <span className="flex  w-[100%] text-bg2 text-3xl md:text-5xl text-left break-all ">
              {greet && greet}
            </span>
            <span className="text-left mt-2 text-fontc md:text-left ">
              {day}
              <br /> {month} {date.getDate()} {date.getFullYear()}
            </span>
          </div>
          </Transition>
        </div>
  
        <div className="flex min-h-[max-content]  overflow-y-scroll p-1 flex-wrap items-center justify-auto  w-[100%] mt-3  gap-3  ">
          <Suspense fallback={<p>Loading...</p>}>
            {allNotes &&
              allNotes.map((note, i = 1) => {
                return (
                  <Transition animationConfiguration={animationConfiguration}>
                    <div
                      onClick={async () => {
                        const newcon = EditorState.createEmpty();
                        if (logged === true) {
                          // setEditorState(newcon);
                        }
                        newcon && handleEdit(note.UID);
                      }}
                      className="note flex-auto justify-self-auto   text-fontc font-[500]   transition-all cursor-pointer  md:w-[180px] max-w-[160px] min-w-[160px]  flex flex-col justify-end  break-all  p-4  flex-wrap px-6 md:min-h-[160px] min-h-[160px]  "
                    >
                      {logged === true ? (
                        <p className="">{"Note" + ` ${i + 1}`}</p>
                      ) : (
                        "Offline Note"
                      )}
                      {/* {logged===undefined ? <>{note}</>:""} */}
                    </div>
                  </Transition>
                );
              })}
          </Suspense>
        </div>
      </div>
      {(user === undefined || !logged) && (
        <div className="text-xs mod flex items-center px-4 break-words md:max-w-[70vw] max-w-[50vw]  md:h-[70px] h-[70px] bottom-6 md:bottom-12 text-bgc bg-bg2 rounded shadow  absolute z-[100] ">
          To save your notes to cloud
          <br />
          Settings &nbsp;&gt; &nbsp;Login with Google
        </div>
      )}
      <div
        onClick={() => {
          const newcon = EditorState.createEmpty();
          if (logged === true) {
            setEditorState(newcon);
          }

          const id = uuidv4();
          id && navigate(`/note/${id}`);
        }}
        className="bg-logogreen text-xl    text-fontc absolute bottom-6 right-6 md:right-12 md:bottom-12  transition-all cursor-pointer   md:h-[70px] md:w-[70px] w-[70px] h-[70px] flex flex-col justify-center items-center  p-4 rounded-full shadow   "
      >
        <i className="fa fa-plus "> </i>
      </div>
    </>
  );
}
