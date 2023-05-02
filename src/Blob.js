import React, {
  useRef,
  useEffect,
  useState,
  Suspense,
  useContext,
} from "react";
import {
  Canvas,
  useFrame,
  useLoader,
  Environment,
  Perlin,
  Vector3,
  TextureLoader,
  DoubleSide,
  SharedGLContext,
} from "./threeInstance.js";

import Modal from "./Modal";

function Sphere() {
  const meshRef = useRef();
  const isReady = useRef(false);
  const originalPositions = useRef([]);
  const sphereRadius = 1;
  const time = useRef(0);

  // Create a Perlin noise object with a random seed
  const noise = Perlin();

  useFrame((state, delta) => {
    if (isReady.current) {
      const positionArray = meshRef.current.geometry.attributes.position.array;
      const vector = new Vector3();

      // Loop through each vertex and modify its position according to Perlin noise
      for (let i = 0; i < positionArray.length; i += 3) {
        const x = positionArray[i];
        const y = positionArray[i + 1];
        const z = positionArray[i + 2];
        const originalX = originalPositions.current[i];
        const originalY = originalPositions.current[i + 1];
        const originalZ = originalPositions.current[i + 2];

        // Calculate the distance from the center of the sphere
        const distanceFromCenter = Math.sqrt(
          Math.pow(x - originalX, 2) +
            Math.pow(y - originalY, 2) +
            Math.pow(z - originalZ, 2)
        );

        // Scale the noise amplitude based on the distance from the center of the sphere
        vector
          .set(x, y, z)
          .multiplyScalar(1)
          .addScalar(Math.sin(time.current * 0.02));

        const noiseValue =
          noise.get3(vector) * 0.2 * (sphereRadius - distanceFromCenter);

        positionArray[i] = originalX + noiseValue;
        positionArray[i + 1] = originalY + noiseValue;
        positionArray[i + 2] = originalZ + noiseValue;
      }

      // Update the vertex positions in the geometry
      meshRef.current.geometry.attributes.position.needsUpdate = true;

      // Increment the time variable
      time.current += 1;
    }
  });

  useEffect(() => {
    const positionArray = meshRef.current.geometry.attributes.position.array;
    for (let i = 0; i < positionArray.length; i += 3) {
      const x = positionArray[i];
      const y = positionArray[i + 1];
      const z = positionArray[i + 2];
      originalPositions.current[i] = x;
      originalPositions.current[i + 1] = y;
      originalPositions.current[i + 2] = z;
    }
    isReady.current = true;
  }, []);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial color={0x00fe00} roughness={0.2} />
    </mesh>
  );
}

function OrbitingPlane({ position, texture, timeOffset, onClick }) {
  const meshRef = useRef();
  const material = useLoader(TextureLoader, texture);

  const [isHovered, setIsHovered] = useState(false);

  useFrame((state, delta) => {
    const sphereRadius = 0.4;
    const spherePosition = meshRef.current.parent.position;
    const elapsedTime = state.clock.elapsedTime;
    const rotationSpeed = 0.2; // Change this value to adjust the rotation speed

    const planePosition = new Vector3();
    planePosition.copy(position);
    planePosition.applyAxisAngle(
      new Vector3(0, 1, 0),
      (elapsedTime * rotationSpeed + timeOffset) % (Math.PI * 2)
    );

    planePosition.multiplyScalar(sphereRadius);
    planePosition.add(spherePosition);

    meshRef.current.position.copy(planePosition);
  });

  useEffect(() => {
    document.body.style.cursor = isHovered ? "pointer" : "auto";
  }, [isHovered]);

  return (
    <mesh
      ref={meshRef}
      onClick={onClick}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <planeGeometry args={[material.image.width / material.image.height, 1]} />
      <meshStandardMaterial
        map={material}
        metalness={0.2}
        side={DoubleSide}
        roughness={0.1}
        style={{ cursor: "pointer" }}
      />
    </mesh>
  );
}

function Blob() {
  const { sharedGLContext, setSharedGLContext } = useContext(SharedGLContext);

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
    <>
      <Suspense fallback="Loading...">
        <Canvas style={{ flex: 2 }} onCreated={onCreated}>
          <ambientLight intensity={0.8} />
          <Environment files="./hdr.hdr" />
          <Sphere />
          <OrbitingPlane
            position={new Vector3(5, 0, 0)}
            texture="./img/wcd.jpg"
            timeOffset={0}
            onClick={() => {
              setIsModalOpen(true);
              setModalContent([
                "Calorie Deficit Calculator",
                "Comissioned by Grow With Pace Marketing for Performance Physique, a Midlands based personal training company, the site was built to gain leads for their 4Week4Kilo training program. It guides the user through information on the concept, and encourages them to input form information to calculate the calorie targets they need to lose weight and returns results which they can submit with their details to Performance Physique via Formspark in return for an excercise and nutrition plan. The site was built using React as a one-page scroller with a header that transforms into a form submission element. React Hooks allowed for a smoother, more fluid user experience while also storing the input data form submission. This project is ongoing, with the next feature being an interactive calorie demonstration built in p5.js that uses the data from the BMI calculation to display an interactive graph which suggests how the user can plan a daily calorie intake while limiting the total calories for the week. While it is currently fully functional, the best implementation for UX hasn't currently been decided.",
                "./img/wcd1.png",
                "./img/wcd2.webm",
                "https://weeklycaloriedeficit.com/",
              ]);
            }}
          />
          <OrbitingPlane
            position={new Vector3(5, 0, 0)}
            texture="./img/af.png"
            timeOffset={(Math.PI * 2 * 1) / 5}
            onClick={() => {
              setIsModalOpen(true);
              setModalContent([
                "Portfolio",
                "As part of my web development learning journey I have designed and built portfolios to practice and experiment with, including this previous version of my work earlier this year.",
                "./img/af1.png",
                "./img/flower.mov",
                "https://alastairfarman.github.io/AF3/",
              ]);
            }}
          />
          <OrbitingPlane
            position={new Vector3(5, 0, 0)}
            texture="./img/golf.png"
            timeOffset={(Math.PI * 2 * 2) / 5}
            onClick={() => {
              setIsModalOpen(true);
              setModalContent([
                "Golfstore",
                "A work in progress design, advisory and build for a new golf brand retailer. I researched potential headless CMS providers to allow the owner to manage their own content and take advantage of seamless checkout and payment features while giving me powerful customisation options. I have designed a preliminary look in Figma.",
                "./img/golffig.png",
              ]);
            }}
          />
          <OrbitingPlane
            position={new Vector3(5, 0, 0)}
            texture="./img/afrtp.png"
            timeOffset={(Math.PI * 2 * 3) / 5}
            onClick={() => {
              setIsModalOpen(true);
              setModalContent([
                "Retouch & Photography Portfolio",
                "In order to separate my retouching and photography work from my web development work, I created an alternate simple image gallery portfolio.",
                "./img/afrtp1.png",
                "",
                "https://alastairfarman.github.io/af-retouch-photography/",
              ]);
            }}
          />
          <OrbitingPlane
            position={new Vector3(5, 0, 0)}
            texture="./img/ar.png"
            timeOffset={(Math.PI * 2 * 4) / 5}
            onClick={() => {
              // Add onClick logic for the new plane
            }}
          />
        </Canvas>
        <Modal
          isOpen={isModalOpen}
          content={modalContent}
          setIsModalOpen={setIsModalOpen}
        />
      </Suspense>
    </>
  );
}

export default Blob;
