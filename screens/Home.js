import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
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
          <IconButton
            style={styles.cameraIcon}
            icon="camera"
            iconColor="black"
            mode="contained-tonal"
            size={30}
            containerColor="#F6F6F6"
            onPress={() => navigation.navigate('Scanner')}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView>
        <View style={styles.bottom}>
          <IconButton
            icon="balloon"
            iconColor="black"
            mode="contained-tonal"
            size={30}
            containerColor="#F6F6F6"
            onPress={() => navigation.navigate('PdfViewer')}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  baseText: {
    fontFamily: 'Arial',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3E7BFA',
  },
  top: {
    flex: 0.2,
  },
  bottom: {
    flex: 0.5,
  },
  cameraIcon: {
    padding: 8,
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#F6F6F6',
  },
});

export default Home;
