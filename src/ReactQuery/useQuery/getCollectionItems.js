// 컬렉션 아이템 렌더링을 위한 데이터 호출
const _getCollectionItems = async (nickName, collectionId) => {
  try {
    const collectionItem = await fetch(
      `https://api.sendwish.link:8081/collection/${nickName}/${collectionId}`,
    );
    console.log('컬렉션 아이템 쿼리 호출');
    if (!collectionItem.ok) {
      throw new Error('컬렉션 아이템 쿼리 호출 실패');
    }
    return collectionItem.json();
  } catch (e) {
    console.log(e);
  }
};
export default _getCollectionItems;
