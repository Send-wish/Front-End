const _getImage = async () => {
    try {
      fetch(`https://api.sendwish.link:8081/collections/${nickName}`, {
        method: 'GET',
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          setImg(data);
        });
    } catch (e) {
      console.log(e);
    }
  };