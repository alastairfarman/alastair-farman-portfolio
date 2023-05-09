export default function About() {
  return (
    <div
      className="section-container"
      id="information-and-contact"
      style={{
        backgroundColor: "#131313",
        color: "#e0e7ee",
        scrollSnapAlign: "start",
      }}
    >
      <div className="about-grid">
        <div className="about-section">
          <h3 className="about-section-title">About</h3>
          <p>
            As a retoucher and photographer with over 10 years experience in the
            e-commerce and fashion industry, I began to explore different career
            paths during the pandemic lockdown. I started learning the
            fundamentals of 3D, and before briefly flirting with UX design I
            found web development, starting The Odin Project's full stack
            curriculum in June 2022. Since then I have compounded on the basics
            I learned by exploring different facets of development, with the
            idea of incorporating my previous experience into my new career
            path. I'm currently investigating the implementation of NeRFs and I
            also keep an eye on the development of AI to leverage its potential
            and prolong my inevitable replacement.
            <br />
            <br />
            Outside of my professional life I'm an amateur footballer,
            snowboarder and have recently discovered yoga.
          </p>
        </div>
        <div className="about-section">
          <h3 className="about-section-title">Other Project Links</h3>
          <ul>
            <li>
              <a
                href="https://alastairfarman.github.io/NeRF-Test/"
                target="_blank"
                rel="noreferrer"
                title="Opens in a new tab"
              >
                An ongoing blog of my research into NeRFs and Photogrammetry
              </a>
            </li>
            <li>
              <a
                href="https://alastairfarman.github.io/af-retouch-photography/"
                target="_blank"
                rel="noreferrer"
                title="Opens in a new tab"
              >
                Alastair Farman - Retouch & Photography Portfolio
              </a>
            </li>
            <li>
              <a
                href="https://alastairfarman.github.io/soccerball/"
                target="_blank"
                rel="noreferrer"
                title="Opens in a new tab"
              >
                Soccerball - device motion experiment
              </a>
            </li>
            <li>
              <a
                href="https://alastairfarman.github.io/bmw/"
                target="_blank"
                rel="noreferrer"
                title="Opens in a new tab"
              >
                BMW - an interactive scene in Three.js experiment
              </a>
            </li>
            <li>
              <a
                href="https://alastairfarman.github.io/not-a-porter/"
                target="_blank"
                rel="noreferrer"
                title="Opens in a new tab"
              >
                A 'Net-A-Porter.com' clone pulling data from a JSON file, with
                sort and filter functions
              </a>
            </li>
            <li>
              <a
                href="https://alastairfarman.github.io/bearbrick-jstest/"
                target="_blank"
                rel="noreferrer"
                title="Opens in a new tab"
              >
                BE@RBRICK product selector, playing with scroll animations and
                useState
              </a>
            </li>
            <li>
              <a
                href="https://codepen.io/alastairfarman/pen/dyqbQKm"
                target="_blank"
                rel="noreferrer"
                title="Opens in a new tab"
              >
                Playing with noise and colour in p5.js
              </a>
            </li>
          </ul>
        </div>
        <div className="about-section">
          <h3 className="about-section-title">
            Software, Languages & Frameworks
          </h3>
          <ul>
            <li>HTML, CSS, Javascript</li>
            <li>React, Three.js</li>
            <li>
              Adobe Creative Suite - Photoshop, Lightroom, Bridge & working
              knowledge of Premiere, After Effects, InDesign, Illustrator
            </li>
            <li>CaptureOne</li>
            <li>Figma</li>
            <li>3D Software - Blender and some experience with Cinema4D</li>
            <li>Game engines - familiarity with Unity and Unreal 5</li>
          </ul>
        </div>
        <div className="about-section">
          <h3 className="about-section-title">Contact Information</h3>
          <div className="contact-container">
            <ul>
              <li>
                <a href="mailto:info@alastairfarman.com">Email</a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/alastairfarman/"
                  target="_blank"
                  rel="noreferrer"
                  title="Opens in a new tab"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="./AlastairFarman-WebDeveloper3DGeneralistRetoucherPhotographer-CV.pdf">
                  CV
                </a>
              </li>
              <li>
                <a
                  href="https://www.github.com/alastairfarman/"
                  target="_blank"
                  rel="noreferrer"
                  title="Opens in a new tab"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "260px",
          position: "absolute",
          bottom: "0",
          right: "0",
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div style={{ margin: "none" }}>© 2023 Alastair Farman</div>
        <img
          src="./img/me.png"
          alt=""
          style={{ width: "75px", height: "75px" }}
        />
      </div>
    </div>
  );
}
