import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"

const RoomPage = () => {
    const { roomId } = useParams();      // taken roomId from params/link-> localhost:3000/room/roomId

    const myMeeting = async (element) => {
        // generate Kit Token
        const appID = 1890731968;
        const serverSecret = "7f26de85232c57a4f002af76b368f818";
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
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
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
}

export default RoomPage;