// 컬렉션 아이템 렌더링을 위한 데이터 호출
const _getItemsFromShareCollection = async (nickName, shareCollectionId) => {
  try {
    const shareCollectionItem = await fetch(
      `https://api.sendwish.link:8081/collection/${nickName}/${shareCollectionId}`,
    );
    console.log('공유 컬렉션 아이템 쿼리 호출');
    if (!shareCollectionItem.ok) {
      throw new Error('공유 컬렉션 아이템 쿼리 호출 실패');
    }
    return shareCollectionItem.json();
  } catch (e) {
    console.log(e);
  }
};

export default _getItemsFromShareCollection;
