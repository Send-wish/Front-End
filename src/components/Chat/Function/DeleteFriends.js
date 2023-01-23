const _deleteCollection = async () => {
    
    try {
        fetch(`delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },  
            body:JSON.stringify({
                nickname: nickName,
                friendname: friendName,
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`${response.status} 에러발생`);
            }
            return response.json();
        })
        .then(data =>{
            console.log(data)
        })
        .then(result => {
            console.log('result', result);
        }
        )
    } catch (e) {
        console.log('friend delete fail', e);
    }
};