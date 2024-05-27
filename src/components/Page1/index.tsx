import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { useWindowSize } from "react-use";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../../assets/logo.svg";
import gsap from "gsap";

import "./index.scss";

export default function Page1() {
  const wrap = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowSize();

  /* useEffect(() => {
    const rate = 1920 / 1080;
    const video = document.getElementById("my-player") as HTMLVideoElement;
    if (width / height > rate) {
      video.width = width;
      video.height = width / rate;
    } else {
      video.height = height;
      video.width = height * rate;
    }
  }, [width, height]); */

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

      let panels = gsap.utils.toArray(".page") as any[];

      let index = 0;
      function goToSection(_index: any) {
        if (_index === index) return;
        gsap.to(window, {
          scrollTo: { y: panels[_index], autoKill: false },
          onComplete: () => {
            index = _index;
          },
        });
      }

      ScrollTrigger.create({
        trigger: panels[1],
        markers: true,
        onEnter: () => {
          goToSection(1);
        },
      });

      ScrollTrigger.create({
        trigger: panels[0],
        start: "bottom bottom",
        markers: true,
        onEnterBack: (self) => {
          goToSection(0);
        },
      });
    },
    { scope: wrap }
  );

  return (
    <div ref={wrap}>
      <div className="page page1">
        <div className="content">
          <div className="bg">
            {/* <video className="video-js" id="my-player" autoPlay muted loop>
            <source
              src="https://md-1301452398.cos.ap-nanjing.myqcloud.com/video/717.mp4"
              type="video/mp4"
            ></source>
          </video> */}
          </div>

          <div className="list text-white">
            <p className="starwars">Vite + React + TailwindCSS</p>
            <p className="starwars">Vite + React + TailwindCSS</p>
            <p className="starwars">Vite + React + TailwindCSS</p>
          </div>
        </div>
        <div className="placeholder"></div>
      </div>

      <div className="page page2">
        <header className="header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Vite + React</h1>
        </header>
      </div>
    </div>
  );
}
