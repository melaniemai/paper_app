//   const handleBarCodeScanned = async ({data}) => {
//     setScanned(true);
//     try {
//       const response = await fetch(`https://paperuc.win/api/solutions/${data}`);
//       const blob = await response.blob();
//       const pdfUrl = blob._data.name;
//       navigation.navigate('PdfViewer', {pdfUri: pdfUrl});
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setScanned(false);
//       alert(`Bar code with data ${data} has been scanned!`);
//     }
//   };

//   if (hasPermission === false) {
//     return (
//       <View style={styles.container}>
//         <View style={styles.top}>
//           <Text style={styles.centerText}>Denied Access to Camera.</Text>
//           <Text>
//             Go to <Text style={styles.noAccessSteps}>Settings App</Text> {'>'}{' '}
//             <Text style={styles.noAccessSteps}>Privacy & Security</Text>
//             {' > '}
//             <Text style={styles.noAccessSteps}>Camera</Text>
//           </Text>
//           <Text style={styles.centerText}>and enable access for this app.</Text>
//         </View>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <BarCodeScanner
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         style={styles.camera}
//       />
//       {scanned && (
//         <Button
//           textColor="white"
//           buttonColor="#023F63"
//           mode="contained"
//           onPress={() => setScanned(false)}>
//           Tap to Scan Again
//         </Button>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   camera: {
//     width: width / 1.2,
//     height: height / 1.5,
//     margin: 10,
//   },
//   noAccessSteps: {
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   centerText: {
//     textAlign: 'center',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: 10,
//   },
//   baseText: {
//     fontFamily: 'Arial',
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#023F63',
//   },
//   top: {
//     flex: 0.2,
//   },
//   bottom: {
//     flex: 0.2,
//   },
// });

import {Camera, CameraType} from 'expo-camera';
import React, {useState} from 'react';
import {
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

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center', margin: 5, fontSize: 16}}>
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

  const handleBarCodeScanned = ({data}) => {
    setScanned(true);
    // try {
    //   const response = await fetch(`https://paperuc.win/api/solutions/${data}`);
    //   const blob = await response.blob();
    //   const pdfUrl = blob._data.name;
    //   navigation.navigate('PdfViewer', {pdfUri: pdfUrl});
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setScanned(false);
    //   alert(`Bar code with data ${data} has been scanned!`);
    // }
    alert(`Bar code with data ${data} has been scanned!`);
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flashMode}
        autoFocus={Camera.Constants.AutoFocus.on}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.flashIcon} onPress={toggleFlashMode}>
            {flashMode === Camera.Constants.FlashMode.torch ? (
              <IconButton icon="flash" />
            ) : (
              <IconButton icon="flash-off" />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <IconButton icon="camera-flip" />
          </TouchableOpacity>
        </View>
      </Camera>
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
  camera: {
    width: width / 1.2,
    height: height / 1.5,
    margin: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  noAccessSteps: {
    fontWeight: 'bold',
  },
  centerText: {
    textAlign: 'center',
  },
});

export default Scanner;
