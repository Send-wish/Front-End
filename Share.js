import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import {ShareMenuReactView} from 'react-native-share-menu';

const Button = ({onPress, title, style}) => (
  <Pressable onPress={onPress}>
    <Text style={[{fontSize: 16, margin: 16}, style]}>{title}</Text>
  </Pressable>
);

const Share = () => {
  const [sending, setSending] = useState(false);

  useEffect(() => {
    ShareMenuReactView.data()
      .then(({data}) => {
        console.log(data[0].data);
        postItem(data[0].data);
      })
      .catch(error => {
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }, []);
  const postItem = url => {
    try {
      fetch('https://api.sendwish.link:8081/item/parsing', {
        method: 'POST',
        headers: {'Content-Type': `application/json`},
        body: JSON.stringify({
          url: url, // url 아직 못받음 임시변수
          nickname: '브리도',
        }),
      })
        .then(response => {
          return response.json();
        })
        .then(json => console.log(json))
        .then(() => {
          console.log('아이템 등록 완료 [URL] : ', url);
          setSending(true);
        })
        .then()
        .catch(error => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
      console.log('send url fail');
    }
  };
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
      </View>
      <View style={styles.buttonGroup}>
        <Button
          title={sending ? '아이템 저장 완료' : '아이템 저장 중..'}
          disabled={sending}
          style={sending ? styles.sending : styles.send}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
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
