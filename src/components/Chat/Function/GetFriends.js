const GetFriends = async () => {
  try {
    // API 아직 안열림
    fetch(`getFriends`, {
      method: 'GET',
      // headers: {Content_Type: 'application/json'},
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setFriends(data);
        console.log('get friends', data);
      });
  } catch (e) {
    console.log(e);
  }
};

export default GetFriends;
