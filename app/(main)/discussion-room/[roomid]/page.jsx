'use client'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { AIModel, playAssistantSpeech } from '@/services/GlobalServices'
import { CoachingExpert } from '@/services/Options'
import { UserButton } from '@stackframe/stack'
import { useMutation, useQuery } from 'convex/react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ChatBox from './__components/ChatBox'
import { UserContext } from '@/app/__context/userContext'
import Webcam from 'react-webcam'

function DiscussionRoom() {
  const { roomid } = useParams()
  const { userData, setUserData } = useContext(UserContext)
  const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, { id: roomid })
  const [expert, setExpert] = useState(null)
  const [enableMic, setEnableMic] = useState(false)
  const [processedIndex, setProcessedIndex] = useState(-1);

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState([])
  const [loading, setLoading] = useState(false)
  const [enableFeedbackNotes, setenableFeedbackNotes] = useState(false)
  const recognition = useRef(null)
  const updateUserToken = useMutation(api.user.UpdateUserToken)
  const webcamRef = useRef(null);
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user", // Use "environment" for the rear camera
  };
  const UpdateConversation = useMutation(api.DiscussionRoom.UpdateConversation)
  useEffect(() => {
    if (DiscussionRoomData) {
      const Expert = CoachingExpert.find(item => item.name === DiscussionRoomData.expertName)
      setExpert(Expert)
    }
  }, [DiscussionRoomData])

  useEffect(() => {
    console.log("Updated transcript:", transcript)
  }, [transcript])


  const [recognitionState, setRecognitionState] = useState('disconnected'); // 'disconnected'|'connecting'|'listening'|'processing'

  const connectToServer = async () => {
    try {
      setRecognitionState('connecting');
      console.log("Initializing speech recognition...");

      if (!('webkitSpeechRecognition' in window)) {
        alert('Speech recognition requires Chrome browser');
        throw new Error('Unsupported browser');
      }

      // Clean up previous instance if exists
      if (recognition.current) {
        recognition.current.onend = null;
        recognition.current.stop();
      }

      recognition.current = new webkitSpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = 'en-US';

      recognition.current.onstart = () => {
        console.log("Recognition active");
        setRecognitionState('listening');
      };

      recognition.current.onend = () => {
        console.log("Recognition ended");
        if (recognitionState === 'listening') {
          // Auto-reconnect only if we were intentionally listening
          console.log("Attempting to reconnect...");
          setRecognitionState('connecting');
          setTimeout(() => {
            if (recognition.current) recognition.current.start();
          }, 300);
        } else {
          setRecognitionState('disconnected');
        }
      };

      recognition.current.onresult = (event) => {
        const newTranscripts = [];
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            const text = event.results[i][0].transcript.trim();
            if (text) newTranscripts.push(text);
          }
        }

        if (newTranscripts.length > 0) {
          const fullText = newTranscripts.join(' ');
          setTranscript(prev => [...prev, {
            role: 'user',
            content: fullText
          }]);
        }
        updateUserTokenMethod(transcript)//to update user generated token
      };

      recognition.current.onerror = (event) => {
        console.error("Recognition error:", event.error);
        if (event.error === 'no-speech') {
          // Ignore no-speech errors, will auto-reconnect
          return;
        }
        setRecognitionState('disconnected');
      };

      recognition.current.start();
      console.log("Recognition started");

    } catch (error) {
      console.error("Recognition setup failed:", error);
      setRecognitionState('disconnected');
    }
  };

  const disconnect = async () => {
    setRecognitionState('disconnected');
    if (recognition.current) {
      try {
        recognition.current.onend = null;
        recognition.current.stop();
      } catch (err) {
        console.error("Error stopping recognition:", err);
      } finally {
        recognition.current = null;
      }
    }
    await UpdateConversation({
      id: DiscussionRoomData._id,
      conversation: transcript
    })
    setenableFeedbackNotes(true)
  };

  // Enhanced playSpeech with recognition pausing
  const playSpeech = async (text) => {
    if (recognitionState === 'listening' && recognition.current) {
      recognition.current.stop(); // Pause listening
    }

    try {
      const audioBlob = await playAssistantSpeech(text);
      if (audioBlob) {
        const audio = new Audio(URL.createObjectURL(audioBlob));

        audio.onended = () => {
          // Resume listening if we were in listening state
          if (recognitionState === 'listening' && recognition.current) {
            recognition.current.start();
          }
        };

        await audio.play();
      }
    } catch (error) {
      console.error("Playback error:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (recognition.current) {
        recognition.current.onend = null;
        recognition.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    const processTranscript = async () => {
      const lastMessage = transcript[transcript.length - 1];

      if (!lastMessage || lastMessage.role !== 'user' ||
        transcript.length - 1 <= processedIndex) {
        return;
      }

      setLoading(true);
      try {
        const aiResp = await AIModel(
          DiscussionRoomData?.topic || '',
          DiscussionRoomData?.CoachingOption || '',
          transcript
        );

        setTranscript(prev => [...prev, {
          role: 'assistant',
          content: aiResp
        }]);
        setProcessedIndex(transcript.length);

        await playSpeech(aiResp);
        updateUserTokenMethod(aiResp)//update ai generated token
      } catch (error) {
        console.error("AI processing error:", error);
      } finally {
        setLoading(false);
      }
    };

    processTranscript();
  }, [transcript, processedIndex, DiscussionRoomData]);

  const updateUserTokenMethod = async (text) => {
    if (!text || typeof text !== 'string') return;

    const tokenCount = text.trim().split(/\s+/).length;
    const result = await updateUserToken({
      id: userData._id,
      credits: Number(userData.credits) - Number(tokenCount)
    });
    setUserData(prev => ({
      ...prev,
      credits: Number(userData.credits) - Number(tokenCount)
    }));
  }
  return (
    <div className='-mt-12'>
      <div className='mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10'>
        <div className='lg:col-span-2'>
          <h2 className='mt-[-32px] pb-[10px] pl-2 font-bold text-lg'>
            {DiscussionRoomData?.CoachingOption}
          </h2>
          <div className='h-[60vh] bg-secondary rounded-4xl flex flex-col items-center justify-center relative'>
            {expert && (
              <Image
                src={expert.avatar || '/default-avatar.png'}
                alt={expert.name || 'Expert'}
                width={200}
                height={200}
                className='h-[80px] w-[80px] rounded-full object-cover animate-pulse'
              />
            )}
            <h2 className='text-gray-500'>{expert?.name}</h2>
            {/* <div className='p-5 bg-gray-200 px-10 rounded-lg absolute right-8 bottom-8'>
              <UserButton />
            </div> */}
            <div className='absolute bottom-10 right-10'>
              <Webcam
                audio={false} // Disable audio if not needed
                ref={webcamRef}
                width={130}
                height={80}
                videoConstraints={videoConstraints}
                className="rounded-2xl"
                onUserMediaError={(error) => console.error("Webcam error:", error)}
              />
            </div>
          </div>
          <div className='text-center mt-5'>
            {recognitionState === 'disconnected' ? (
              <Button onClick={connectToServer}>Connect</Button>
            ) : (
              <Button onClick={disconnect} variant="destructive">
                Disconnect
              </Button>
            )}

            {recognitionState === 'connecting' && (
              <div className="mt-2 text-sm text-yellow-500">Connecting...</div>
            )}

            {recognitionState === 'listening' && (
              <div className="mt-2 text-sm text-green-500">
                ● Live - Speak now
              </div>
            )}
          </div>
        </div>
        <div className='lg:col-span-1'>
          <ChatBox transcript={transcript} enableFeedbackNotes={enableFeedbackNotes} CoachingOption={DiscussionRoomData?.CoachingOption} />
          <h2 className='mt-4 text-gray-400 text-sm'>
            At the end of your conversation we will automatically generate feedback/notes from your conversation
          </h2>
        </div>
      </div>
    </div>
  )
}

export default DiscussionRoom