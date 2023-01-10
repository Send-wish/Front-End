
const {isLoading:,data:, isRefetching:}=useQuery(['todos','goMountain'],fetch function)

 // fetch runction 내에 info라는 정보를 확인하면 useQuery에서 보내는 'key'값이 들어있다.
 fetch function:(info)=>{
    fetch().then((res) => res.json())
    )

// info 에 들어있는 내용 --> 즉 useQuery를 사용할 때 key는 꼭 string 형태가 아닌 배열의 형태 ['todos','goMountain'] 도 가능하므로 Text input으로 받는 query를 배열의 key 형태로 넘겨 준다.

// 이렇게 query로 받아와서 사용한다.
search:({queryKey})=>{
    const [_,query]=queryKey;
    return(
    fetch(
    ).then((res) => res.json())
    )

// - 2) 사용자가 검색을 누르면 fetch function이 작동할 수 있게 할 것 인가 ? (그전까지는 비활성화 상태로만들기)

// --> useQuery option에 enabled : false를 주어서 바로 실행이 안되게 한다음에 

// onSubmitEditing 를 통해서 query 값에 사용자가 입력하고 'search' 버튼을 누를때 refetch() 를 실행 시켜 useQuery를 동작시킨다. 