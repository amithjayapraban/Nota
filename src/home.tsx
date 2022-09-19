import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
export default function Home({ allNotes, logged }: Prop) {
  const [greet, setGreet] = useState<string | undefined>(undefined);
  const [l, setL] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  // console.log(allNotes, "allnotes");
  function handleEdit(UID: string | undefined) {
    navigate(`/note/${UID}`);
  }
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
      setL(`Morning`);
    }
    if (hour >= 11 && hour < 15) {
      setGreet(`Good Afternoon`);
      setL(`Afternoon`);
    }
    if (hour >= 15 && hour <= 18) {
      setGreet("Good Evening");
      setL(`Evening`);
    }
    if (hour > 18 || hour <= 3) {
      setGreet("Good Night");
      setL(`Night`);
      // bg.style.backgroundImage = "url('/src/assets/sunrise.webp')"
    }

    console.log(greet);
  }, [hour]);

  return (
    <div className="flex w-[100%]   gap-3 justify-start items-start   flex-col">
      <div className="flex min-h-[250px] banner   gap-3  rounded-[3px]">
        <div
          style={{
            background: "url(" + "/src/assets/" + `${l}` + ".webp" + ")",
            backgroundPosition: "bottom left",
            backdropFilter: "blur:5px",
            objectFit: "contain",
            backgroundRepeat:"no-repeat",
            minWidth: "180px",
            width: "100%",
          }}
          className=" rounded-[3px] bg-bg2 w-full  bannertext flex flex-col items-end justify-end md:p-8 p-4 text-right   md:text-3xl text-white break-word flex-wrap "
        >
          <div className="flex min-w-[30%]  md:w-[50%]  md:h-[90%]   h-[50%] flex-col flex-wrap self-center md:self-end justify-center md:px-7 px-3 bg-[rgba(0,0,0,.1)] rounded  ">
            <span className="inline-flex text-xl md:text-4xl text-left break-all ">
              {greet && greet}
            </span>
            <span className="text-left md:text-right">
              {day}
              <br /> {month} {date.getDate()} {date.getFullYear()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-start   w-[100%] justify-start gap-3 ">
        <div
          onClick={() => {
            navigate("/note/new");
          }}
          className="hover:bg-logogreen   bg-green-400 transition-all cursor-pointer  min-w-[180px] w-[180px] flex flex-col justify-end  p-4 rounded-[3px]  min-h-[230px] max-h-[250px]"
        >
          {/* <a className="text-icon justify-self-center mb-[110px]   items-center  self-center font-[300] text-2xl"> Add Note</a> */}
          <a className="text-white self-end font-[400]  text-[36px]">+</a>
        </div>

        {allNotes &&
          allNotes.map((note) => {
            return (
              <div
                key={note.UID}
                onClick={() => handleEdit(note.UID)}
                className="bg-bg2 text-icon  hover:bg-[#4b4a4a] transition-all cursor-pointer min-w-[180px] w-[180px]  flex flex-col justify-end  break-all  p-4 rounded-[3px] flex-wrap  min-h-[230px] max-h-[250px]"
              >
                {note.HEADING ? (
                  <>{note.HEADING.slice(0, 11)}...</>
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
