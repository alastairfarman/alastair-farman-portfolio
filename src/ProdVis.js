import React, { Suspense, useMemo, useState, useRef } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, Sphere, Float } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshStandardMaterial, MeshPhysicalMaterial } from "three";
import { EffectComposer, Noise } from "@react-three/postprocessing";

function Model({ url, frameColor }) {
  const gltf = useLoader(GLTFLoader, url);
  const materials = useRef();

  useMemo(() => {
    materials.current = {
      Plane007: new MeshStandardMaterial({
        color: "white",
        metalness: 1,
        roughness: 0.2,
      }),
      Plane007_1: new MeshPhysicalMaterial({
        color: frameColor,
        transmission: 0.2,
        roughness: 0.3,
      }),
      cross_wire: new MeshStandardMaterial({
        color: "white",
        metalness: 1,
        roughness: 0.2,
      }),
      dots: new MeshStandardMaterial({
        color: "white",
        metalness: 1,
        roughness: 0.2,
      }),
      frame: new MeshPhysicalMaterial({
        color: frameColor,
        transmission: 0.2,
        roughness: 0.2,
      }),
      hardware: new MeshStandardMaterial({
        color: "white",
        metalness: 1,
        roughness: 0.2,
      }),
      hinge: new MeshStandardMaterial({
        color: "white",
        metalness: 1,
        roughness: 0.2,
      }),
      lens: new MeshPhysicalMaterial({
        color: "#CCFF22",
        clearcoat: 1,
        transmission: 0.6,
        roughness: 0,
        ior: 1.8,
        transparent: true,
        depthWrite: false,
        onBeforeCompile: (shader) => {
          shader.fragmentShader = shader.fragmentShader.replace(
            "gl_FragColor = vec4( outgoingLight, diffuseColor.a );",
            "gl_FragColor = vec4( outgoingLight, 1.0 );"
          );
        },
      }),
    };
  }, [frameColor]);

  useFrame(() => {
    if (materials.current) {
      gltf.scene.traverse((child) => {
        if (child.isMesh && materials.current.hasOwnProperty(child.name)) {
          child.material = materials.current[child.name];
          child.material.needsUpdate = true;
        }
      });
    }
  });

  return <primitive object={gltf.scene} dispose={null} />;
}

function ColorSphere({ color, position, onClick }) {
  const meshRef = useRef();
  const { raycaster, camera, mouse } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([meshRef.current]);
      meshRef.current.material.opacity = intersects.length > 0 ? 0.8 : 1;
    }
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e) => {
    document.body.style.cursor = 'auto';
  };

  return (
    <Sphere
      ref={meshRef}
      onClick={onClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      args={[0.2, 32, 32]}
      position={position}
      material={
        new MeshPhysicalMaterial({
          color: color,
          transmission: 0.3,
          roughness: 0.5,
        })
      }
    />
  );
}


export default function ProdVis() {
  const [frameColor, setFrameColor] = useState("black");

  return (
    <div className="section-container" id="reverse">
      <Canvas camera={{ position: [0, 0, 5] }} style={{ padding: "2rem" }}>
        <Suspense fallback={"LOADING"}>
          <Model url="./models/sun2.glb" frameColor={frameColor} />
          <Environment files="./hdr3.hdr" />
        </Suspense>
        <OrbitControls minDistance={4.5} maxDistance={7} />
        <EffectComposer>
          <Noise opacity={0.05} />
        </EffectComposer>
        <Float speed={2} floatIntensity={2}>
          <ColorSphere
            color="black"
            position={[0, 2, 0]}
            onClick={() => setFrameColor("black")}
          />
        </Float>
        <Float speed={2} floatIntensity={2}>
          <ColorSphere
            color="white"
            position={[-2, 2, 0]}
            onClick={() => setFrameColor("white")}
          />
        </Float>
        <Float speed={2} floatIntensity={2}>
          <ColorSphere
            color="#77CCFF"
            position={[2, 2, 0]}
            onClick={() => setFrameColor("#77CCFF")}
          />
        </Float>
      </Canvas>
      <div className="section-content">
        <h2 className="section-title">
          Product Visualisation and Interactivity
        </h2>
        <p>
          With a background in e-commerce retouch and photography, I've
          naturally gravitated towards product visualization. I have experimented with bringing
          3D elements into the browser, using WebGL based frameworks such as Three.js to craft interactive and visually appealing
          experiences. I have also used images and videos rendered in 3D software for more familiar product experiences.
        </p>
      </div>
    </div>
  );
}
