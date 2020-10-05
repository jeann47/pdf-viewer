import React, {useState} from 'react';
import {
  StatusBar,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Pdf from 'react-native-pdf';

export default function App() {
  const [page, setPage] = useState(1);
  const [paginate, onPaginate] = useState<{setPage: Function}>();
  const [pageCount, setPageCount] = useState(1);
  const [title, setTitle] = useState('Carregando...');

  const source = {
    uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    cache: true,
  };

  function nextPage() {
    paginate?.setPage(page + 1);
  }
  function prevPage() {
    paginate?.setPage(page - 1);
  }
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#012" />
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>
          {page}/{pageCount}
        </Text>
        <Pdf
          source={source}
          maxScale={5.0}
          onLoadComplete={(numberOfPages, path, dimensions, tableContents) => {
            setPageCount(numberOfPages);
            if (tableContents) {
              setTitle(tableContents[1]?.title);
            }
          }}
          onPageChanged={setPage}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link presse: ${uri}`);
          }}
          style={styles.pdf}
          spacing={5}
          activityIndicator={
            <ActivityIndicator color="#02d" animating size="large" />
          }
          ref={(pdfRef) => {
            onPaginate(pdfRef);
          }}
          // enablePaging
          // horizontal
        />
        <View style={styles.buttonContainer}>
          <RectButton
            onPress={() => paginate?.setPage(1)}
            style={{marginRight: 5}}>
            <Text style={styles.text}>first</Text>
          </RectButton>
          <RectButton onPress={prevPage} style={{marginRight: 5}}>
            <Text style={styles.text}>prev</Text>
          </RectButton>
          <RectButton onPress={nextPage} style={{marginLeft: 5}}>
            <Text style={styles.text}>next</Text>
          </RectButton>
          <RectButton
            onPress={() => paginate?.setPage(pageCount)}
            style={{marginLeft: 5}}>
            <Text style={styles.text}>last</Text>
          </RectButton>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#012',
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  text: {
    color: '#f2f2f2',
  },
  pdf: {
    marginTop: 10,
    flex: 1,
    width: '100%',
    backgroundColor: '#012',
  },
});
