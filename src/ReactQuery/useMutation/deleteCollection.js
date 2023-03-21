const _deleteCollect = async ({collectionId, nickName}) => {
  try {
    const deleteCollect = await fetch(
      `https://api.sendwish.link:8081/collection/${nickName}/${collectionId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: nickName,
          collectionId: collectionId,
        }),
      },
    );
    if (!deleteCollect.ok) {
      throw new Error('컬렉션 삭제 실패');
    }
  } catch (e) {
    console.log(e);
  }
};

export default _deleteCollect;
