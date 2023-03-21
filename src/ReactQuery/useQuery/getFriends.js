// 친구 목록 렌더링을 위한 데이터 호출
const _getFriends = async nickName => {
  try {
    const queryFriends = await fetch(
      `https://api.sendwish.link:8081/friend/${nickName}`,
    );
    console.log('친구 목록 쿼리 호출');
    if (!queryFriends.ok) {
      throw new Error('친구 목록 쿼리 호출 실패');
    }
    return queryFriends.json();
  } catch (e) {
    console.log(e);
  }
};

export default _getFriends;
