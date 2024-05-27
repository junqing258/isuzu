import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { useWindowSize } from "react-use";
import gsap from "gsap";

import "./index.scss";

export default function Page1() {
  const page = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const rate = 1920 / 1080;
    const video = document.getElementById("my-player") as HTMLVideoElement;
    if (width / height > rate) {
      video.width = width;
      video.height = width / rate;
    } else {
      video.height = height;
      video.width = height * rate;
    }
  }, [width, height]);

  console.log(width, height);

  useGSAP(
    () => {
      gsap.to(".starwars", {
        keyframes: {
          scale: [0.8, 1, 1.4],
          opacity: [0, 1, 0],
          translateY: ["100%", "0", "-200%"],
        },
        stagger: 0.1,
        scrollTrigger: {
          // target: document.getElementById("page1Content") as HTMLElement,
          start: "top center", // when the top of the trigger hits the center of the viewport
          scrub: true,
        },
      });
    },
    { scope: page }
  );

  return (
    <div ref={page} className="page1">
      <div className="pg-container">
        <div className="bg">
          <video className="video-js" id="my-player" autoPlay muted loop>
            <source
              src="https://md-1301452398.cos.ap-nanjing.myqcloud.com/video/717.mp4"
              type="video/mp4"
            ></source>
          </video>
        </div>

        <div id="page1Content" className="content text-white">
          <p className="starwars">Vite + React + TailwindCSS</p>
          <p className="starwars">Vite + React + TailwindCSS</p>
          <p className="starwars">Vite + React + TailwindCSS</p>
        </div>
      </div>
      <div className="placeholder"></div>
    </div>
  );
}
