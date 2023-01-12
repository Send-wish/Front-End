{
  shareCollections.error
    ? null
    : shareCollections.map(shareCollection => (
        <CollectionCircle
          imageStyle={{
            opacity: isEditing ? 0.5 : 1,
            position: 'absolute',
          }}
          titleStyle={{
            color: isEditing ? theme.subText : theme.basicText,
          }}
          key={shareCollection?.collectionId}
          shareCollectionId={shareCollection?.collectionId}
          shareCollectionName={shareCollection?.title}
          nickName={shareCollectionName?.nickname}
          onPress={() =>
            isEditing
              ? _pressTargetShareCollection(shareCollectionName?.collectionId)
              : navigation.navigate('ShareCollection', {
                  collectionId: shareCollectionName?.collectionId,
                  collectionName: shareCollectionName?.title,
                  nickName: shareCollectionName?.nickname,
                })
          }
          onLongPress={() => {
            _longPressCollection();
          }}
          onPress2={() =>
            isEditing
              ? _getShareCollections()
              : navigation.navigate('Collection', {
                  collectionId: collection?.collectionId,
                  collectionName: collection?.title,
                  nickName: collection?.nickname,
                })
          }
        />
      ));
}
