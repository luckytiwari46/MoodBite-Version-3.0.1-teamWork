// components/Camera.js
import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

export default function Camera({ onEmotionDetected, onClose }) {
  const videoRef = useRef();
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceExpressionNet.loadFromUri('/models');
        setIsModelsLoaded(true);
      } catch (e) {
        console.error("Failed to load models:", e);
        setErrorMsg("Failed to load AI models.");
      }
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (!isModelsLoaded) return;
    
    let stream = null;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((s) => {
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        console.error("Camera error:", err);
        setErrorMsg("Camera access denied or unavailable.");
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isModelsLoaded]);

  const handleCapture = async () => {
    if (!videoRef.current || !isModelsLoaded) return;
    setIsDetecting(true);
    setErrorMsg(null);

    try {
      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detection && detection.expressions) {
        const emotions = detection.expressions;
        // get highest emotion value
        const highestEmotion = Object.keys(emotions).reduce((a, b) => emotions[a] > emotions[b] ? a : b);
        onEmotionDetected(highestEmotion);
      } else {
        setErrorMsg("No face detected. Please try again.");
      }
    } catch (e) {
      console.error(e);
      setErrorMsg("Error analyzing emotion.");
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#1a1a2e] border border-white/20 rounded-2xl overflow-hidden shadow-2xl max-w-md w-full relative animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-3 right-3 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        
        <div className="relative bg-black w-full aspect-video flex items-center justify-center overflow-hidden">
            {!isModelsLoaded && !errorMsg ? (
                <div className="text-white/70 animate-pulse flex flex-col items-center">
                    <span className="text-3xl mb-3">🤖</span>
                    <p className="text-sm font-medium tracking-wide">Loading AI Models...</p>
                </div>
            ) : errorMsg && !isModelsLoaded ? (
                <div className="text-red-400 flex flex-col items-center">
                    <span className="text-3xl mb-2">⚠️</span>
                    <p className="text-sm text-center px-4">{errorMsg}</p>
                </div>
            ) : (
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-x-[-1]"
                />
            )}
        </div>

        <div className="p-6 flex flex-col items-center justify-center">
            {errorMsg && isModelsLoaded && (
                <p className="text-red-400 text-sm mb-3 font-medium bg-red-400/10 py-1 px-3 rounded-md border border-red-400/20">{errorMsg}</p>
            )}
             <p className="text-white/70 mb-5 text-center text-sm">Position your face clearly in the frame and express your current mood.</p>
             <button 
                onClick={handleCapture} 
                disabled={!isModelsLoaded || isDetecting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
             >
                {isDetecting ? (
                    <>
                      <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin" />
                      Analyzing...
                    </>
                ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                      Analyze Mood
                    </>
                )}
             </button>
        </div>
      </div>
    </div>
  );
}
