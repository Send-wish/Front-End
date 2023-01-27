const _getCollections = async nickName => {
  const collection = await fetch(
    `https://api.sendwish.link:8081/collections/${nickName}`,
  );
  console.log('컬렉션 쿼리 호출');
  return collection.json();
};

export default _getCollections;
