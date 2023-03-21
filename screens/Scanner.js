import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {BarCodeScanner} from 'expo-barcode-scanner';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Scanner({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({data}) => {
    setScanned(true);
    try {
      const response = await fetch(`https://paperuc.win/api/solutions/${data}`);
      const blob = await response.blob();
      const pdfUrl = blob._data.name;
      navigation.navigate('PdfViewer', {pdfUri: pdfUrl});
    } catch (error) {
      console.error(error);
    } finally {
      setScanned(false);
    }
  };

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.centerText}>Denied Access to Camera.</Text>
          <Text>
            Go to <Text style={styles.noAccessSteps}>Settings App</Text> {'>'}{' '}
            <Text style={styles.noAccessSteps}>Privacy & Security</Text>
            {' > '}
            <Text style={styles.noAccessSteps}>Camera</Text>
          </Text>
          <Text style={styles.centerText}>and enable access for this app.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.camera}
      />
      {scanned && (
        <Button
          textColor="white"
          buttonColor="#023F63"
          mode="contained"
          onPress={() => setScanned(false)}>
          Tap to Scan Again
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    width: width / 1.2,
    height: height / 1.5,
    margin: 10,
  },
  noAccessSteps: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
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
    color: '#023F63',
  },
  top: {
    flex: 0.2,
  },
  bottom: {
    flex: 0.2,
  },
});
