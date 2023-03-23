import React from 'react';
import {
  Alert,
  Dimensions,
  TextInput,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, IconButton, Menu, Surface} from 'react-native-paper';
import {SearchBar} from '@rneui/base';
import Pdf from 'react-native-pdf';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const PdfViewer = ({route, navigation}) => {
  const [numOfPages, setNumOfPages] = React.useState(0);
  const [pageNum, setPageNum] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');

  // const [goToPageNum, setGoToPageNum] = React.useState('');
  // const [visibleMenu, setVisibleMenu] = React.useState(false);

  // const openMenu = () => setVisibleMenu(true);
  // const closeMenu = () => setVisibleMenu(false);

  /**
   * ! UNCOMMENT const{pdfUri} = route.params WHEN NOT TESTING
   */
  // const {pdfUri} = route.params;
  const source = {
    // uri: pdfUri,
    uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    cache: true,
  };

  const onChangeSearch = query => {
    setSearchQuery(query);
    setPageNum(query);
    this.pdf.setPage(Number(query));
  };

  const goToPage = () => {
    if (pageNum > 0 && pageNum <= numOfPages) {
      Alert.alert('Valid page number');
      // closeMenu();
    } else {
      Alert.alert('Invalid page number');
    }

    return (
      <View style={styles.container}>
        {/* <TextInput value={searchQuery} onChangeText={setSearchQuery} /> */}
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.searchBarContainer}>
            <SearchBar
              containerStyle={styles.searchBar}
              platform="ios"
              placeholder="Go to Page.."
              onChangeText={onChangeSearch}
              value={searchQuery}
            />
          </View>
          <View style={styles.pagesContainer}>
            <Surface style={styles.pageNum} elevation={0}>
              <Text style={styles.pageNumInput}>
                {pageNum} of {numOfPages}
              </Text>
            </Surface>
          </View>
        </View>
        <Pdf
          ref={pdf => {
            this.pdf = pdf;
          }}
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
            setNumOfPages(numberOfPages);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
            setPageNum(page);
          }}
          onError={error => {
            console.log(error);
          }}
          style={styles.pdf}
        />
        <View style={styles.bottomBtnContainer}>
          <Button
            textColor="white"
            buttonColor="#3E7BFA"
            mode="contained"
            onPress={() => navigation.navigate('Home')}>
            Go Home
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bottomBtnContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  menu: {
    width: 175,
  },
  pagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.25,
    margin: 10,
  },
  topBar: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  pageNum: {
    backgroundColor: '#dcdce1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    width: Dimensions.get('window').width * 0.25,
    minHeight: 36,
  },
  pageNumInput: {
    fontSize: 18,
  },
  button: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  searchBarContainer: {
    width: Dimensions.get('window').width * 0.7,
  },
  searchBar: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
});

export default PdfViewer;
