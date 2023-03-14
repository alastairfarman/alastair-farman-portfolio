import { useEffect, useState } from "react";

export default function Title() {
  const [alastairWeight, setAlastairWeight] = useState(100);
  const [farmanWeight, setFarmanWeight] = useState(800);

  useEffect(() => {
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

      if (alastair && farman) {
        const translateX = (scrollPosition / (windowHeight / 2)) * 400;
        alastair.style.transform = `translateX(${translateX}px)`;
        farman.style.transform = `translateX(${-translateX}px)`;
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
        style={{ backgroundColor: "#131313", flexDirection: "column" }}
      >
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
          <h2 className="title">Frontend Web Developer and 3D Artist</h2>
        </div>
      </div>
    </>
  );
}
