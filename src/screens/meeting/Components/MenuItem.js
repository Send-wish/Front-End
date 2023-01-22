import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import colors from "../../../styles/colors";
import { convertRFValue } from "../../../styles/spacing";

export default function MenuItem({ title, description, icon, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 18,
          paddingVertical: 16,
          alignItems: "center",
        }}
      >
        {icon && (
          <View
            style={{
              marginRight: 14,
            }}
          >
            {icon}
          </View>
        )}

        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              color: colors.primary[100],
              fontSize: convertRFValue(12),
            }}
          >
            {title}
          </Text>

          {description && (
            <Text
              style={{
                color: colors.primary[400],
                fontSize: convertRFValue(12),
              }}
            >
              {description}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}