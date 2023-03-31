import React, {
  Suspense,
  useRef,
  useEffect,
  useState,
  useContext,
} from "react";
import {
  Canvas,
  useFrame,
  useLoader,
  Environment,
  GLTFLoader,
  Vector3,
  MeshStandardMaterial,
  SharedGLContext,
} from "./threeInstance.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";
import ModalImage from "./ModalImage";

function SpinningNum({ num, position, onClick }) {
  const mesh = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    num.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new MeshStandardMaterial({
          color: 0x00fe00,
          roughness: 0.2,
        });
      }
    });

    // Set a random initial rotation
    const randomRotationY = Math.random() * Math.PI * 2;
    mesh.current.rotation.y = randomRotationY;
  }, [num]);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
    }
  });

  useEffect(() => {
    document.body.style.cursor = isHovered ? "pointer" : "auto";
  }, [isHovered]);

  return (
    <primitive
      object={num.scene}
      ref={mesh}
      position={position}
      scale={3}
      onClick={onClick}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    />
  );
}

export default function Three2() {
  const { sharedGLContext, setSharedGLContext } = useContext(SharedGLContext);

  const one = useLoader(GLTFLoader, "./models/one.glb");
  const two = useLoader(GLTFLoader, "./models/two.glb");
  const three = useLoader(GLTFLoader, "./models/three.glb");
  const four = useLoader(GLTFLoader, "./models/four.glb");
  const five = useLoader(GLTFLoader, "./models/five.glb");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  const onCreated = ({ gl }) => {
    if (!sharedGLContext) {
      setSharedGLContext(gl.context);
    } else {
      gl.context = sharedGLContext;
    }
  };

  return (
    <div className="section-container" id="rendering-animation">
      <div className="section-content">
        <h2 className="section-title">3D Rendering & Animation</h2>
        <p>
          Primarily using Blender, but also applying the fundamentals to other
          3D software, I have developed modelling, texturing and animation
          skills along side my lighting experience from the photography
          industry. I am interested in photorealism, and also enjoy
          incorporating subtle animation and physics sims, as well as
          experimenting with geometry nodes.
        </p>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <video
            style={{
              width: "100%",
              maxWidth: "500px",
              filter: "brightness(1.4)",
            }}
            muted
            autoPlay
            loop
            playsInline
          >
            <source
              src="./img/kickflip-tr.mp4"
              type={`video/mp4; codecs="hvc1"`}
            />
            <source src="./img/kickflip-tr.webm" type="video/webm" />
          </video>
        </div>
      </div>
      <Suspense fallback="Loading...">
        <Canvas style={{ flex: "2" }} onCreated={onCreated}>
          <ambientLight intensity={0.6} />
          <Environment files="./hdr.hdr" />
          <SpinningNum
            num={one}
            position={new Vector3(-1.5, 1.5, 0)}
            onClick={() => {
              setIsModalOpen(true);
              setModalContent([
                "Sunglasses modelling, materials, mimicking studio lighting for e-commerce",
                "./img/renders/sun1.png",
                "./img/renders/sun2.png",
                "./img/renders/sun3.png",
                "./img/renders/sun4.png",
                "./img/renders/sun5.png",
                "./img/renders/sun6.webm",
                "./img/renders/sun7.webm",
                "./img/renders/sun8.mp4",
              ]);
            }}
          />

          <SpinningNum
            num={two}
            position={new Vector3(0, 0, 0)}
            onClick={() => {
              setIsModalOpen(true);
              setModalContent([
                "Bottle modelling, label texturing, liquid sim and refraction/caustics",
                "./img/renders/cc1.png",
                "./img/renders/cc2.png",
                "./img/renders/2.jpg",
                "./img/renders/cc3.png",
                "./img/renders/xray.png",
              ]);
            }}
          />

          <SpinningNum
            num={three}
            position={new Vector3(1.5, 1.5, 0)}
            onClick={() => {
              setIsModalOpen(true);
              setModalContent([
                "Modelling skateboard components, materials and texturing, animation",
                "./img/renders/sk81.png",
                "./img/renders/sk82.png",
                "./img/renders/sk83.png",
                "./img/kickflip-tr.webm",
              ]);
            }}
          />
          <SpinningNum
            num={four}
            position={new Vector3(-1.5, -1.5, 0)}
            onClick={() => {
              setIsModalOpen(true);
              setModalContent([
                "Envrionments - my first few renders exploring features of Blender. Porsche, Rock, Foliage assets from BlenderKit/Quixel.",
                "./img/renders/env1.png",
                "./img/renders/env2.png",
                "./img/renders/env3.png",
                "./img/renders/env4.png",
                "./img/renders/env5.jpg",
                "./img/renders/env6.jpg",
                "./img/renders/env8.png",
                "./img/renders/env9.mp4",
              ]);
            }}
          />

          <SpinningNum
            num={five}
            position={new Vector3(1.5, -1.5, 0)}
            onClick={() => {
              setIsModalOpen(true);
              setModalContent([
                "Other explorations",
                "./img/renders/r5.png",
                "./img/renders/r6.webm",
                "./img/renders/j.webm",
                "./img/renders/r1.png",
                "./img/renders/r2.png",
                "./img/renders/r3.webm",
                "./img/renders/r4.png",
              ]);
            }}
          />
        </Canvas>
      </Suspense>
      <FontAwesomeIcon icon={faHandPointer} className="interact r fa-bounce" />
      <ModalImage
        isOpen={isModalOpen}
        content={modalContent}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
