import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';

import alert from './alert';

const AlertExample = () => {
  // Function to show a simple alert
  const showSimpleAlert = () => {
    alert(
      'Simple Alert',
      'This is a simple alert dialog.',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false },
    );
  };

  // Function to show an alert with multiple buttons
  const showMultipleButtonsAlert = () => {
    alert(
      'Multiple Buttons Alert',
      'Choose an option:',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Ask me later', onPress: () => console.log('Ask me later Pressed') },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: true },
    );
  };

  // Function to show a customizable alert
  const showCustomizableAlert = () => {
    alert(
      'Custom Alert',
      'Do you want to proceed?',
      [
        {
          text: 'No',
          onPress: () => console.log('User chose not to proceed'),
          style: 'destructive',
        },
        {
          text: 'Yes',
          onPress: () => console.log('User chose to proceed'),
        },
      ],
      { cancelable: true },
    );
  };

  useEffect(() => {
    showSimpleAlert();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>React Native Alert Example</Text>

      <TouchableOpacity style={styles.button} onPress={showSimpleAlert}>
        <Text style={styles.buttonText}>Show Simple Alert</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={showMultipleButtonsAlert}>
        <Text style={styles.buttonText}>Show Multiple Buttons Alert</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={showCustomizableAlert}>
        <Text style={styles.buttonText}>Show Customizable Alert</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AlertExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4682B4',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
