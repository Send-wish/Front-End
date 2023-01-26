import {Axios} from 'react-native-axios';
// import { Axios } from "react-native-axios/lib/axios";

// const _getItems = nickName => {
//   Axios.get(`https://api.sendwish.link:8081/items/${nickName}`),
//     {
//       method: 'GET',
//       headers: {'Content-Type': 'application/json'},
//     }
//       .then(function (response) {
//         console.log(response);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
  //   const result= await Axios(`https://api.sendwish.link:8081/items/${nickName}`, {
  //     method: 'GET',
  //     headers: {'Content-Type': 'application/json'},
  //   })
  //     console.log('result', result);
// };

// export default _getItems;

const _getItems = async(nickName) => {
  try {
    await fetch(`https://api.sendwish.link:8081/items/${nickName}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    
      .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok')
          }
        // if(res.error){
        //     throw new error;
        // }
        return response.json();
      })
      .then(data => {
        // return data;
        console.log('함수 안쪽', data);
        console.log('실행되는가')
        // return data
      });
  } catch (e) {
    return e;
    // console.log(e);
  }
};

export default _getItems;

// const Todos = () => {
//     const { isLoading, isError, data, error } = useQuery("todos", fetchTodoList, {
//       refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
//       retry: 0, // 실패시 재호출 몇번 할지
//       onSuccess: data => {
//         // 성공시 호출
//         console.log(data);
//       },
//       onError: e => {
//         // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
//         // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
//         console.log(e.message);
//       }
//     });

//     if (isLoading) {
//       return <span>Loading...</span>;
//     }

//     if (isError) {
//       return <span>Error: {error.message}</span>;
//     }

//     return (
//       <ul>
//         {data.map(todo => (
//           <li key={todo.id}>{todo.title}</li>
//         ))}
//       </ul>
//     );
//   };
