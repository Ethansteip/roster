import React from "react";
import { TouchableOpacity, Text } from "react-native";

import Hockey from "../../icons/Sports/Hockey";
import Baseball from "../../icons/Sports/Baseball";
import BasketBall from "../../icons/Sports/Basketball";
import Volleyball from "../../icons/Sports/Volleyball";
import Lacrosse from "../../icons/Sports/Lacrosse";
import Soccer from "../../icons/Sports/Soccer";

export default function SelectSport({ name }) {
  const icon = (name) => {
    if (name === "Soccer") return <Soccer />;
    if (name === "Lacrosse") return <Lacrosse />;
    if (name === "Baseball" || name === "Softball") return <Baseball />;
    if (name === "Hockey") return <Hockey />;
    if (name === "Volleyball") return <Volleyball />;
    if (name === "Basketball") return <BasketBall />;
  };
  return (
    <TouchableOpacity className="flex justify-center items-center border border-gray-300 bg-indigo-400 w-1/3 px-3 py-3 rounded-lg">
      {icon(name)}
      <Text className="text-lg text-white font-semibold">{name}</Text>
    </TouchableOpacity>
  );
}
