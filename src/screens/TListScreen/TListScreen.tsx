import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { AppContainer } from "../../components";
import { tList } from "../../utils/Data";
import { Color, Images, Responsive, Screen } from "../../utils";
import { AppHeader } from "../../components";

interface TListScreenProps {
  navigation: any;
}

const TListScreen: React.FC<TListScreenProps> = (props) => {
  const onPressItem = (item: any) => {
    const { navigation } = props;
    navigation.navigate(Screen.DetailScreen, { item });
  };
  return (
    <AppContainer>
      <AppHeader />
      <View style={styles.mainContainer}>
        <FlatList
          data={tList}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemView}>
                <View style={styles.itemLeftView}>
                  <Text style={styles.titleText}>{item?.title}</Text>
                </View>
                <TouchableOpacity
                  style={styles.itemRightTouch}
                  onPress={() => onPressItem(item)}
                >
                  <Text style={styles.amountText}>{`$${item?.amount}`}</Text>
                  <Image
                    source={Images.right}
                    style={styles.rightImg}
                    resizeMode={"contain"}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </AppContainer>
  );
};

export default TListScreen;

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: Responsive.verticalScale(5),
    marginHorizontal: Responsive.scale(5),
  },
  itemView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Responsive.scale(5),
    paddingVertical: Responsive.verticalScale(5),
    backgroundColor: Color.secondary,
    marginBottom: Responsive.verticalScale(2),
    borderRadius: 5,
  },
  itemLeftView: {
    justifyContent: "center",
    flex: 1,
  },
  itemRightTouch: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: Responsive.font(5),
    color: Color.black,
  },
  amountText: {
    fontSize: Responsive.font(5),
    color: Color.white,
    fontWeight: "700",
  },
  rightImg: {
    height: Responsive.verticalScale(25),
    width: Responsive.scale(25),
    tintColor: Color.white,
    marginLeft: Responsive.scale(5),
  },
});
