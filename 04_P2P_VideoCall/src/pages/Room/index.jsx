import React from 'react';
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"

const RoomPage = () => {
const { roomId } = useParams();      // taken roomId from params/link-> localhost:3000/room/roomId
const myMeeting = async (element) => {
  // generate Kit Token
  const appID = 1951783504;
  const serverSecret = "e00c4b1008dbcbe043e01375eda7a44c";
  const username = "Ujjawal";
  const userId = Date.now().toString();           // lets take user as Date
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest (
      appID, 
      serverSecret,  
      roomId, 
      userId,
      username,
  );
  // Create instance object from Kit Token.
  const zp = ZegoUIKitPrebuilt.create(kitToken);
  
  // start the call
  zp.joinRoom({
      container: element,
      sharedLinks: [
          {
              name: "Copy Link",
              url: `http://localhost:3000/room/${roomId}`, 
          }
      ],
      scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,     // the mode should be project type
      },
      showScreenSharingButton: true,
  });
  };

  return (
    <div className="room-page">
        <div
            className="myCallContainer"
            ref={myMeeting}
            style={{ width: '100vw', height: '100vh' }}
        />
    </div>
  )
};

export default RoomPage;
