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
        onLeave: () => {
          console.log("onLeave");
          goToSection(1);
        },
        onEnterBack: () => {
          console.log("onEnterBack");
          goToSection(0);
        },
        onLeaveBack: () => {
          console.log("onLeaveBack");
          // goToSection(0);
        },
      });

      let panels = gsap.utils.toArray(".page") as any[];

      let index = window.scrollY < window.innerHeight / 2 ? 0 : 1;
      function goToSection(i: any) {
        console.log("goToSection", i);
        // if (i === index) return;
        gsap.to(window, {
          scrollTo: { y: panels[i], autoKill: false },
          onComplete: () => {
            index = i;
          },
        });
      }

      /* ScrollTrigger.create({
        trigger: panels[1],
        onEnter: () => {
          goToSection(1);
        },
      });

      ScrollTrigger.create({
        trigger: panels[0],
        start: "bottom bottom",
        onEnterBack: (self) => {
          goToSection(0);
        },
      }); */
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
            <p className="starwars">As I Walked Out One Evening</p>
            <p className="starwars">I'll love you, dear, I'll love you</p>
            <p className="starwars">Till China and Africa meet,</p>
            <p className="starwars">And the river jumps over the mountain</p>
            <p className="starwars">And the salmon sing in the street,</p>
            <p className="starwars">I'll love you till the ocean</p>
            <p className="starwars">Is folded and hung up to dry</p>
            <p className="starwars">And the seven stars go squawking</p>
            <p className="starwars">Like geese about the sky.</p>
            <p className="starwars">The years shall run like rabbits,</p>
            <p className="starwars">For in my arms I hold</p>
            <p className="starwars">The Flower of the Ages,</p>
            <p className="starwars">And the first love of the world.</p>
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
