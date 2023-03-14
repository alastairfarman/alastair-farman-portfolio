import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Perlin } from "three-noise";
import { TextureLoader } from "three";
import * as THREE from "three";
import { Environment } from "@react-three/drei";

import Modal from "./Modal";

function Sphere() {
  const meshRef = useRef();
  const isReady = useRef(false);
  const originalPositions = useRef([]);
  const sphereRadius = 1;
  const time = useRef(0);

  // Create a Perlin noise object with a random seed
  const noise = new Perlin(Math.random());

  useFrame((state, delta) => {
    if (isReady.current) {
      const positionArray = meshRef.current.geometry.attributes.position.array;

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
        const noiseValue =
          noise.get3(
            new THREE.Vector3(x, y, z)
              .multiplyScalar(1)
              .addScalar(time.current * 0.005)
          ) *
          0.2 *
          (sphereRadius - distanceFromCenter);

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
      <sphereGeometry args={[1.5, 128, 128]} />
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

    const planePosition = new THREE.Vector3();
    planePosition.copy(position);
    planePosition.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
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
        side={THREE.DoubleSide}
        roughness={0.1}
        style={{ cursor: "pointer" }}
      />
    </mesh>
  );
}

function Blob() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  return (
    <>
      <Canvas style={{ flex: 2 }}>
        <ambientLight intensity={0.8} />
        <Environment files="./hdr.hdr" />
        <Sphere />
        <OrbitingPlane
          position={new THREE.Vector3(5, 0, 0)}
          texture="./img/wcd.png"
          timeOffset={0}
          onClick={() => {
            setIsModalOpen(true);
            setModalContent([
              "Calorie Deficit Calculator",
              "Comissioned by Grow With Pace Marketing for Performance Physique, a Midlands based personal training company, the site was built to gain leads for their 4Week4Kilo training program. It guides the user through information on the concept, and encourages them to input form information to calculate the calorie targets thye need to lose weight and submit their results and details to Performance Physique in return for an excercise and nutrition plan. The site was built using React as a one-page scroller with a header that transforms into a form submission element. React Hooks allowed for a smoother, more fluid user experience while also storing the input data form submission. This site is still in development, with the next feature being a P5 built interactive calorie demonstration that uses the data from the BMI calculation to display a graph which suggests how the user can plan a daily calorie intake while limiting the total calories for the week. While it is currently fully functional, the best implementation for user experience hasn't currently been decided.",
            ]);
          }}
        />
        <OrbitingPlane
          position={new THREE.Vector3(5, 0, 0)}
          texture="./img/wcd.png"
          timeOffset={(Math.PI * 2) / 3}
          onClick={() => {
            setIsModalOpen(true);
            setModalContent(["Second One", "Content for plane 2"]);
          }}
        />
        <OrbitingPlane
          position={new THREE.Vector3(5, 0, 0)}
          texture="./img/wcd.png"
          timeOffset={(Math.PI * 4) / 3}
          onClick={() => {
            setIsModalOpen(true);
            setModalContent(["Third One", "Content for plane 3"]);
          }}
        />
      </Canvas>
      <Modal
        isOpen={isModalOpen}
        content={modalContent}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}

export default Blob;
