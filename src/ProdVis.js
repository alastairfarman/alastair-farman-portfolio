import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls, Loader } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Model({ url }) {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} dispose={null} />;
}

export default function ProdVis() {
  return (
    <div className="section-container">
      <div style={{ flex: 2 }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <Model url="./models/sun.glb" />
            <Environment files="./hdr.hdr" />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>

      <div className="section-content">
        <h2 className="section-title">
          Product visualisation and interactivity
        </h2>
        <p>
          Some of the things I have done involve products and how they are
          portrayed on the web. I have combined 3D with the web do stuff in the
          browser. This includes alpha video, frameworks like three.js and
          WebGL, Processing (p5.js) and so on.
        </p>
      </div>
    </div>
  );
}
