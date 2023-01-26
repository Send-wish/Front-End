const _deleteShareCollection = async (shareCollectionId, nickName) => {
  try {
    fetch(
      `https://api.sendwish.link:8081/collection/${nickName}/${shareCollectionId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: nickName,
          collectionId: shareCollectionId,
        }),
      },
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} 에러발생`);
        }
        return;
      })
      .then(data => {
        return data;
      });
  } catch (e) {
    console.log('delete fail', e);
  }
};
