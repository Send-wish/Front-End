const _addItemToCollect = async ({nickName, collectionId, addToCollection}) => {
  const addItem = await fetch(
    'https://api.sendwish.link:8081/item/enrollment',
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        nickname: nickName,
        collectionId: collectionId,
        itemIdList: addToCollection,
      }),
    },
  );
    return addItem.json();
};

export default _addItemToCollect;