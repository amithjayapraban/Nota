export default function More() {
  // const animationConfiguration = {
  //   initial: { opacity: 0, x: -3 },
  //   animate: { opacity: 1, x: 0 },
  //   exit: { opacity: 0 },
  // };
  // const animationConfiguration2 = {
  //   initial: { opacity: 0 },
  //   animate: { opacity: 1 },
  //   exit: { opacity: 0 },
  // };

  return (
    <div className="w-[100%] flex flex-col justify-start  mt-5   ">
      <div className=" text-2xl md:text-4xl flex items-center justify-between gap-3  font-sans cursor-default mb-4 font-[300]">
        {/* <Transition animationConfiguration={animationConfiguration2}> */}{" "}
        {/* <p className=" md:text-5xl text-3xl settings  text-bg2 rounded">
          About{" "}
        </p> */}
        {/* </Transition> */}
      </div>
      {/* <Transition animationConfiguration={animationConfiguration}> */}
      <div className="setting_menu  relative  flex flex-col self-center md:self-center   py-8 items-center rounded-[3px]    w-[100%] md:w-[100%] md:h-[30vw] h-[55vh]  mt-7 gap-3">
        <>
          <a
            href="https://amith.vercel.app"
            target="_blank"
            className="cursor-pointer absolute top-48  w-[max-content] text-fontc inline-flex justify-start items-center bg-bgc bg-white  border-2 border-logogreen  gap-1 font-sans rounded  p-2"
          >
            Get in touch with the
            <span className="font-medium text-bg2">Creator </span>
          </a>
        </>
      </div>
      {/* </Transition> */}
    </div>
  );
}
