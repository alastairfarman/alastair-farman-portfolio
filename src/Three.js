import React, { useEffect, Suspense } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Float } from "@react-three/drei";
import { TextureLoader, Fog } from "./threeInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";

const ImageStack = ({ position, images }) => {
  const offset = 0.1;
  const zOffset = -0.05;

  const textures = useLoader(TextureLoader, images);

  return (
    <group position={position}>
      {textures.map((texture, index) => {
        const aspectRatio = texture.image.width / texture.image.height;
        return (
          <Float key={index} rotationIntensity={0}>
            <mesh
              key={index}
              position={[offset * index, offset * index, zOffset * index]}
            >
              <planeGeometry args={[aspectRatio, 1]} />
              <meshStandardMaterial map={texture} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
};

const FogWrapper = ({ color, near, far }) => {
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new Fog(color, near, far);
    return () => {
      scene.fog = null;
    };
  }, [color, near, far, scene]);

  return null;
};

export default function Three() {
  const stack1 = Array.from(
    { length: 3 },
    (_, i) => `./img/stack1-${i + 1}.jpg`
  );
  const stack2 = Array.from(
    { length: 4 },
    (_, i) => `./img/stack2-${i + 1}.png`
  );
  const stack3 = Array.from(
    { length: 4 },
    (_, i) => `./img/stack3-${i + 1}.png`
  );

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
        }}>
        <video
          style={{
            width: "100%",
            maxWidth: "500px",
            filter: "brightness(1.5)",
          }}
          muted
          autoPlay
          loop
        >
         
          <source src="./img/kickflip-tr.webm" />
        </video>
        </div>
      </div>
      <Suspense fallback="Loading...">
        <Canvas style={{ flex: "2" }}>
          <ambientLight />
          <pointLight position={[1, 10, 5]} />
          <PerspectiveCamera makeDefault position={[0, 0, 6]} />
          <ImageStack position={[0, 0, 0]} images={stack2} />
          <ImageStack position={[-1, 1.5, 0]} images={stack1} />
          <ImageStack position={[1, 1.5, 0]} images={stack3} />
          <ImageStack position={[-1, -1.5, 0]} images={stack1} />
          <ImageStack position={[1, -1.5, 0]} images={stack3} />
          <FogWrapper color={0xe0e7ee} near={6} far={6.2} />
        </Canvas>
      </Suspense>
      <FontAwesomeIcon icon={faHandPointer} className="interact r fa-bounce" />
    </div>
  );
}
