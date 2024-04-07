import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { AppHeader } from '../../components';
import { Color, Responsive } from '../../utils';
import { getDatabase, ref, push, set, get, child } from 'firebase/database';

interface AddTransactionScreenProps {
  navigation: any;
}

const AddTransactionScreen: React.FC<AddTransactionScreenProps> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddTransaction = async () => {
    try {
      const db = getDatabase();
      const transactionsRef = ref(db, 'Mytransactions');

      // Get the current index
      const indexSnapshot = await get(child(transactionsRef, 'index'));
      let currentIndex = indexSnapshot.val();

      // If index doesn't exist or is null, set it to 0
      if (!currentIndex) {
        currentIndex = 0;
      }

      // Prepare the transaction object
      const newTransaction = {
        title: title,
        location: location,
        date: date,
        amount: amount,
      };

      // Push the new transaction to the database with the current index
      await set(child(transactionsRef, currentIndex.toString()), newTransaction);

      // Increment the index for the next transaction
      await set(child(transactionsRef, 'index'), currentIndex + 1);

      console.log('Transaction added successfully');
      // Navigate back to the previous screen
      navigation.goBack();
    } catch (error) {
      console.error('Error adding transaction: ', error);
    }
  };

  return (
    <View style={styles.container}>
     
      <AppHeader titleText="Add Transaction"
       isBackButton
        onPressBack={() => navigation.goBack()} />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
          <Text style={styles.buttonText}>Add Transaction</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  formContainer: {
    flex: 1,
    padding: Responsive.scale(20),
  },
  input: {
    height: Responsive.verticalScale(40),
    borderColor: Color.grey,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: Responsive.verticalScale(10),
    paddingHorizontal: Responsive.scale(10),
  },
  addButton: {
    backgroundColor: Color.primary,
    borderRadius: 5,
    paddingVertical: Responsive.verticalScale(10),
    alignItems: 'center',
  },
  buttonText: {
    color: Color.white,
    fontSize: Responsive.font(5),
    fontWeight: 'bold',
  },
});

export default AddTransactionScreen;
