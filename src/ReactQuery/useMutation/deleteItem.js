const _deleteItem = async ({nickName, addToCollection}) => {
  const deleteItem = await
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
    return deleteItem.json();
};

export default _deleteItem;