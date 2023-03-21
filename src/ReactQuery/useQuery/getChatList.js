const _getChatList = async nickName => {
  try {
    const queryChatList = await fetch(
      `https://api.sendwish.link:8081/chat/rooms/${nickName}`,
    );
    console.log('채팅 목록 쿼리 호출');
    if (!queryChatList.ok) {
      throw new Error('채팅 목록 쿼리 호출 실패');
    }
    return queryChatList.json();
  } catch (e) {
    console.log(e);
  }
};

export default _getChatList;
