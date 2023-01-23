// function ParticipantView({ participantId }) {
//   const { webcamStream, webcamOn } = useParticipant(participantId);

//   return webcamOn && webcamStream ? (
//     <RTCView
//       streamURL={new MediaStream([webcamStream.track]).toURL()}
//       objectFit={"cover"}
//       style={{
//         height: 300,
//         marginVertical: 8,
//         marginHorizontal: 8,
//       }}
//     />
//   ) : (
//     <View
//       style={{
//         backgroundColor: "grey",
//         height: 300,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text style={{ fontSize: 16 }}>NO MEDIA</Text>
//     </View>
//   );
// }

// function ParticipantList({ participants }) {
//   return participants.length > 0 ? (
//     <FlatList
//       data={participants}
//       renderItem={({ item }) => {
//         return <ParticipantView participantId={item} />;
//       }}
//     />
//   ) : (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: "#F6F6FF",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text style={{ fontSize: 20 }}>Press Join button to enter meeting.</Text>
//     </View>
//   );
// }

// const { webcamStream, webcamOn, displayName } = useParticipant('myParticipantId');
