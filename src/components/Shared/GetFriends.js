
const _getFriends = async () => {
    try {
        // API 아직 안열림
        fetch(`https://api.sendwish.link:8081/collection/shared/${shareCollectionId}`, {
        method: 'GET',
        headers: {'Content-Type': `application/json`},
        })
        .then(response => {
            console.log('공유 컬렉션별 친구 목록 불러오기error: ', response);
            return response.json();
        })
        .then(data => {
            setFriendList(data);
            console.log('공유컬렉션별 친구 목록 확인', data);
            console.log('공유컬렉션별 친구 목록 확인', friendList);
        });
    } catch (e) {
        console.log(e);
    }
}
