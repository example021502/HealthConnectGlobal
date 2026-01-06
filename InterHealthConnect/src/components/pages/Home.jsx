import React, { useRef, useEffect, useState } from "react";
import TopNavBar from "../layouts/Home/TopNavBar";
import HomeCards from "../layouts/Home/HomeCards";
import { Outlet, useLocation } from "react-router-dom";
import ImageContent from "../layouts/Home/ImageContent";
import Image from "../common/Image";
import Content from "../layouts/Home/Content";
import Label from "../common/Label";

function Home() {
  const BottomBoundaryRef = useRef(null);
  const [showFooter, setShowFooter] = useState(false);
  const location = useLocation();
  const isLandingpage = location.pathname === "/";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setShowFooter(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (BottomBoundaryRef.current) {
      observer.observe(BottomBoundaryRef.current);
    }
    return () => {
      if (BottomBoundaryRef.current)
        observer.unobserve(BottomBoundaryRef.current);
    };
  }, []);

  return (
    <div className={`bg-b_green overflow-y-auto w-full h-dvh text-white`}>
      {isLandingpage ? (
        <>
          <div className="w-full h-fit backdrop:blur-standard flex flex-col items-start justify-center">
            <div className="z-2 relative bg-b_green shadow-xl p-8 w-full h-160 flex flex-col items-center justify-start gap-10">
              <TopNavBar />
              <div className="absolute flex flex-row z-2 h-50 left-8 right-8 rounded-standard bg-green_light shadow-xl top-40">
                <span className="w-3/6 rounded-standard relative h-full ml-auto after:absolute after:bg-g_green1 after:left-0 after:inset-0">
                  <Image
                    imgLink="https://i.ibb.co/Nd4pHLCV/bg.jpg"
                    alt=""
                    class_name="h-full w-fit ml-auto object-contain rounded-standard"
                  />
                </span>
              </div>

              <Content />
            </div>
            <div className="w-full relative z-2 shadow-inner1 p-8 flex flex-col gap-8 items-center justify-center">
              <Label text="Objectives" class_name="font-semibold text-3xl" />
              <ImageContent />
              <Image
                imgLink="https://i.ibb.co/ZRb096d7/0e7ff19cd517b519ff2be518fa3ac553-removebg-preview-1.png"
                class_name="absolute h-full opacity-20 w-3/5 bottom-0 right-8 z-1 object-contain"
              />
            </div>
            <div className={`z-2 w-full pt-8 mb-10`}>
              <HomeCards />
            </div>
          </div>
          <div className="h-2 w-2 rounded-full" ref={BottomBoundaryRef} />
          <div
            className={`z-10000 h-10 w-full transition-all ease-in-out duration-100 ${
              showFooter ? "translate-y-0" : "translate-y-full"
            } fixed bottom-0  text-xs tracking-wider flex items-center justify-center left-0 bg-b_green`}
          >
            <p>Copyright © InterHealthConnect all right preserved.</p>
          </div>
        </>
      ) : (
        <main>
          <Outlet />
        </main>
      )}
    </div>
  );
}

export default Home;
