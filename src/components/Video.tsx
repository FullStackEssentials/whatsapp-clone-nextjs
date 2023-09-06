import { CallControls, SpeakerLayout, StreamCall, useCalls } from '@stream-io/video-react-sdk';

export const Video = () => {
  const calls = useCalls();

  return (
    <div className='str-video'>
      {calls.map((call) => (
        <StreamCall call={call} key={call.cid}>
          <SpeakerLayout />
          <CallControls />
        </StreamCall>
      ))}
    </div>
  );
};