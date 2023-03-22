import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const ErrorStatus = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>403 Forbidden</Text>
      <Text>You are not authorized to access this page/document.</Text>
      <Text>Scan another barcode or go back to the home screen.</Text>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
export default ErrorStatus;
