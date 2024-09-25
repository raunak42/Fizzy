"use client";
import { Bounded } from "@/components/Bounded";
import { asText, Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import { Bubbles } from "../Hero/Bubbles";
import { useMediaQuery } from "react-responsive";
import clsx from "clsx";

/**
 * Props for `AlternatingText`.
 */
export type AlternatingTextProps =
  SliceComponentProps<Content.AlternatingTextSlice>;

/**
 * Component for "AlternatingText" Slices.
 */
const AlternatingText = ({ slice }: AlternatingTextProps): JSX.Element => {
  return (
    <Bounded
      className="alternating-text-container relative bg-yellow-300 text-sky-950"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div>
        <div className="relative grid z-[100]">
          <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
            <Scene />
          </View>

          {slice.primary.text_group.map((item, index) => (
            <div
              key={asText(item.heading)}
              className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2"
            >
              <div
                className={clsx(
                  index % 2 === 0 ? "col-start-1" : "md:col-start-2",
                  "rounded-3xl p-6 max-md:backdrop-blur-lg max-md:bg-white/50 md:backdrop-blur-0" ,
                )}
              >
                <h2 className="text-balance text-6xl font-bold">
                  <PrismicText field={item.heading} />
                </h2>

                <h2 className="mt-4 text-xl">
                  <PrismicRichText field={item.body} />
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default AlternatingText;
