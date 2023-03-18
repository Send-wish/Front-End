const _addNewItem = async () => {
    if (sharedUrl === '' || sharedUrl === undefined || sharedUrl === null) {
      return null;
    }
    console.log('sharedUrl', sharedUrl);
    const addItem = await
      fetch('https://api.sendwish.link:8081/item/parsing', {
        method: 'POST',
        headers: {'Content-Type': `application/json`},
        body: JSON.stringify({
          url: sharedUrl,
          nickname: nickName,
        }),
      })
      return addItem.json();
  };

export default _addNewItem;