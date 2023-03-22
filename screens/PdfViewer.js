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
import {Button, IconButton, Menu} from 'react-native-paper';
import Pdf from 'react-native-pdf';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const PdfViewer = ({route, navigation}) => {
  const [numOfPages, setNumOfPages] = React.useState(0);
  const [pageNum, setPageNum] = React.useState(1);
  const [goToPageNum, setGoToPageNum] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  // if (
  //   route.params === null ||
  //   route.params === '' ||
  //   route.params === undefined
  // ) {
  //   return (
  //     <View style={styles.errorContainer}>
  //       {/* eslint-disable-next-line react-native/no-inline-styles */}
  //       <Text style={{fontWeight: '600', fontSize: 16}}>No PDF found.</Text>
  //     </View>
  //   );
  // }
  const {pdfUri} = route.params;
  const source = {
    uri: pdfUri,
    cache: true,
  };

  const goToPage = () => {
    if (pageNum > 0 && pageNum <= numOfPages) {
      closeMenu();
    } else {
      Alert.alert('Invalid page number');
    }

    return (
      <View style={styles.container}>
        {/* <TextInput value={searchQuery} onChangeText={setSearchQuery} /> */}
      </View>
    );
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
        {/* // TODO: GO TO PAGE FUNCTIONALITY AND DESIGN */}
        {/* <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor: '#fff',
            padding: 10,
            marginVertical: 10,
            borderRadius: 20,
            width: '100%',
          }}>
          <Button>Cancel</Button>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={goToPageNum}
            onChangeText={setGoToPageNum}
            placeholderTextColor="black"
            placeholder="Go to Page.."
          />
        </View> */}
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
                onPress={openMenu}
              />
            }>
            <Button
              mode="text"
              contentStyle={styles.button}
              textColor="#3E7BFA"
              icon="file-find-outline"
              iconColor="white"
              onPress={goToPage}>
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
            onPress={() => navigation.navigate('Home')}>
            Go Home
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
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
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
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
});

export default PdfViewer;
