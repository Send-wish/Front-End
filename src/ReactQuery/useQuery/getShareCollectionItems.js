// 컬렉션 아이템 렌더링을 위한 데이터 호출
const _getItemsFromShareCollection = async(nickName,shareCollectionId) => {
  const shareCollectionItem = await fetch(`https://api.sendwish.link:8081/collection/${nickName}/${shareCollectionId}`)
  console.log('공유 컬렉션 아이템 쿼리 호출')
  return shareCollectionItem.json();
};

export default _getItemsFromShareCollection;