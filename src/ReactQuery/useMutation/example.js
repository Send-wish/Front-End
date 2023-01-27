import { useMutation } from "react-query";

// 1. setQueryData :  setQueryData는 기존에 queryKey에 매핑되어 있는 데이터를 새롭게 정의해줍니다. 서버에 데이터 요청 x
queryClient.setQueryData('queryKey', (data) => {});

// 2. optimistic update(UI 먼저 업데이트하고, 서버에 요청을 보내는 방식)

// 3. onMutate : onMutate 는 mutation 함수가 실행되기 전에 실행되고 mutation 함수가 받을 동일한 변수가 전달된다.

// 4. onSettled : onSettled 는 mutation 이 성공해서 성공한 데이터 또는 error가 전달될 때 실행된다

// 5. invalidateQueries : invalidateQueries는 queryKey에 매핑되어 있는 데이터를 무효화 시킵니다. 서버에 데이터 요청 o

// 6. invalidateQueries vs refetch
// refetch() 는 데이터의 stale 함과 상관 없이 & 쿼리에 대한 observer 가 없더라도 항상 refetch 하지만,invalidateQueries 는 기존 데이터를 stale 로 변경 후 마운트되어야 refetch 가 동작한다고 한다.


queryClient.invalidateQueries('querykey'); // queryKey 유효성 제거

const { data, isLoading, mutate, mutateAsync } = useMutation(mutationFn, options);

// mutate 가 전달하는 객체 
mutate(variables, {
  onError,
  onSettled,
  onSuccess,
});

