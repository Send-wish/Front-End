const _deleteItem = async ({nickName, addToCollection}) => {
  try {
    const deleteItem = await fetch(`https://api.sendwish.link:8081/items`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname: nickName,
        itemIdList: addToCollection,
      }),
    });
    if (!deleteItem.ok) {
      throw new Error('아이템 삭제 실패');
    }
  } catch (e) {
    console.log(e);
  }
};

export default _deleteItem;
