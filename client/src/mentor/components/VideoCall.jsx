// import {
//   CallControls,
//   CallingState,
//   SpeakerLayout,
//   StreamCall,
//   StreamTheme,
//   StreamVideo,
//   StreamVideoClient,
//   useCallStateHooks,
// } from "@stream-io/video-react-sdk";

// import "@stream-io/video-react-sdk/dist/css/styles.css";
// import "./style.css";

// const apiKey = "mmhfdzb5evj2";
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0FheWxhX1NlY3VyYSIsInVzZXJfaWQiOiJBYXlsYV9TZWN1cmEiLCJ2YWxpZGl0eV9pbl9zZWNvbmRzIjo2MDQ4MDAsImlhdCI6MTcyNTY5MzYzMSwiZXhwIjoxNzI2Mjk4NDMxfQ.6REm0FwXJf7uTh2wtfzm9wkPJ6pD7Pp2HV_wQ9-9YtA";
// const userId = "Aayla_Secura";
// const callId = "rVeYS2w89eR2";

// // set up the user object
// const user = {
//   id: userId,
//   name: "Yashaswee",
//   image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
// };

// const client = new StreamVideoClient({ apiKey, user, token });
// const call = client.call("default", callId);
// call.join({ create: true });

// export default function VideoCall() {
//   return (
//     <StreamVideo client={client}>
//       <StreamCall call={call}>
//         <MyUILayout />
//       </StreamCall>
//     </StreamVideo>
//   );
// }

// export const MyUILayout = () => {
//   const { useCallCallingState } = useCallStateHooks();
//   const callingState = useCallCallingState();

//   if (callingState !== CallingState.JOINED) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <StreamTheme>
//       <SpeakerLayout participantsBarPosition="bottom" />
//       <CallControls />
//     </StreamTheme>
//   );
// };
