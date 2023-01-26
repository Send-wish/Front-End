const _getChatList = async () => {
    try {
      fetch(`https://api.sendwish.link:8081/chat/rooms/${nickName}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
            return data;
        });
    } catch (e) {
      console.log(e);
    }
  };