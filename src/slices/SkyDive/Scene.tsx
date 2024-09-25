import FloatingCan from "@/components/FloatingCan";
import { useGSAP } from "@gsap/react";
import { Content } from "@prismicio/client";
import {
  Cloud,
  Clouds,
  Environment,
  OrbitControls,
  Text,
} from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import * as THREE from "three";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SkyDiveProps = {
  sentence: string | null;
  flavor: Content.SkyDiveSliceDefaultPrimary["flavor"];
};

export default function Scene({ flavor, sentence }: SkyDiveProps) {
  const groupRef = useRef<THREE.Group>(null);
  const canRef = useRef<THREE.Group>(null);
  const cloud1Ref = useRef<THREE.Group>(null);
  const cloud2Ref = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);
  const wordsRef = useRef<THREE.Group>(null);

  const ANGLE = 75 * (Math.PI / 180);

  const getXPosition = (distance: number) => distance * Math.cos(ANGLE);
  const getYPosition = (distance: number) => distance * Math.sin(ANGLE);

  const getXYPositions = (distance: number) => ({
    x: getXPosition(distance),
    y: getYPosition(-1 * distance),
  });

  useGSAP(() => {
    if (
      !groupRef ||
      !canRef ||
      !cloud1Ref ||
      !cloud2Ref ||
      !cloudsRef ||
      !wordsRef
    )
      return;

    gsap.set(cloudsRef.current?.position!, { z: 10 });
    gsap.set(canRef.current?.position!, { ...getXYPositions(-4) });

    wordsRef.current?.children.map((word) => {
      gsap.set(word.position, { ...getXYPositions(7), z: 2 });
    });

    //Spinning can
    gsap.to(canRef.current?.rotation!, {
      y: Math.PI * 2,
      duration: 1.5,
      repeat: -1,
      ease: "none",
    });

    //infinite cloud movement
    const DISTANCE = 15;
    const DURATION = 6;

    gsap.set([cloud2Ref.current?.position!, cloud1Ref.current?.position!], {
      ...getXYPositions(DISTANCE),
    });

    gsap.to(cloud1Ref.current?.position!, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      repeat: -1,
      duration: DURATION,
    });

    gsap.to(cloud2Ref.current?.position!, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      repeat: -1,
      duration: DURATION,
      delay: DURATION / 2,
    });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".skydive",
        pin: true,
        start: "top top",
        end: "+=2000",
        scrub: 1.5,
      },
    });

    scrollTl
      .to("body", {
        backgroundColor: "#C0F0F5",
        overwrite: "auto",
        duration: 0.1,
      })
      .to(cloudsRef.current?.position!, { z: 0, duration: 0.3 }, 0)
      .to(
        canRef.current?.position!,
        { x: 0, y: 0, duration: 0.3, ease: "back.out(1.7)" },
        0,
      );

    wordsRef.current?.children.map((word) => {
      scrollTl.to(word.position, {
        keyframes: [
          { x: 0, y: 0, z: -1 },
          { ...getXYPositions(-7), z: -7 },
        ],
        stagger: 0.3,
      });
    });

    scrollTl
      .to(canRef.current?.position!, {
        ...getXYPositions(4),
        duration: 0.3,
        ease: "back.in(1.7)",
      })
      .to(cloudsRef.current?.position!, {
        z: 7,
        duration: 0.5,
      });
  });

  return (
    <group ref={groupRef}>
      {/**Can */}
      <group rotation={[0, 0, 0.5]}>
        <FloatingCan
          rotationIntensity={0}
          floatIntensity={3}
          floatSpeed={3}
          flavor={flavor}
          ref={canRef}
        >
            <pointLight intensity={60} color={"#8C0413"} decay={0.6}/>
        </FloatingCan>
      </group>

      {/**Clouds */}
      <Clouds ref={cloudsRef}>
        <Cloud ref={cloud1Ref} bounds={[10, 10, 2]} />
        <Cloud ref={cloud2Ref} bounds={[10, 10, 2]} />
      </Clouds>

      {/**Text */}
      <group ref={wordsRef}>
        {sentence && <ThreeText sentence={sentence} color="#F97315" />}
      </group>

      {/**Lighting */}
      <ambientLight intensity={2} color="#9DDEFA" />
      <Environment files="/hdr/field.hdr" environmentIntensity={1.5} />

      {/* <OrbitControls /> */}
    </group>
  );
}

interface ThreeTextProps {
  sentence: string;
  color?: string;
}

const ThreeText: React.FC<ThreeTextProps> = ({ sentence, color }) => {
  const words = sentence.toUpperCase().split(" ");
  const material = new THREE.MeshLambertMaterial();
  const isDesktop = useMediaQuery({ query: "(min-width: 950px)" });

  return words.map((word, wordIndex) => (
    <Text
      key={`${wordIndex}-${word}`}
      scale={isDesktop ? 1 : 0.5}
      color={color}
      material={material}
      font="/fonts/Alpino-Variable.woff"
      fontWeight={900}
      anchorX={"center"}
      anchorY={"middle"}
      characters="ABCDEFGHIJKLMONPQRSTUVWXYZ!,.?'"
    >
      {word}
    </Text>
  ));
};
