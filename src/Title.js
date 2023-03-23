import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Title() {
  const [alastairWeight, setAlastairWeight] = useState(100);
  const [farmanWeight, setFarmanWeight] = useState(800);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const hoverTimeout = useRef(null);

  const handleMouseEnter = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    setIsMenuHovered(true);
    document.getElementById("menu").style.transform = "translateX(0)";
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      document.getElementById("menu").style.transform = "translateX(110%)";
    }, 300);
  };

  useEffect(() => {
    const menuElement = document.getElementById("menu");
    if (isMenuHovered) {
      menuElement.style.transform = "translateX(0)";
    } else {
      menuElement.style.transform = "translateX(110%)";
    }
  }, [isMenuHovered]);

  const handleClick = () => {
    if (!isMenuHovered) {
      setIsMenuHovered(true);
    }
  };

  // const isIOS =
  //   /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  useEffect(() => {
    // test if scroll effect is causing iOs/Safari to crash. Confirmation that it isn't, but leaving this code in for future reference.

    // if (isIOS) {
    //   // Return early if the device is an iOS device
    //   console.log("iOS device detected.")
    //   return;
    // }

    // console.log("Non-iOS device detected.")

    const root = document.getElementById("root");

    const handleScroll = () => {
      const scrollPosition = root.scrollTop;
      const windowHeight = window.innerHeight;

      // Calculate Alastair's weight variation
      const alastairVariation = Math.min(
        800,
        Math.max(100, (scrollPosition / (windowHeight / 3)) * 800 + 100)
      );
      setAlastairWeight(parseInt(alastairVariation));

      // Calculate Farman's weight variation
      const farmanVariation = Math.max(
        100,
        Math.min(800, 1000 - (scrollPosition / (windowHeight / 3)) * 800)
      );
      setFarmanWeight(parseInt(farmanVariation));

      const alastair = document.getElementById("Alastair");
      const farman = document.getElementById("Farman");
      const title = document.querySelector(".title");

      if (alastair && farman && title) {
        const translateX = (scrollPosition / (windowHeight / 2)) * 400;
        alastair.style.transform = `translateX(${translateX}px)`;
        farman.style.transform = `translateX(${-translateX}px)`;

        const titleTranslateX = (scrollPosition / (windowHeight / 2)) * -200;
        title.style.transform = `translateX(${titleTranslateX}px)`;
      }
    };

    root.addEventListener("scroll", handleScroll);

    // Clean up event listener on unmount
    return () => {
      root.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <div
        className="section-container"
        id="title"
        style={{ flexDirection: "column", position: "relative" }}
      >
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 10,
            cursor: "pointer",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faBars} size="2x" color="#e0e7ee" />
        </div>

        <div
          id="menu"
          style={{
            position: "absolute",
            top: "5rem",
            right: "1rem",
            zIndex: 3,
            textAlign: "right",
            padding: "1rem",
            borderRadius: "5px",
            display: isMenuHovered ? "flex" : "none",
            flexDirection: "column",
            gap: "0.5rem",
            transition: "transform 0.3s ease-in-out",
            transform: "translateX(110%)",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <a
            href="#web-development-design"
            style={{
              color: "#e0e7ee",
              textDecoration: "none",
              animation: "slide-in-left 0.5s ease-in-out",
            }}
          >
            Web Development & Design
          </a>
          <br />
          <a
            href="#product-visualization-interactivity"
            style={{
              color: "#e0e7ee",
              textDecoration: "none",
              animation: "slide-in-left 0.5s ease-in-out",
            }}
          >
            Product Visualisation & Interactivity
          </a>
          <br />
          <a
            href="#rendering-animation"
            style={{
              color: "#e0e7ee",
              textDecoration: "none",
              animation: "slide-in-left 0.5s ease-in-out",
            }}
          >
            Rendering & Animation
          </a>
          <br />
          <a
            href="#information-and-contact"
            style={{
              color: "#e0e7ee",
              textDecoration: "none",
              animation: "slide-in-left 0.5s ease-in-out",
            }}
          >
            Information & Contact
          </a>
        </div>

        <video
          id="fabric-video"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: 0,
            left: 0,
            transform: "scaleX(-1)",
            zIndex: "1",
          }}
        >
          <source src="./img/fabric.mp4" type={`video/mp4; codecs="hvc1"`} />
          <source src="./img/fabric.webm" type="video/webm" />
        </video>

        <div id="grid-title">
          <h1
            className="name"
            id="Alastair"
            style={{ fontVariationSettings: `"wght" ${alastairWeight}` }}
          >
            Alastair
          </h1>
          <h1
            className="name"
            id="Farman"
            style={{ fontVariationSettings: `"wght" ${farmanWeight}` }}
          >
            Farman
          </h1>
          <h2 className="title" style={{ zIndex: "0" }}>
            Frontend Web Developer and 3D Artist
          </h2>
        </div>
      </div>
    </>
  );
}
