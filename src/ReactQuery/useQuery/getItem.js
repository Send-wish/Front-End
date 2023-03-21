// 아이템 렌더링을 위한 데이터 호출
const _getItems = async nickName => {
  try {
    const data = await fetch(
      `https://api.sendwish.link:8081/items/${nickName}`,
    );
    console.log('아이템 쿼리 호출');
    if (!data.ok) {
      throw new Error('아이템 쿼리 호출 실패');
    }
    return data.json();
  } catch (e) {
    console.log(e);
  }
};

export default _getItems;
