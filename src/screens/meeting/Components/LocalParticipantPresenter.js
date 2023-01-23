import { useMeeting } from "@videosdk.live/react-native-sdk";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScreenShare } from "../../../assets/icons";
import colors from "../../../styles/colors";
import { convertRFValue } from "../../../styles/spacing";

export default LocalParticipantPresenter = ({}) => {
  const { disableScreenShare } = useMeeting({});
  return (
    <View
      style={{
        flex: 3,
        backgroundColor: colors.primary[800],
        justifyContent: "center",
        borderRadius: 8,
        margin: 4,
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <ScreenShare width={40} height={40} fill={"#FFF"} />
        <Text
          style={{
            fontSize: convertRFValue(14),
            color: colors.primary[100],
            marginVertical: 12,
          }}
        >
          You are presenting to everyone
        </Text>
        <TouchableOpacity
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            alignItems: "center",
            backgroundColor: "#5568FE",
            borderRadius: 12,
            marginVertical: 12,
          }}
          onPress={() => {
            disableScreenShare();
          }}
        >
          <Text
            style={{
              color: colors.primary["100"],
              fontSize: 16,
            }}
          >
            Stop Presenting
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};