import * as React from 'react';
import {
  Alert,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TextInput,
  Share,
} from 'react-native';
import {Button, Surface, Menu, IconButton} from 'react-native-paper';
import Pdf from 'react-native-pdf';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const PdfViewer = ({route, navigation}) => {
  const {pdfUri} = route.params;
  const source = {
    uri: pdfUri,
    cache: true,
  };
  // const source = {
  //   uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
  //   cache: true,
  // };
  const [numOfPages, setNumOfPages] = React.useState(0);
  const [pageNum, setPageNum] = React.useState(1);
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

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
        <View style={styles.menuContainer}>
          <Menu
            style={styles.menu}
            visible={visible}
            onDismiss={closeMenu}
            anchorPosition="bottom"
            anchor={
              <IconButton
                icon="dots-horizontal"
                iconColor="black"
                onPress={openMenu}>
                Show menu
              </IconButton>
            }>
            <Button
              mode="text"
              contentStyle={styles.button}
              textColor="#3E7BFA"
              icon="file-find-outline"
              iconColor="white"
              onPress={() => {}}>
              Go to page
            </Button>
            <Button
              mode="text"
              contentStyle={styles.button}
              textColor="#3E7BFA"
              icon="file-upload-outline"
              iconColor="white"
              onPress={onShare}>
              Share
            </Button>
            <Button
              mode="text"
              contentStyle={styles.button}
              textColor="#3E7BFA"
              icon="information-outline"
              iconColor="white"
              onPress={() => {}}>
              Show Info
            </Button>
          </Menu>
        </View>
        {/* <View style={styles.pagesContainer}>
          <Surface style={styles.pageNum} elevation={0}>
            <TextInput>
              <Text style={styles.pageNumInput}>{pageNum}</Text>
            </TextInput>
          </Surface>
          <Text>of</Text>
          <Surface style={styles.pageNum} elevation={0}>
            <TextInput>
              <Text style={styles.pageNumInput}>{numOfPages}</Text>
            </TextInput>
          </Surface>
        </View> */}
        <Pdf
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
        <View style={styles.bottomContainer}>
          <Button
            textColor="white"
            buttonColor="#3E7BFA"
            mode="contained"
            onPress={() => navigation.navigate('Scanner')}>
            Scan another Barcode
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: Dimensions.get('window').width,
  },
  menu: {
    width: 175,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#fff',
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
  button: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
  },
});

export default PdfViewer;
