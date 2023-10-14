import React from "react";
import { TouchableOpacity, Text } from "react-native";

import Hockey from "../../icons/Sports/Hockey";
import Baseball from "../../icons/Sports/Baseball";
import BasketBall from "../../icons/Sports/Basketball";
import Volleyball from "../../icons/Sports/Volleyball";
import Lacrosse from "../../icons/Sports/Lacrosse";
import Soccer from "../../icons/Sports/Soccer";
import Other from "../../icons/Sports/Other";
import Football from "../../icons/Sports/Football";

export default function SelectSport({ name }) {
  const icon = (name) => {
    if (name === "Soccer") return <Soccer />;
    if (name === "Lacrosse") return <Lacrosse />;
    if (name === "Baseball" || name === "Softball") return <Baseball />;
    if (name === "Hockey") return <Hockey />;
    if (name === "Volleyball") return <Volleyball />;
    if (name === "Basketball") return <BasketBall />;
    if (name === "Football") return <Football />;
    if (name === "Other") return <Other />;
  };

  return (
    <>
      {icon(name)}
      <Text className="text-lg text-white font-semibold">{name}</Text>
    </>
  );
}
