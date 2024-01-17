import React from "react";
import { Modal, View, Text } from "react-native";
import Checkmark from "../icons/general/checkmark";
import Cancel from "../icons/general/cancel";

const SuccessModal = ({ visible, text, success }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View className="flex-1 justify-center items-center">
        <View className="bg-offwhite shadow-xl px-10 py-6 rounded-xl w-2/3 flex flex-row items-center space-x-3 justify-center">
          {success ? <Checkmark /> : <Cancel />}
          <Text>{text}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;
