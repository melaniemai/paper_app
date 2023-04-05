import React, {useEffect} from 'react';
import {Alert, Dimensions, Share, StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator, Button, Surface} from 'react-native-paper';
import {SearchBar} from '@rneui/base';
import Pdf from 'react-native-pdf';

const PdfViewer = ({route, navigation}) => {
  const [numOfPages, setNumOfPages] = React.useState(0);
  const [pageNum, setPageNum] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const {pdfUri} = route.params;
  const source = {
    uri: pdfUri,
    // uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    cache: true,
  };

  const onChangeSearch = query => {
    setSearchQuery(query);
  };

  const onShare = async url => {
    try {
      const result = await Share.share({
        url: `${url}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3E7BFA" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.topBar}>
            <View style={styles.searchBarContainer}>
              <SearchBar
                containerStyle={styles.searchBar}
                platform="ios"
                placeholder="Go to Page.."
                onChangeText={onChangeSearch}
                onSubmitEditing={e => {
                  if (e.nativeEvent.text === '0' || e.nativeEvent.text === '') {
                    setPageNum(pageNum) && this.pdf.setPage(pageNum);
                  } else if (Number(e.nativeEvent.text) > numOfPages) {
                    setPageNum(pageNum);
                  } else {
                    setPageNum(e.nativeEvent.text);
                    this.pdf.setPage(Number(e.nativeEvent.text));
                  }
                }}
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
              setNumOfPages(numberOfPages);
            }}
            onPageChanged={(page, numberOfPages) => {
              setPageNum(page);
            }}
            onError={error => {
              console.log(error);
            }}
            trustAllCerts={true}
            showsVerticalScrollIndicator={true}
            style={styles.pdf}
          />
          <View style={styles.bottomBtnContainer}>
            <Button
              icon="home"
              textColor="white"
              buttonColor="#3E7BFA"
              mode="contained"
              onPress={() => navigation.navigate('Home')}>
              Go Home
            </Button>
            <Button
              icon="share"
              textColor="#3E7BFA"
              mode="outlined"
              onPress={() => onShare(pdfUri)}>
              Share
            </Button>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  bottomBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    width: 175,
  },
  pagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.3,
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
    padding: 5,
    width: Dimensions.get('window').width * 0.27,
    minHeight: 45,
  },
  pageNumInput: {
    fontSize: 18,
  },
  searchBar: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchBarContainer: {
    width: Dimensions.get('window').width * 0.7,
  },
  topBar: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
});

export default PdfViewer;
