import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppContainer, AppHeader } from '../../components';
import { Color, Responsive, Images } from '../../utils';
import { getDatabase, ref, onValue, off } from 'firebase/database';


const TDetailScreen: React.FC<any> = ({ route, navigation }) => {
  const [transaction, setTransaction] = useState<any>(null);


  const onPressBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const db = getDatabase();
    const transactionKey = route.params.transactionKey;
    const transactionRef = ref(db, `Mytransactions/${transactionKey}`);
    console.log("Key ", transactionKey)
    const onDataChange = (snapshot: any) => {
      const data = snapshot.val();
      setTransaction(data);
    };

    onValue(transactionRef, onDataChange);

    return () => {
      off(transactionRef, 'value', onDataChange);
    };
  }, [route.params.transactionKey]);

  return (
    <AppContainer>
      <AppHeader
        titleText={"Transaction Detail"}
        isBackButton
        onPressBack={onPressBack}
      />
      <View style={styles.container}>
        {transaction && (
          <>
            <Text style={styles.text}>Title: {transaction.title}</Text>
            <Text style={styles.text}>Location: {transaction.location}</Text>
            <Text style={styles.text}>Date: {transaction.date}</Text>
            <Text style={styles.text}>Amount: ${transaction.amount}</Text>
          </>
        )}
      </View>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
  },
  text: {
    fontSize: Responsive.font(4),
    marginBottom: Responsive.verticalScale(10),
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    width: 24,
    height: 24,
  },
});

export default TDetailScreen;
