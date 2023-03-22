import React from 'react';
import {StyleSheet, Dimensions, View, Text, TextInput} from 'react-native';
import {Button, Surface} from 'react-native-paper';
// import {SafeAreaView} from 'react-native-safe-area-context';
import Pdf from 'react-native-pdf';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const PdfViewer = ({navigation, uri}) => {
  // const source = {
  //   uri: uri,
  //   // uri: navigation.getParam('pdfUri'),
  //   cache: true,
  // };
  const source = {
    uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    cache: true,
  };
  const [numOfPages, setNumOfPages] = React.useState(0);
  const [pageNum, setPageNum] = React.useState(1);

  // function scrollToInput(textInput) {
  //   // Add a 'scroll' ref to your ScrollView
  //   this.scroll.props.scrollToFocusedInput(textInput);
  // }

  return (
    <View style={styles.container}>
      <View style={styles.pagesContainer}>
        <Surface style={styles.pageNum}>
          <TextInput>
            <Text style={styles.pageNumInput}>{pageNum}</Text>
          </TextInput>
        </Surface>
        <Text>of</Text>
        <Surface style={styles.pageNum}>
          <TextInput>
            <Text style={styles.pageNumInput}>{numOfPages}</Text>
          </TextInput>
        </Surface>
      </View>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          setNumOfPages(numberOfPages);
          // console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          setPageNum(page);
          // console.log(`current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        style={styles.pdf}
      />
      <View style={styles.bottomContainer}>
        <Button
          textColor="white"
          buttonColor="#023F63"
          mode="contained"
          onPress={() => navigation.navigate('Scanner')}>
          Scan another Barcode
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    margin: 20,
  },
  pagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width / 2.5,
    // height: 50,
    margin: 10,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  pageNum: {
    width: 35,
    height: 35,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  pageNumInput: {
    fontSize: 18,
  },
});

export default PdfViewer;
