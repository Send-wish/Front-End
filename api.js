export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJhNWQxNGZhMS0xNDFiLTQ1OGEtOTA1ZC0wMjcwYTNiMGFiOTQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY3NDMwNDcxMywiZXhwIjoxNjc2ODk2NzEzfQ.znBSX4PgsHXYudV8S03iuCAPbwc7LHz_gJIvPCQ0P4k";
// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const { roomId } = await res.json();
  return roomId;
};