import React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Pdf from 'react-native-pdf';

const PdfViewer = ({navigation, uri}) => {
  const source = {
    uri: uri,
    // uri: navigation.getParam('pdfUri'),
    cache: true,
  };
  // const source = {
  //   uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
  //   cache: true,
  // };
  const [numOfPages, setNumOfPages] = React.useState(0);

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        style={styles.pdf}
      />
      <SafeAreaView>
        <View>{/* <Text>Number of Pages: </Text> */}</View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PdfViewer;
