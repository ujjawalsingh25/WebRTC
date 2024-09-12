import React, { useCallback, useEffect, useMemo, useState } from "react";

const PeerContext = React.createContext(null);

export const usePeer = () => React.useContext(PeerContext);

export const PeerProvider = (props) => {
    const [ remoteStream, setRemoteStream] = useState(null);

    const peer = useMemo(() => new RTCPeerConnection({     //connect with Turn Server and get its own IP Address
        iceServers : [
            {
                urls: [
                    "stun:stun.l.google.com:19302",
                    "stun:global.stun.twilio.com:3478",
                ],  
            },
        ],
    }), []);     

    const createOffer = async () => {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        return offer;
    }

    const createAnswer = async (offer) => {
        await peer.setRemoteDescription(offer);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        return answer;
    }

    const setRemoteAns = async (ans) => {
        await peer.setRemoteDescription(ans);
    }    

    // const sendStream = async (stream) => {
    //     const tracks = stream.getTracks();  
    //     for(const track of tracks) {
    //         peer.addTrack(track, stream);
    //     }
    // };
    const sendStream = useCallback((stream) => {
        const tracks = stream.getTracks();  
        tracks.forEach(track => {
            peer.addTrack(track, stream);
        });
    }, [peer]);
    

    const handleTrackEvent = useCallback((ev) => {
        const streams = ev.streams;
        setRemoteStream(streams[0])
    }, [])

    // const handleNegotiation = useCallback(() => {
    //     console.log("Oops! Negotiation Needed");
        
    // }, [])

    useEffect(() => {
        peer.addEventListener('track', handleTrackEvent);
        // peer.addEventListener('negotiationneeded', handleNegotiation)
        return () => {
            peer.removeEventListener('track', handleTrackEvent);
            // peer.removeEventListener('negotiationneeded', handleNegotiation);
        }
    }, [peer, handleTrackEvent]);
    
    return (
        <PeerContext.Provider value={{ 
            peer, 
            createOffer, 
            createAnswer, 
            setRemoteAns, 
            sendStream, 
            remoteStream, 
        }}>
            {props.children}
        </PeerContext.Provider>
    )
}