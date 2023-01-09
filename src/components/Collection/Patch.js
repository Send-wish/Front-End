
const _changeCollectionName = async () => {
    setVisibleModal(false)
    try{
    await fetch('http://localhost:8080/collection', {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        nickname: nickName,
        collectionId: collectionId,
        newTitle: ChangedColName,
    })
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} 에러발생`);
        }
        return response.json();
      })
    .then(result => {console.log('result', result)}) //for debug
    } catch (e) {
    console.log('change fail');
  }
};
    