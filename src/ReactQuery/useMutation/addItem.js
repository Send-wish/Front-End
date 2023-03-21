const _addNewItem = async () => {
    if (sharedUrl === '' || sharedUrl === undefined || sharedUrl === null) {
      return null;
    }
    console.log('sharedUrl', sharedUrl);
    try{
    const addItem = await
      fetch('https://api.sendwish.link:8081/item/parsing', {
        method: 'POST',
        headers: {'Content-Type': `application/json`},
        body: JSON.stringify({
          url: sharedUrl,
          nickname: nickName,
        }),
      })
      if (!addItem.ok) {
        throw new Error('아이템 추가 실패');
      }
      return addItem.json();
  } catch (e) {
    console.log(e);
  }
};

export default _addNewItem;