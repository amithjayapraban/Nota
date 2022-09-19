import React, { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { myCon } from "./context";
type Props = {
  editMode: boolean,
  
}

export  const Head=({editMode}:Props)=> {
  const {Edit} = useContext(myCon);
  const location = window.location.pathname.toString();
  const navigate = useNavigate();
  

  return (
    <div className=" grid mb-6  grid-cols-3 w-[100%] text-fontc">
      {/* <img className='col-start-1 cursor-pointer self-center' src="/src/assets/logo.svg" onClick={() => {navigate('/home') }}   /> */}
      <svg
        className="col-start-1 cursor-pointer self-center"
        onClick={() => {
          navigate("/home");
        }}
        width="34"
        height="43"
        viewBox="0 0 34 43"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="3"
          width="32"
          height="32"
          stroke="#00FF57"
          stroke-width="2"
        />
        <path d="M7.648 43V20.6H10.016V43H7.648Z" fill="var(--fontc)" />
        <path
          d="M7.648 31V8.6H9.6L25.056 28.056H24.032V8.6H26.368V31H24.416L8.992 11.544H10.016V31H7.648Z"
          fill="var(--fontc)"
        />
      </svg>
      <div className="buttons text-sm md:text-[16px] cursor-pointer self-center justify-self-end col-start-3 ">
        {location === "/home" && (
          <button
            className="hover:bg-bg2  p-2 font-sans font-[700]  rounded-[2px]   "
            onClick={() => {
              navigate("/settings");
            }}
          >
            Settings
          </button>
        )}
        {location.match("/note") && (
          <div className="flex">
            <button
              className="hover:bg-bg2 p-2 rounded-[2px]  font-sans font-[700]   "
              onClick={() => {
                navigate("/home");
              }}
            >
              Back
            </button>{" "}
            {editMode ? (
              <button
                onClick={()=>{Edit()}}
                className="font-sans font-[700]  hover:bg-bg2 p-2 rounded-[2px] ml-2 "
              >
                Save
              </button>
            ) : (
              <button
                onClick={()=>{Edit()}}
                className="font-sans font-[700]  hover:bg-bg2 p-2 rounded-[2px] ml-2 "
              >
                Edit
              </button>
            )}
          </div>
        )}
        {location.match("/settings") && (
          <button
            className="hover:bg-bg2 p-2 font-sans font-[700]  rounded-[2px]    "
            onClick={() => {
              navigate("/home");
            }}
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
}
