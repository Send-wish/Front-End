// 아이템 렌더링을 위한 데이터 호출
const _getItems = async(nickName) => {
    const data = await fetch(`https://api.sendwish.link:8081/items/${nickName}`)
    console.log('아이템 렌더링 호출')
    return data.json();
};

export default _getItems;
