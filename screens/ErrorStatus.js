import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const ErrorStatus = ({route, navigation}) => {
  const {statusC} = route.params;

  if (statusC === 403) {
    return (
      <View style={styles.container}>
        <Text style={styles.mainText}>
          The professor has not unlocked the solutions for this exam yet.
        </Text>
        <Text>Scan another barcode or go back to the home screen.</Text>
        <Button title="Home" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }

  if (statusC === 404) {
    return (
      <View style={styles.container}>
        <Text style={styles.mainText}>
          The exam solutions for that barcode were not found.
        </Text>
        <Text>Scan another barcode or go back to the home screen.</Text>
        <Button title="Home" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 16,
  },
});
export default ErrorStatus;
