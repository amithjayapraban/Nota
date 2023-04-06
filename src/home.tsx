import { Suspense, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myCon } from "./Context";
import { v4 as uuidv4 } from "uuid";
import { EditorState } from "draft-js";
import Transition from "./Transition";

export default function Home() {
  const [greet, setGreet] = useState<string | undefined>(undefined);
  const [showCard, setCard] = useState(false);

  const navigate = useNavigate();

  const { allNotes, logged, SelectAll, setEditorState } = useContext(myCon);

  if (allNotes) var i = allNotes.length + 1;
  function handleEdit(noteId: string | undefined) {
    navigate(`/note/${noteId}`);
  }

  useEffect(() => {
    setCard(true);
    let v = localStorage.getItem("Card");
    v && setCard(JSON.parse(v));

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
  var hour = date.getHours();

  useEffect(() => {
    const bg: any = document.querySelector(".bannertext");
    if (hour >= 4 && hour < 11) {
      setGreet(`Good Morning`);
    }
    if (hour >= 11 && hour < 15) {
      setGreet(`Good Afternoon`);
    }
    if (hour >= 15 && hour <= 18) {
      setGreet("Good Evening");
    }
    if (hour > 18 || hour <= 3) {
      setGreet("Good Evening");
    }
  }, [hour]);
  const animationConfiguration = {
    initial: { opacity: 0, x: -3 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0 },
  };
  const animationConfiguration2 = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      <div
        onClick={() => {
          localStorage.setItem("Card", `false`);
          setCard(false);
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

        <div className="flex h-[max-content]   overflow-y-scroll p-1 flex-wrap items-center justify-auto  w-[100%] mt-3  gap-3  ">
          <Suspense fallback={<p>Loading...</p>}>
            {allNotes &&
              allNotes.map((note) => {
                i--;
                console.log(note.UID);
                return (
                  <Transition
                    key={i}
                    animationConfiguration={animationConfiguration}
                  >
                  <div
                    onClick={async () => {
                      const newcon = EditorState.createEmpty();
                      if (logged === true) {
                      }
                      newcon && handleEdit(note.UID);
                    }}
                    className="note flex-auto justify-self-auto   text-fontc font-[500]   transition-all cursor-pointer  md:w-[180px] max-w-[160px] min-w-[160px]  flex flex-col justify-end  break-all  p-4  flex-wrap px-6 md:min-h-[160px] min-h-[160px]  "
                  >
                    {logged === true ? (
                      <p className="">{"Note" + ` ${i}`}</p>
                    ) : (
                      <p className="">{"Note" + ` ${i}`}</p>
                    )}
                  </div>
                  </Transition>
                );
              })}
          </Suspense>
        </div>
      </div>
      {!logged && showCard == true && (
        <div className="text-xs mod flex items-center px-4 break-words md:max-w-[70vw] max-w-[50vw]  md:h-[70px] h-[70px] bottom-6 md:bottom-12 text-bgc bg-bg2 rounded shadow  absolute z-[100] ">
          Your notes will be saved in LocalStorage
          <br />
        </div>
      )}
      <div
        onClick={async () => {
          const id = uuidv4();

          const newcon = EditorState.createEmpty();
          await setEditorState(newcon);

          id && navigate(`/note/${id}`);
        }}
        className="bg-logogreen text-xl    text-fontc absolute bottom-6 right-6 md:right-12 md:bottom-12  transition-all cursor-pointer   md:h-[70px] md:w-[70px] w-[70px] h-[70px] flex flex-col justify-center items-center  p-4 rounded-full shadow   "
      >
        <svg
          className="w-[24px] "
          clipRule="evenodd"
          fillRule="evenodd"
          fill="var(--fontc)"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
            fillRule="nonzero"
          />
        </svg>
      </div>
    </>
  );
}
