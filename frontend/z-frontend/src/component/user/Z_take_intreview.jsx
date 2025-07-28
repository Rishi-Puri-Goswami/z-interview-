import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ReactMediaRecorder  } from "react-media-recorder";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Z_take_intreview = () => {
  const params = useParams();
const navigate = useNavigate();
  const {createintreviewid} = params;

  console.log(createintreviewid, "intreview id")

  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [humanText, setHumanText] = useState('');
  const [aiText, setAiText] = useState('');
  const [initialPromptPlayed, setInitialPromptPlayed] = useState(false);
  const [remove, setremove] = useState(true);

const url = import.meta.env.VITE_BASE_URL;

console.log(url , "uuuuuuuuuuuurrrrrrrrrrrlllllll")


useEffect(() => {
 setremove(true)
}, [])


  const speak = (text, onEndCallback) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => {
      onEndCallback?.();
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };


  const startListening = (onResultCallback) => {

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesn't support speech recognition");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log('🎙 Listening...');
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('🗣 You said:', transcript);
      setHumanText(transcript);
      onResultCallback(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('❌ Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const getAIResponse = async (userInput) => {
console.log(userInput , "userinput");

    try {
      const response = await axios.post(`${url}/user/continueInterview/${createintreviewid}`, {
        message : userInput
      },{
        withCredentials : true
      });



      const aiResponse = response.data.ai || "Sorry, I didn't catch that.";
      console.log(response.data)
      console.log("AI:", aiResponse);
      setAiText(aiResponse);



      speak(aiResponse, () => {
        startListening((text) => {
          getAIResponse(text); 
        });
      });
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };


  const handleStartInterview = () => {
    setInterviewStarted(true);
    const firstQuestion = "Hi! Let's begin the interview. Can you tell me about yourself?";
    speak(firstQuestion, () => {
      startListening((text) => {
        getAIResponse(text);
      });
    });

    setInitialPromptPlayed(true);
  };

  return (
    <div className=' bg-black h-screen w-full flex justify-center items-center p-3 flex-col gap-4'>
     
     <div className='h-[80vh] w-full p-2 bg-neutral-900 border-[1px] border-neutral-800  rounded-3xl  justify-around flex flex-col gap-4  items-center '>
<div className='flex h-full w-full  justify-around items-center '>

<div className='h-[60vh] w-[30vw] flex items-center justify-center bg-neutral-800 rounded-xl  '>

<div className='h-[35vh] w-[17vw] rounded-full bg-red-200 overflow-hidden '>
<img src="https://i.pinimg.com/736x/8c/d7/c6/8cd7c63be1c98f6c998ed28e9fd470d9.jpg" className='h-full w-full    object-fill object-center ' alt="" />
</div>

</div>

<div className='h-[60vh] w-[30vw]  rounded-xl  '>
 <ReactMediaRecorder
      video
      audio
      render={({
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
        previewStream,
      }) => (
        <div>
          <div>
            {previewStream && (
              <video
                style={{ width: "500px", borderRadius: "10px" }}
                ref={(video) => {
                  if (video) {
                    video.srcObject = previewStream;
                  }
                }}
                autoPlay
                muted
              />
            )}
          </div>
        {    remove  == true ? 
          <div className='h-full w-full  backdrop-blur-lg absolute items-center justify-center flex top-0  left-0 '>

  <div  className='h-[20vh] w-[20vw] flex items-center justify-center   gap-3 bg-black  rounded-lg  top-[40%] left-[30%] ' style={{ marginTop: "10px" }}>

             <button
          
          onClick={()=>{setremove(false)  

          startRecording()

          }}
          className="bg-white text-black px-4 py-1.5 rounded-md hover:bg-gray-200 font-medium">
            check calera
          </button>
          </div>

          
          </div> : null }
        </div>
      )}
    />
</div>

</div>

<button onClick={handleStartInterview} className='h-12 w-[20vw] bg-red-700 mb-3 flex items-center justify-center rounded-lg text-xl font-semibold '>
  {isListening ? <div>your turn</div> : <div>Strat Inteview</div> }
</button>
<button  onClick={()=>{

setInterviewStarted(false);
navigate(`/user/profile/Aifeedback/${createintreviewid}`)
}} className='h-12 w-[20vw] bg-red-700 mb-3 flex items-center justify-center rounded-lg text-xl font-semibold '>
 Stop Intreview
</button>
     </div>
    </div>
  );
};

export default Z_take_intreview;
