const _getShareCollections = async (nickName) => {
  console.log('skdfjlasjklsjfldsjksdlfjl',nickName)
  const getShareCollection = await fetch(`https://api.sendwish.link:8081/collections/shared/${nickName}`,);
  console.log('공유 컬렉션 쿼리 호출');
  return getShareCollection.json();
};

export default _getShareCollections;
