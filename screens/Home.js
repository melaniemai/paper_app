import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton, Surface} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.top}>
          <Text style={styles.baseText}>Scan Barcode</Text>
        </View>
      </SafeAreaView>
      <SafeAreaView>
        <View style={styles.bottom}>
          <Surface style={styles.card}>
            <IconButton
              icon="camera"
              iconColor="black"
              mode="contained-tonal"
              size={30}
              containerColor="#F6F6F6"
              onPress={() => navigation.navigate('Scanner')}
            />
          </Surface>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Arial',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3E7BFA',
  },
  bottom: {
    flex: 0.5,
  },
  card: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: '#F6F6F6',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  top: {
    flex: 0.2,
  },
});

export default Home;
