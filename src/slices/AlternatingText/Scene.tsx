"use client";
import FloatingCan from "@/components/FloatingCan";
import { useGSAP } from "@gsap/react";
import { Environment, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Group } from "three";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {};

export default function Scene({}: Props) {
  const canRef = useRef<Group>(null);
  const bgColors = ["#FFA6B5", "#E9CFF6", "#CBEF9A"];
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  useGSAP(
    () => {
      if (!canRef.current) return;

      const sections = gsap.utils.toArray(".alternating-section");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".alternating-text-view",
          endTrigger: ".alternating-text-container",
          pin: true,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      sections.forEach((_, index) => {
        if (!canRef.current) return;
        if (index === 0) return;

        const isOdd = index % 2 !== 0;
        const xPosition = isDesktop ? (isOdd ? -1 : 1) : 0;
        const yRotation = isDesktop ? (isOdd ? 0.4 : -0.4) : 0;
        scrollTl
          .to(canRef.current.position, {
            x: xPosition,
            ease: "circ.inOut",
            delay: 0.5,
          })
          .to(
            canRef.current.rotation,
            {
              y: yRotation,
              ease: "back.inOut",
            },
            "<",
          )
          .to(".alternating-text-container", {
            backgroundColor: gsap.utils.wrap(bgColors, index),
          });
      });
    },
    { dependencies: [isDesktop] },
  );

  return (
    <group
      position={isDesktop ? [1, 0, 0] : [0, 0, 0]}
      rotation={isDesktop ? [0, -0.3, 0] : [0, 0, 0]}
      ref={canRef}
    >
      <FloatingCan flavor="strawberryLemonade" />
      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
      {/* <OrbitControls/> */}
    </group>
  );
}
