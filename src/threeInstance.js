import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, Sphere, Float } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createNoise3D } from "simplex-noise";

const Perlin = () => {
  const noise3D = createNoise3D(Math.random);
  return {
    get3: (vector) => noise3D(vector.x / 2, vector.y / 2, vector.z / 2),
  };
};

const {
  Vector3,
  TextureLoader,
  DoubleSide,
  Fog,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
} = THREE;

export {
  THREE,
  Canvas,
  useFrame,
  useLoader,
  useThree,
  Environment,
  OrbitControls,
  Sphere,
  Float,
  GLTFLoader,
  Perlin,
  Vector3,
  TextureLoader,
  DoubleSide,
  Fog,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
};
