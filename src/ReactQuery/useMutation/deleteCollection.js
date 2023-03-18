const _deleteCollect = async ({collectionId, nickName}) => {
    const deleteCollect = await
      fetch(
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
      )
      return deleteCollect.json();
  };

export default _deleteCollect;