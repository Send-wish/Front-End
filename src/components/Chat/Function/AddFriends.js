const _addFriends = async () => {
    try {
        // 아직 안열림
      await fetch('addfriends', {
        method: 'POST',
        headers: {'Content-Type': `application/json`},
        body: JSON.stringify({
          nickname: nickName,
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
          console.log('add friend check', data);
        })
        .catch(error => {
          console.error(error);
        })
        .then(() => _getItems());
    } catch (e) {
      console.log('add friend fail');
    }
  };

  export default _addFriends;