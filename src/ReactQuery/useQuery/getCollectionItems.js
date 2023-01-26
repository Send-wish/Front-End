// 컬렉션 아이템 렌더링을 위한 데이터 호출
const _getCollectionItems = async(nickName,collectionId) => {
  const collectionItem = await fetch(`https://api.sendwish.link:8081/collection/${nickName}/${collectionId}`)
  console.log('컬렉션 아이템 쿼리')
  return collectionItem.json();
};

export default _getCollectionItems;


