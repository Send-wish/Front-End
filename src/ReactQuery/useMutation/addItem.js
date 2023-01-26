const _addItem = () => {
    if (sharedUrl === '' || sharedUrl === undefined || sharedUrl === null) {
      return;
    }
    try {
      fetch('https://api.sendwish.link:8081/item/parsing', {
        method: 'POST',
        headers: {'Content-Type': `application/json`},
        body: JSON.stringify({
          url: sharedUrl,
          nickname: nickName,
        }),
      }).then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} 에러발생`);
        }
        return response.json();
      });
    } catch (e) {
      console.log(e);
    }
  };