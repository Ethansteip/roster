import React from "react";
import { Modal, View, Text } from "react-native";
import Checkmark from "../icons/checkmark";

const SuccessModal = ({ visible, text }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View className="flex-1 justify-center items-center">
        <View className="bg-offwhite shadow-xl px-10 py-6 rounded-xl w-2/3 flex flex-row items-center space-x-3 justify-center">
          <Checkmark />
          <Text>{text}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;
