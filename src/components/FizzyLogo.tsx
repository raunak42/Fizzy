"use client"
import clsx from "clsx";
import { SVGProps } from "react";

export function FizzyLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="98"
      height="71"
      fill="none"
      className={clsx("group", props.className)}
    >
      <title id="fizzy-logo-title">Fizzy</title>
      <path
        fill="#075985"
        d="M41.9 71c1.6 0 3-1 3-2.7v.2l.7-15c0-1.6-.4-3.5-2.5-3.5H22.4l20.7-21.6a6.8 6.8 0 001.8-4.6l.8-20c0-1.5-.3-3.5-2.4-2.9L3.7 10c-1.5.3-2.4 1.4-2.4 3v11.7c0 1.6.9 2.3 2.2 2.3l16.9-1.4-19 23-1 1c-.4.5-.4 1.6-.4 2v11.8c0 1.4.8 2.4 2.3 2.6l39.6 5zM96 67.1c1.4 0 2-1.1 2-2.5l-.5-12.5c0-1.5-.6-3-2.5-3l-20.2.1 18.9-18.9a4.6 4.6 0 001.6-3.4l.2-14a3.4 3.4 0 00-2.3-3.6L51.8 0c-2 .1-2.6 2.3-2.6 4l-.7 18.2c0 1.7.3 3.4 2.4 3.4l19 1.8-19.4 21.5-.6.8c-.4.3-.7.6-.8 1a5 5 0 00-.6 2.5L48 68.4c0 1.8 1.4 2.4 3.1 2.4l45-3.7z"
      ></path>
    </svg>
  );
}
