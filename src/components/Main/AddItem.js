const _addItem = async () => {
    try {
      await fetch('https://api.sendwish.link:8081/item/parsing', {
        method: 'POST',
        headers: {'Content-Type': `application/json`},
        body: JSON.stringify({
          url: receiveText, // url 아직 못받음 임시변수
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`${response.status} 에러발생`);
          }
          return response.json();
        })
        .then(json => console.log(json))
        .then(data => {
          console.log('send url', data);
        })
        .catch(error => {
          console.error(error);
        })
        .then(() => _getItems());
    } catch (e) {
      console.log('send url fail');
    }
  };

  const _getItems = async () => {
    try {
      // API 아직 안열림
      fetch(
        `https://api.sendwish.link:8081/collection/${test}/${collectionId}`,
        {
          method: 'GET',
          // headers: {Content_Type: 'application/json'},
        },
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          setItems(data);
          setItemId(data);
          console.log('get items', data);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };