import {Camera, CameraType} from 'expo-camera';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  TouchableOpacity,
  Dimensions,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {IconButton} from 'react-native-paper';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Scanner = ({navigation}) => {
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [loading, setLoading] = useState(true);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.noAccessTitle}>
          We need your permission to show the camera.
        </Text>
        <Text style={styles.centerText}>
          If you had previously denied access,{' '}
          <Text style={styles.centerText}>
            you will need to go to your phone settings and enable access for
            this app.
          </Text>
        </Text>
        <Text>
          Go to <Text style={styles.noAccessSteps}>Settings App</Text> {'>'}{' '}
          <Text style={styles.noAccessSteps}>Privacy & Security</Text>
          {' > '}
          <Text style={styles.noAccessSteps}>Camera</Text>
        </Text>
        <Text style={styles.centerText}>and enable access for this app.</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  }

  function toggleFlashMode() {
    setFlashMode(current =>
      current === Camera.Constants.FlashMode.torch
        ? Camera.Constants.FlashMode.off
        : Camera.Constants.FlashMode.torch,
    );
  }

  const handleBarCodeScanned = async ({data}) => {
    setScanned(true);
    fetch(`https://paperuc.win/api/solutions/${data}`)
      .then(response => {
        const statusCode = response.status;
        const resp = response;
        return Promise.all([statusCode, resp]);
      })
      .then(([statusCode, resp]) => {
        if (statusCode === 200) {
          navigation.navigate('PdfViewer', {pdfUri: resp.url});
        } else {
          navigation.navigate('ErrorStatus', {statusC: statusCode});
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setScanned(false);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flashMode}
          autoFocus={Camera.Constants.AutoFocus.on}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.flashIcon}
              onPress={toggleFlashMode}>
              {flashMode === Camera.Constants.FlashMode.torch ? (
                <IconButton icon="flash" size={35} />
              ) : (
                <IconButton icon="flash-off" size={35} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              {type === CameraType.back ? (
                <IconButton icon="camera-flip" size={35} />
              ) : (
                <IconButton icon="camera-flip-outline" size={35} />
              )}
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginTop: 50,
  },
  camera: {
    width: width,
    height: height,
    margin: 10,
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
  noAccessSteps: {
    fontWeight: 'bold',
  },
  noAccessTitle: {
    textAlign: 'center',
    margin: 5,
    fontSize: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Scanner;
