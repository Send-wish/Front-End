const _makeCollect = async ({nickName, collectionName}) => {
  if (collectionName === '') {
    return Alert.alert('컬렉션 이름을 입력해주세요');
  }
  const makeCollection = await
    fetch('https://api.sendwish.link:8081/collection', {
      method: 'POST',
      headers: {'Content-Type': `application/json`},
      body: JSON.stringify({
        nickname: nickName,
        title: collectionName,
      }),
    })
    return makeCollection.json();
};

export default _makeCollect;