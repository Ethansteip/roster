import React from "react";
import { Text } from "react-native";

import Hockey from "../../icons/Sports/Hockey";
import Baseball from "../../icons/Sports/Baseball";
import BasketBall from "../../icons/Sports/Basketball";
import Volleyball from "../../icons/Sports/Volleyball";
import Lacrosse from "../../icons/Sports/Lacrosse";
import Soccer from "../../icons/Sports/Soccer";
import Other from "../../icons/Sports/Other";
import Football from "../../icons/Sports/Football";

export default function SelectSport({ name, active }) {
  const icon = (name) => {
    if (name === "Soccer") return <Soccer active={active} />;
    if (name === "Lacrosse") return <Lacrosse active={active} />;
    if (name === "Baseball" || name === "Softball") return <Baseball active={active} />;
    if (name === "Hockey") return <Hockey active={active} />;
    if (name === "Volleyball") return <Volleyball active={active} />;
    if (name === "Basketball") return <BasketBall active={active} />;
    if (name === "Football") return <Football active={active} />;
    if (name === "Other") return <Other active={active} />;
  };

  return (
    <>
      {icon(name)}
      <Text className={`text-lg font-semibold ${active ? "text-green" : "text-offwhite"}`}>
        {name}
      </Text>
    </>
  );
}
