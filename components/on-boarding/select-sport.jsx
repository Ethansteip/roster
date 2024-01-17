import React from "react";
import { Text } from "react-native";

import Hockey from "../icons/sports/Hockey";
import Baseball from "../icons/sports/Baseball";
import BasketBall from "../icons/sports/Basketball";
import Volleyball from "../icons/sports/Volleyball";
import Lacrosse from "../icons/sports/Lacrosse";
import Soccer from "../icons/sports/Soccer";
import Other from "../icons/sports/Other";
import Football from "../icons/sports/Football";

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
