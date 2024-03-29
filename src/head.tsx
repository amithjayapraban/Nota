import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { myCon } from "./context";

export const Head = () => {
  const { Edit } = useContext(myCon);
  const location = window.location.pathname.toString();
  const navigate = useNavigate();
  const { uid } = useParams();
  return (
    <div className="sticky top-0 head z-[200000]  grid mb-5 grid-cols-3 w-[100%] text-fontc">
      {/* <img className='col-start-1 cursor-pointer self-center' src="/src/assets/logo.svg" onClick={() => {navigate('/home') }}   /> */}
      <svg
        className="col-start-1 cursor-pointer self-center"
        onClick={() => {
          navigate("/");
        }}
        width="34"
        height="43"
        viewBox="0 0 34 43"
        fill="var(--icon)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="3"
          width="32"
          height="32"
          stroke="var(--icon) "
          strokeWidth="2"
        />

        <path
          d="M7.648 31V8.6H9.6L25.056 28.056H24.032V8.6H26.368V31H24.416L8.992 11.544H10.016V31H7.648Z"
          fill="var(--bg2) "
        />
      </svg>
      <div className="buttons transition-[1]  text-sm md:text-[16px] cursor-pointer self-center justify-self-end col-start-3 ">
        {location === "/" && (
          <button
            className=" md:hover:text-white outline-none  md:hover:bg-bg2 p-2 font-sans font-[700]  rounded-[2px]   "
            onClick={() => {
              navigate("/settings");
            }}
          >
            More
          </button>
        )}
        {location.match("/note") && (
          <div className="flex">
            <button
              className="md:hover:text-white outline-none  md:hover:bg-bg2 p-2 font-sans font-[700]  rounded-[2px]   "
              onClick={() => {
                Edit(uid);
                navigate("/");
              }}
            >
              Back
            </button>{" "}
          </div>
        )}
        {location.match("/settings") && (
          <button
            className="hover:bg-bg2 p-2 font-sans font-[700] hover:text-white rounded-[2px]    "
            onClick={() => {
              navigate("/");
            }}
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
};
