import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { myCon } from "./context";
import Transition from "./Transition";

export default function Settings() {
  const { signIn, signout, user, logged, getUser, SelectAll } =
    useContext(myCon);
  const navigate = useNavigate();

  useEffect(() => {
    if (!logged) getUser();
  }, []);
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
    <div className="w-[100%] flex flex-col justify-start  mt-5   ">
      <div className=" text-2xl md:text-4xl flex items-center justify-between gap-3  font-sans cursor-default mb-4 font-[300]">
      <Transition animationConfiguration={animationConfiguration2}> <p className=" md:text-5xl text-3xl settings  text-bg2 rounded">Settings </p>
      </Transition>
      </div>
    <Transition animationConfiguration={animationConfiguration}>
      <div className="setting_menu  relative  flex flex-col self-center md:self-center   py-8 items-center rounded-[3px]    w-[100%] md:w-[100%] md:h-[30vw] h-[55vh]  mt-7 gap-3">
        {user.picture !== undefined ? (
          <img
            className="w-[80px]  rounded-[10px]"
            src={user.picture}
          />
        ) : (
          <div className="w-[80px] bg-bgc flex rounded-full   justify-center items-center   h-[80px] ">
            {/* <svg
              fill="var(--bg2)"
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
            >
              <path d="M16.5 11.5c0 .828-.56 1.5-1.25 1.5s-1.25-.672-1.25-1.5.56-1.5 1.25-1.5 1.25.672 1.25 1.5zm-6.5 0c0-.828-.56-1.5-1.25-1.5s-1.25.672-1.25 1.5.56 1.5 1.25 1.5 1.25-.672 1.25-1.5zm2 7.5c3.156 0 4-3 4-3h-8s.75 3 4 3zm12-6.574c0 1.916-.888 4.709-3.28 5.182-1.771 3.579-4.701 5.392-8.72 5.392s-6.949-1.813-8.72-5.392c-2.392-.473-3.28-3.266-3.28-5.182 0-2.142.8-4.079 2.826-4.222.208-2.413 1.293-4.47 3.282-5.789.311-1.916 1.214-2.415 2.096-2.415.519 0 2.569.875 3.796.875 1.079 0 3.193-.875 3.795-.875.875 0 1.784.488 2.097 2.412 1.86 1.226 3.061 3.225 3.282 5.793 2.032.142 2.826 2.093 2.826 4.221zm-11-9.675v1.547c.741.152 1.627.444 2.707.911.396-.757.388-2.549-.006-3.279-.528.2-1.689.615-2.701.821zm-4.706 2.461c1.088-.46 1.977-.751 2.706-.906v-1.537c-1.055-.197-2.178-.619-2.704-.832-.393.745-.394 2.526-.002 3.275zm13.075 5.098c-.272-.177-.613-.104-.756-.041-.669.3-1.427-.205-1.406-.941.034-1.232-.193-2.944-1.363-4.308-.398 1.897-1.487 2.47-2.513 2.197-.952-.256-2.122-1.045-3.331-1.045-1.125 0-2.456.812-3.332 1.044-1.017.274-2.113-.294-2.512-2.196-1.17 1.364-1.397 3.076-1.363 4.308.021.733-.733 1.241-1.406.941-.142-.063-.484-.136-.756.041-1.102.717-.798 5.326 1.336 5.367.389.008.738.24.896.595 1.408 3.181 3.743 4.728 7.137 4.728s5.729-1.547 7.137-4.729c.158-.355.507-.587.896-.595 2.135-.041 2.438-4.65 1.336-5.366z" />
            </svg> */}
          </div>
        )}
        <h3 className="  mt-2 text-fontc">
          {/* {logged ? user.name && user.name : ""} */}
        </h3>

        {logged ? (
          <button
            onClick={() => {
              signout();
              navigate("/settings");
            }}
            className="absolute top-48 w-[max-content] text-red-400 inline-flex justify-start items-center bg-bgc bg-white  border-2 border-logogreen  gap-1 font-sans rounded  p-2 "
          >
            Sign out
          </button>
        ) : (
          <>
            <button
              onClick={async () => {
                await signIn();
              }}
              className="absolute top-48  w-[max-content] text-fontc inline-flex justify-start items-center bg-bgc bg-white  border-2 border-logogreen  gap-1 font-sans rounded  p-2"
            >
              Login with
              
              <span className="font-medium text-bg2">Google</span>
            </button>
          </>
        )}
      </div>
      </Transition>
    </div>
  );
}
