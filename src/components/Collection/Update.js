
  const _changeCollectionName = async () => {
    setVisibleModal(false);
    console.log('data check', nickName, collectionId, collectionName)
    try {
      await fetch('https://api.sendwish.link:8081/collection', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: nickName,
          collectionId: collectionId,
          newTitle: collectionTitle,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`${response.status} 에러발생`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data)

          setIsChanged(true)

          console.log("chagned true?", isChanged)
          console.log('change_check!!',collectionTitle)
        })
        .then(result => {
          console.log('result', result);
        }); //for debug
    } catch (e) {
      console.log('change fail', e);
    }
  };