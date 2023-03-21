const _changeShareCollectionName = async () => {
  if (shareCollectionTitle === '') {
    return Alert.alert('공유 컬렉션 이름을 입력해주세요');
  }
  try {
    await fetch('https://api.sendwish.link:8081/collection', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname: nickName,
        collectionId: shareCollectionId,
        newTitle: shareCollectionTitle,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} 에러발생`);
        }
        return response.json();
      })
  } catch (e) {
    console.log(e);
  }
};
