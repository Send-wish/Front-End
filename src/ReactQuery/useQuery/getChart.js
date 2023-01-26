const _getChart = (friendName) => {
  try {
    fetch(`https://api.sendwish.link:8081/items/category/rank/${friendName}`, {
      method: 'GET',
      headers: {'Content-Type': `application/json`},
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
