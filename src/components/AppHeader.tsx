import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React from "react";
import { Color, Images, Responsive } from "../utils";

interface AppHeaderProps {
  isBackButton?: boolean;
  isAddButton?: boolean;
  titleText?: string;
  leftIcon?: React.ReactNode;
  onPressBack?: TouchableOpacityProps["onPress"];
  onPressAdd?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = (props) => {
  const { titleText, onPressBack, isAddButton, isBackButton ,leftIcon,onPressAdd} = props;
  return (
    <View style={styles.mainView}>
      
      {isBackButton ? (
        <TouchableOpacity style={styles.backTouch} onPress={onPressBack}>
          <Image source={Images.back} style={styles.backImg} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backTouch} />
      )}
      <Text style={styles.titleText}>{titleText}</Text>
      {isBackButton ? (
        <TouchableOpacity style={styles.backTouch}>
          <Image source={Images.add} style={styles.backImg} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backTouch} />
      )}

{isAddButton && onPressAdd && ( 
                    <TouchableOpacity style={styles.backTouch} onPress={onPressAdd}>
                      <Image source={Images.add} style={styles.backImg} />
                    </TouchableOpacity>
                  )}
    </View>
  );
};

export default AppHeader;

AppHeader.defaultProps = {
  isAddButton: false,
  isBackButton: false,
  titleText: "Transactions",
  onPressBack: () => console.log("onPressBack"),
};

const styles = StyleSheet.create({
  mainView: {
    height: Responsive.verticalScale(50),
    backgroundColor: Color.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  titleText: {
    fontWeight: "700",
    fontSize: Responsive.font(6),
    color: Color.secondary,
    flex: 1,
    textAlign: "center",
  },
  backTouch: {
    height: "90%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backImg: {
    width: "80%",
    height: "80%",
    tintColor: Color.white,
  },
});
