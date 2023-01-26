const _getChatHistory = () => {
    try {
      fetch(`https://api.sendwish.link:8081/chats/${chatRoomId}`, {
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