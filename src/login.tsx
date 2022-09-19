import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { myCon } from "./context";
type Prop = {

  logged: boolean|undefined;
};
export default function Login({  logged }: Prop) {
  const {signIn} = useContext(myCon);
  const navigate = useNavigate();
  useEffect(() => {
    if (logged) navigate("/home");
  }, []);

  return (
    <div className="h-[80vh] md:h-[60vh] items-center justify-center flex flex-col w-[100%]">
      <div className=" items-start cursor-pointer   flex flex-col ">
        <span className="inline-flex  cursor-default">
          <svg
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
          <p className="text-3xl ml-3">Nota</p>
        </span>
        <div className="buttonDiv rounded-[2px]  w-[max-content]"></div>
        <button
          onClick={() => {
            signIn();
          }}
          className="border mt-5 inline-flex justify-start items-center hover:bg-bg2 gap-1 font-sans rounded-[2px]  py-2 px-3"
        >
          Login with{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="var(--icon)"
            className="bi bi-google"
            viewBox="0 0 16 16"
          >
            {" "}
            <path
              d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
              fill="var(--icon)"
            ></path>{" "}
          </svg>
          <span className="ml-[-3px]  text-logogreen">oogle</span>
        </button>

        <button
          className="border mt-3  hover:bg-bg2 font-sans  rounded-[2px] py-2 px-3"
          onClick={() => {
            navigate("/home");
          }}
        >
          Continue without logging in
        </button>
        <button></button>
      </div>
    </div>
  );
}
