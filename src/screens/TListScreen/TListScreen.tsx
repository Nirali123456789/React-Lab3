import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getDatabase, ref, onValue, off } from 'firebase/database';
import React, { useEffect, useState } from "react";
import { AppContainer } from "../../components";
import { Color, Images, Responsive, Screen } from "../../utils";
import { AppHeader } from "../../components";

interface TListScreenProps {
  navigation: any;
}
interface Transaction {
  title: string;
  location: string;
  date: string;
  amount: string;
}

const TListScreen: React.FC<TListScreenProps> = (props) => {

  const [transactions, setTransactions] = useState<Transaction[]>([]);


  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, '/Mytransactions');

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const transactionsData: Transaction[] = Object.values(data);
        setTransactions(transactionsData);
      }
    });

    return () => off(dbRef, 'value', unsubscribe);
  }, []);

  const onPressItem = (item: any, transactionKey: Number) => {
    const { navigation } = props;
    navigation.navigate(Screen.DetailScreen, { item, transactionKey });
  };

  const handleAddPress = () => {
    const { navigation } = props;
    navigation.navigate(Screen.AddScreen);
  };

  return (
    <AppContainer>
      <AppHeader
        isAddButton
        onPressAdd={handleAddPress}  >

      </AppHeader>
      <View style={styles.mainContainer}>

        <FlatList
          data={transactions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.itemView}>
                <View style={styles.itemLeftView}>
                  <Text style={styles.titleText}>{item?.title}</Text>

                </View>
                <TouchableOpacity
                  style={styles.itemRightTouch}
                  onPress={() => onPressItem(item, index)}
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