const _getCollections = async nickName => {
  try {
    const collection = await fetch(
      `https://api.sendwish.link:8081/collections/${nickName}`,
    );
    console.log('컬렉션 쿼리 호출');
    if (!collection.ok) {
      throw new Error('컬렉션 쿼리 호출 실패');
    }
    return collection.json();
  } catch (e) {
    console.log(e);
  }
};

export default _getCollections;
