import React from 'react';
import {Alert, Dimensions, Share, StyleSheet, Text, View} from 'react-native';
import {IconButton, Surface} from 'react-native-paper';
import {SearchBar} from '@rneui/base';
import Pdf from 'react-native-pdf';

const PdfViewer = ({route, navigation}) => {
  const [numOfPages, setNumOfPages] = React.useState(0);
  const [pageNum, setPageNum] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');

  const {pdfUri} = route.params;
  const source = {
    uri: pdfUri,
    // uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    cache: true,
  };

  const onChangeSearch = query => {
    setSearchQuery(query);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
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
                  setPageNum(e.nativeEvent.text);
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
          style={styles.pdf}
        />
        <View style={styles.bottomBtnContainer}>
          <IconButton
            icon="home"
            iconColor="white"
            mode="contained"
            onPress={() => navigation.navigate('Home')}>
            Go Home
          </IconButton>
          <IconButton
            icon="share"
            iconColor="white"
            mode="contained"
            onPress={onShare}>
            Share
          </IconButton>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bottomBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
