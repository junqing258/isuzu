import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { useWindowSize } from "react-use";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRect } from "../../utils/useRect";
import logo from "../../assets/logo.svg";
import gsap from "gsap";

import "./index.scss";

export default function Page1() {
  const wrap = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const { width, height } = useWindowSize();

  const { height: contentHeight } = useRect(content);

  const top = 100;

  useEffect(() => {
    const rate = 1920 / 1080;
    const video = document.getElementById("my-player") as HTMLVideoElement;
    if (!video) return;
    if (width / height > rate) {
      video.width = width;
      video.height = width / rate;
    } else {
      video.height = height;
      video.width = height * rate;
    }
  }, [width, height]);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".starwars") as HTMLElement[];
      function updateProgress(progress: number) {
        console.log(progress);
        items.forEach((item, i) => {
          item.style.opacity = `${1 - Math.abs(i - progress * items.length)}`;
          item.style.transform = `scale(${
            1 - Math.abs(i - progress * items.length) * 0.2
          }) translateY(${(i - progress * items.length) * 200}%)`;
        });
      }
      updateProgress(0);

      ScrollTrigger.create({
        trigger: ".content",
        onUpdate: (self) => {
          updateProgress(self.progress);
        },
      });

      let panels = gsap.utils.toArray(".page") as any[];

      let index = 0;
      function goToSection(i: any) {
        if (i === index) return;
        gsap.to(window, {
          scrollTo: { y: panels[i], autoKill: false },
          onComplete: () => {
            index = i;
          },
        });
      }

      ScrollTrigger.create({
        trigger: panels[1],
        // markers: true,
        onEnter: () => {
          goToSection(1);
        },
      });

      ScrollTrigger.create({
        trigger: panels[0],
        start: "bottom bottom",
        // markers: true,
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
            <video className="video-js" id="my-player" autoPlay muted loop>
              <source
                src="https://md-1301452398.cos.ap-nanjing.myqcloud.com/video/717.mp4"
                type="video/mp4"
              ></source>
            </video>
          </div>

          <div ref={content} className="starwars-container text-white">
            <p className="starwars">Vite + React + TailwindCSS</p>
            <p className="starwars">Vite + React + TailwindCSS</p>
            <p className="starwars">Vite + React + TailwindCSS</p>
            <p className="starwars">Vite + React + TailwindCSS</p>
            <p className="starwars">Vite + React + TailwindCSS</p>
            <p className="starwars">Vite + React + TailwindCSS</p>
            <p className="starwars">Vite + React + TailwindCSS</p>
            <p className="starwars">Vite + React + TailwindCSS</p>
            <p className="starwars">Vite + React + TailwindCSS</p>
            <p className="starwars">Vite + React + TailwindCSS</p>
            <p className="starwars">Vite + React + TailwindCSS</p>
            <p className="starwars">Vite + React + TailwindCSS</p>
            <p className="starwars">Vite + React + TailwindCSS</p>
            <p className="starwars">Vite + React + TailwindCSS</p>
            <p className="starwars">Vite + React + TailwindCSS</p>
            <p className="starwars">Vite + React + TailwindCSS</p>
            <p className="starwars">Vite + React + TailwindCSS</p>
            <p className="starwars">Vite + React + TailwindCSS</p>
          </div>
        </div>

        <div style={{ height: contentHeight }}></div>
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
