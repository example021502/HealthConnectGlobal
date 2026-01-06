import React, { useRef, useEffect, useState } from "react";
import TopNavBar from "../layouts/Home/TopNavBar";
import MainHomeContent from "../layouts/Home/MainHomeContent";
import Shape from "../common/Shape";
import HomeCards from "../layouts/Home/HomeCards";
import { Outlet, useLocation } from "react-router-dom";
import ImageContent from "../layouts/Home/ImageContent";

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
    <div className={`bg-gradient gap-10 p-10 overflow-y-auto w-full h-dvh`}>
      {isLandingpage ? (
        <>
          <div className="w-full h-fit rounded-lg m-auto backdrop:blur-standard after:absolute relative after:inset-0 after:rounded-lg after:bg-bg-light-white after:top-0 after:left-0 after:z-1 py-10 px-20 flex flex-col items-start justify-center gap-20">
            <span className="fixed -rotate-30 top-20 left-0 w-fit h-fit">
              <Shape />
            </span>
            <div className="z-2 w-full border-b border-white h-full flex flex-col items-center justify-start gap-10">
              <span className="border-b border-secondary pb-2 w-full">
                <TopNavBar />
              </span>
              <MainHomeContent />
            </div>
            <div className="w-full z-2">
              <ImageContent />
            </div>
            <div className={`z-2 w-full border-t border-secondary pt-8`}>
              <HomeCards />
            </div>
          </div>
          <div className="h-2 w-2 rounded-full" ref={BottomBoundaryRef} />
          <div
            className={`z-10000 h-10 w-full transition-all ease-in-out duration-100 ${
              showFooter ? "translate-y-0" : "translate-y-full"
            } fixed bottom-0 text-white text-xs tracking-wider flex items-center justify-center left-0 bg-blue-dark`}
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
