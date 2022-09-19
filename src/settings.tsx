import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { myCon } from "./context";
import Login from "./login";

export default function Settings(
 ) {

  const {signIn,signout,user,logged,getUser} = useContext(myCon);
  const navigate = useNavigate();
  const [bname, setBname] = useState("");
  useEffect(() => {
    var t: any = localStorage.getItem("data-theme");
    if (t === "light") setBname("Dark Theme");
    else {
      setBname("Light Theme");
    }
    getUser();
  }, [ ]);
   

  function Changetheme() {
    if (document.documentElement.getAttribute("data-theme") === "light") {
      setBname("Light Theme");
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      setBname("Dark Theme");
      localStorage.setItem("data-theme", "light");
    }
  }

  return (
    <div className="w-[100%] flex flex-col justify-start">
      <p className="text-2xl md:text-4xl flex items-center justify-between gap-3  font-sans cursor-default mb-4 font-[300]">
        Settings 
        <div
       onClick={Changetheme}
        className="flex bg-bg2  justify-center items-center w-[48px] h-[48px]  p-3 rounded-[3px] toggle  relative md:hover:bg-bg2 "
      > 
       {/* <span className="self-center w-[max-content] mr-[36px] py-[6px]  ">Switch to {bname}</span> */}
        <svg  
          className="tog absolute sun  p-1 rounded  "
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="var(--icon)"
            className="opacity-[var(--sun)]   "
            d="M4.069 13h-4.069v-2h4.069c-.041.328-.069.661-.069 1s.028.672.069 1zm3.034-7.312l-2.881-2.881-1.414 1.414 2.881 2.881c.411-.529.885-1.003 1.414-1.414zm11.209 1.414l2.881-2.881-1.414-1.414-2.881 2.881c.528.411 1.002.886 1.414 1.414zm-6.312-3.102c.339 0 .672.028 1 .069v-4.069h-2v4.069c.328-.041.661-.069 1-.069zm0 16c-.339 0-.672-.028-1-.069v4.069h2v-4.069c-.328.041-.661.069-1 .069zm7.931-9c.041.328.069.661.069 1s-.028.672-.069 1h4.069v-2h-4.069zm-3.033 7.312l2.88 2.88 1.415-1.414-2.88-2.88c-.412.528-.886 1.002-1.415 1.414zm-11.21-1.415l-2.88 2.88 1.414 1.414 2.88-2.88c-.528-.411-1.003-.885-1.414-1.414zm2.312-4.897c0 2.206 1.794 4 4 4s4-1.794 4-4-1.794-4-4-4-4 1.794-4 4zm10 0c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6 6 2.686 6 6z"
          />
        </svg>
        <svg  
          className="tog  absolute  moon    p-1  "
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="var(--icon)"
            d="M22 12c0 5.514-4.486 10-10 10-4.826 0-8.864-3.436-9.797-7.99 3.573.142 6.903-1.818 8.644-5.013 1.202-2.206 1.473-4.679.83-6.992 5.608-.194 10.323 4.338 10.323 9.995zm-10-12c-1.109 0-2.178.162-3.197.444 3.826 5.933-2.026 13.496-8.781 11.128l-.022.428c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12z"
          />
        </svg>
      </div>
      </p>
      

      <div className=" flex flex-col self-center md:self-center  py-8 items-center rounded-[3px] px-4   w-[80vw] md:w-[30vw] md:h-[30vw]  mt-7 gap-3">
        {user.picture !== undefined ? (
          <img
            className="w-[80px]  border border-white rounded-full"
            src={user.picture}
          />
        ) : (
          <div className="w-[80px]   border-[1.5px]  flex justify-center items-center  bg-transparent h-[80px] rounded-full">
           <svg
              fill="var(--icon)"
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
            >
              <path d="M16.5 11.5c0 .828-.56 1.5-1.25 1.5s-1.25-.672-1.25-1.5.56-1.5 1.25-1.5 1.25.672 1.25 1.5zm-6.5 0c0-.828-.56-1.5-1.25-1.5s-1.25.672-1.25 1.5.56 1.5 1.25 1.5 1.25-.672 1.25-1.5zm2 7.5c3.156 0 4-3 4-3h-8s.75 3 4 3zm12-6.574c0 1.916-.888 4.709-3.28 5.182-1.771 3.579-4.701 5.392-8.72 5.392s-6.949-1.813-8.72-5.392c-2.392-.473-3.28-3.266-3.28-5.182 0-2.142.8-4.079 2.826-4.222.208-2.413 1.293-4.47 3.282-5.789.311-1.916 1.214-2.415 2.096-2.415.519 0 2.569.875 3.796.875 1.079 0 3.193-.875 3.795-.875.875 0 1.784.488 2.097 2.412 1.86 1.226 3.061 3.225 3.282 5.793 2.032.142 2.826 2.093 2.826 4.221zm-11-9.675v1.547c.741.152 1.627.444 2.707.911.396-.757.388-2.549-.006-3.279-.528.2-1.689.615-2.701.821zm-4.706 2.461c1.088-.46 1.977-.751 2.706-.906v-1.537c-1.055-.197-2.178-.619-2.704-.832-.393.745-.394 2.526-.002 3.275zm13.075 5.098c-.272-.177-.613-.104-.756-.041-.669.3-1.427-.205-1.406-.941.034-1.232-.193-2.944-1.363-4.308-.398 1.897-1.487 2.47-2.513 2.197-.952-.256-2.122-1.045-3.331-1.045-1.125 0-2.456.812-3.332 1.044-1.017.274-2.113-.294-2.512-2.196-1.17 1.364-1.397 3.076-1.363 4.308.021.733-.733 1.241-1.406.941-.142-.063-.484-.136-.756.041-1.102.717-.798 5.326 1.336 5.367.389.008.738.24.896.595 1.408 3.181 3.743 4.728 7.137 4.728s5.729-1.547 7.137-4.729c.158-.355.507-.587.896-.595 2.135-.041 2.438-4.65 1.336-5.366z" />
            </svg>
          </div>
        )}
        <h4>{user.name && user.name}</h4>

        {logged ? (
          <button
            onClick={() => {
              signout();
              navigate("/settings");
            }}
            className=" w-[max-content] text-red-400 inline-flex justify-start items-center md:hover:bg-bg2 gap-1 font-sans rounded-[2px]  p-2 "
          >
            Sign out
          </button>
        ) : (
          <>
            <button
              onClick={async () => {
                await signIn();
              }}
              className=" w-[max-content]  md:bg-none inline-flex justify-start items-center md:hover:bg-bg2 gap-1 font-sans rounded-[3px]  p-3"
            >
              Login with
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
          </>
        )}
         
        
      </div>
    </div>
  );
}
