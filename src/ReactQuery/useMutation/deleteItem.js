const _deleteItems = async () => {
  try {
    fetch(`https://api.sendwish.link:8081/items`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname: nickName,
        itemIdList: addToCollection,
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
    console.log('items delete fail', e);
  }
};
