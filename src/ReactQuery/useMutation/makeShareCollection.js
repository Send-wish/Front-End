const _madeShareCollection = async () => {
    if (addFriendList.length < 2) {
      return Alert.alert('친구를 선택해야 공유컬렉션을 만들 수 있어요!');
    }
    if (shareCollectionName === '') {
      return Alert.alert('컬렉션 이름을 입력해주세요!');
    }
    try {
      fetch('https://api.sendwish.link:8081/collection/shared', {
        method: 'POST',
        headers: {'Content-Type': `application/json`},
        body: JSON.stringify({
          memberIdList: addFriendList,
          targetCollectionId: targetCollectionId,
          title: shareCollectionName,
        }),
      })
        .then(response => {
            return response.json();
          })
    } catch (e) {
      console.log(e);
    }
  };