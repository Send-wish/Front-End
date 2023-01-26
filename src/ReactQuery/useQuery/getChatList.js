const _getChatList = async nickName => {
  const queryChatList = await fetch(
    `https://api.sendwish.link:8081/chat/rooms/${nickName}`,
  );
  console.log('채팅 목록 쿼리 호출');
  return queryChatList.json();
};

export default _getChatList;
