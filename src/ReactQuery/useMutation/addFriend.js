const _addFriends = async () => {
    try {
      await fetch('https://api.sendwish.link:8081/friend', {
        method: 'POST',
        headers: {'Content-Type': `application/json`},
        body: JSON.stringify({
          memberNickname: nickName,
          addMemberNickname: frName,
        }),
      })
        .then(response => {
          if (!response.ok) {
            Alert.alert('이미 등록된 친구이거나 없는 사용자입니다 :(');
            throw new Error('이미 등록된 친구이거나 없는 사용자입니다 :)');
          }
          return response.json();
        })
        .then(json => console.log('from server data check', json))
    } catch (e) {
      console.log('add friend fail');
    }
  };