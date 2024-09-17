import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./style.css";

const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0VtcGVyb3JfUGFscGF0aW5lIiwidXNlcl9pZCI6IkVtcGVyb3JfUGFscGF0aW5lIiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3MjY2MDM3OTYsImV4cCI6MTcyNzIwODU5Nn0.JQXGTTi7euVkncpZ4MGcf1-mOyPtCYBKtf8RC2Jywo4";
const userId = "Emperor_Palpatine";
const callId = "XjB0x25OPLke";

// set up the user object
const user = {
  id: userId,
  name: "Yashaswee",
  image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", callId);
call.join({ create: true });

export default function VideoCall() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls />
    </StreamTheme>
  );
};
