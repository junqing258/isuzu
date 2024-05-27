import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

import logo from "../../assets/logo.svg";

import "./index.scss";

export default function Page2() {
  const page = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".pg2-container", {
        translateY: "-100%",
        scrollTrigger: {
          trigger: ".placeholder",
          start: "top center",
          scrub: true,
        },
      });
    },
    { scope: page }
  );

  return (
    <div ref={page} className="page2">
      <div className="pg2-container">
        <header className="header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Vite + React</h1>
        </header>
        <div className="box absolute w-20 h-20 top-50 rounded-full bg-green-500"></div>
      </div>
    </div>
  );
}
