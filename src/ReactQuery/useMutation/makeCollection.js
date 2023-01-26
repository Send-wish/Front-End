const _madeCollection = async () => {
  if (collectionName === '') {
    return Alert.alert('컬렉션 이름을 입력해주세요');
  }
  try {
    fetch('https://api.sendwish.link:8081/collection', {
      method: 'POST',
      headers: {'Content-Type': `application/json`},
      body: JSON.stringify({
        nickname: nickName,
        title: collectionName,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} 에러발생`);
        }
        return response.json();
      })
      .then(data => {
        return data;
      });
  } catch (e) {
    console.log(e);
  }
};
