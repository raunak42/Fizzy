import React from "react";
import { FizzyLogo } from "./FizzyLogo";

type Props = {};

export default function Header({}: Props) {
  return <header className="-mb-28 flex justify-center py-4">
    <FizzyLogo/>
  </header>;
}
