const _getShareCollections = async nickName => {
  try {
    const getShareCollection = await fetch(
      `https://api.sendwish.link:8081/collections/shared/${nickName}`,
    );
    console.log('공유 컬렉션 쿼리 호출');
    if (!getShareCollection.ok) {
      throw new Error('공유 컬렉션 쿼리 호출 실패');
    }
    return getShareCollection.json();
  } catch (e) {
    console.log(e);
  }
};

export default _getShareCollections;
