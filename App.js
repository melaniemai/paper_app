import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './screens/Home';
import Scanner from './screens/Scanner';
import PdfViewer from './screens/PdfViewer';
import ErrorStatus from './screens/ErrorStatus';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <PaperProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              options={{title: 'Home'}}
              component={Home}
            />
            <Stack.Screen
              name="Scanner"
              options={{title: 'Scan Barcode'}}
              component={Scanner}
            />
            <Stack.Screen
              name="PdfViewer"
              options={{title: ''}}
              component={PdfViewer}
            />
            <Stack.Screen
              name="ErrorStatus"
              options={{title: ''}}
              component={ErrorStatus}
            />
          </Stack.Navigator>
        </PaperProvider>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
