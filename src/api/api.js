const API_BASE_URL = 'https://api.videosdk.live/v2';
const VIDEOSDK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlYWEwZjM1Mi0zNWVkLTQ2OGUtYThjZS01MzBhZDIzZWNlZDEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY3NDMxMzQzMiwiZXhwIjoxNjc0OTE4MjMyfQ.5A3CfgRMvhuAGJPY7XK7FmjkbACOSPptopyidvnHK3Q';
const API_AUTH_URL = '';

export const getToken = async () => {
  if (VIDEOSDK_TOKEN && API_AUTH_URL) {
    console.error(
      'Error: Provide only ONE PARAMETER - either Token or Auth API',
    );
  } else if (VIDEOSDK_TOKEN) {
    return VIDEOSDK_TOKEN;
  } else if (API_AUTH_URL) {
    const res = await fetch(`${API_AUTH_URL}/get-token`, {
      method: 'GET',
    });
    const {token} = await res.json();
    return token;
  } else {
    console.error('Error: ', Error('Please add a token or Auth Server URL'));
  }
};

export const createMeeting = async ({token}) => {
  const url = `${API_BASE_URL}/rooms`;
  const options = {
    method: 'POST',
    headers: {Authorization: token, 'Content-Type': 'application/json'},
  };

  const {roomId} = await fetch(url, options)
    .then(response => response.json())
    .catch(error => console.error('error', error));

  return roomId;
};

export const validateMeeting = async ({meetingId, token}) => {
  const url = `${API_BASE_URL}/rooms/validate/${meetingId}`;

  const options = {
    method: 'GET',
    headers: {Authorization: token},
  };

  const result = await fetch(url, options)
    .then(response => response.json()) //result will have meeting id
    .catch(error => console.error('error', error));

  return result ? result.roomId === meetingId : false;
};

export const fetchSession = async ({meetingId, token}) => {
  const url = `${API_BASE_URL}/sessions?roomId=${meetingId}`;

  const options = {
    method: 'GET',
    headers: {Authorization: token},
  };

  const result = await fetch(url, options)
    .then(response => response.json()) //result will have meeting id
    .catch(error => console.error('error', error));
  return result ? result.data[0] : null;
};
