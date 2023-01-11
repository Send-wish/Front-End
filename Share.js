import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import {ShareMenuReactView} from 'react-native-share-menu';

const Button = ({onPress, title, style}) => (
  <Pressable onPress={onPress}>
    <Text style={[{fontSize: 16, margin: 16}, style]}>{title}</Text>
  </Pressable>
);

const Share = () => {
  const [sharedData, setSharedData] = useState('');
  const [sharedMimeType, setSharedMimeType] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    ShareMenuReactView.data().then(({mimeType, data}) => {
      setSharedData(data);
      setSharedMimeType(mimeType);
    });
  }, []);
  console.log(sharedData);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          title="돌아가기"
          onPress={() => {
            ShareMenuReactView.dismissExtension();
          }}
          style={styles.destructive}
        />
        <Button
          title={sending ? '저장중...' : '저장하기'}
          onPress={() => {
            setSending(true);

            setTimeout(() => {
              ShareMenuReactView.dismissExtension();
            }, 3000);
          }}
          disabled={sending}
          style={sending ? styles.sending : styles.send}
        />
      </View>
      {sharedMimeType === 'text/plain' && <Text>{sharedData}</Text>}
      <View style={styles.buttonGroup}>
        <Button
          title="Dismiss with Error"
          onPress={() => {
            ShareMenuReactView.dismissExtension('Dismissed with error');
          }}
          style={styles.destructive}
        />
        <Button
          title="Continue In App"
          onPress={() => {
            ShareMenuReactView.continueInApp();
          }}
        />
        <Button
          title="Continue In App With Extra Data"
          onPress={() => {
            ShareMenuReactView.continueInApp({hello: 'from the other side'});
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  destructive: {
    color: 'red',
  },
  send: {
    color: 'blue',
  },
  sending: {
    color: 'grey',
  },
  image: {
    width: '100%',
    height: 100,
  },
  buttonGroup: {
    alignItems: 'center',
  },
});

export default Share;
