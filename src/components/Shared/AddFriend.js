1. 선택 됨에 따라 Opacity, Color가 바뀌게 설정
2. 전달인자 설정 (frName, imageStyle, titleStyle, key, friendName, nickName, onPress) 등등
3. 클릭하면 setIsFriendselected(!isFriendselected) Opacity 변경상태로 
4. 클릭하면 addFriendList() 또는 emptyFriendList() 함수 실행 리스트에 추가 또는 삭제
<TempCircle
  frName={'유수민'}
  imageStyle={{
    opacity: isFriendselected ? 1 : 0.5,
  }}
  titleStyle={{
    color: isFriendselected ? theme.subText : theme.basicText,
  }}
  key={friend?.friend_id}
  friendName={friend?.friend_nickname}
  nickName={friend?.nickName}
  onPress={() => {
    setIsFriendselected(!isFriendselected);
    isFriendselected ? addFriendList() : emptyFriendList();
  }}
/>;
