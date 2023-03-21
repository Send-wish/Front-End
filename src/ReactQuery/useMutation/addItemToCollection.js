const _addItemToCollect = async ({nickName, collectionId, addToCollection}) => {
  try {
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
    if (!addItem.ok) {
      throw new Error('아이템 추가 실패');
    }
    return addItem.json();
  } catch (e) {
    console.log(e);
  }
};

export default _addItemToCollect;
