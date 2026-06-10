
import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [question, setquestion] = useState('');
  const [response , setResponse] = useState('');

  const submitHandler = (e)=>{
  e.preventDefault();
  console.log(question)
  axios.post('https://my-api-backend-two.vercel.app/getResponse', {
  question: question
})
.then(res => {
  console.log(res.data);
  setResponse(res.data.response);
  setquestion('');
})
.catch(err => {
  console.log("Full Error:", err);

  if (err.response) {
    console.log("Backend Error:", err.response.data);
  }
});
  
  }

  const speakHandler = ()=>{
    const a = new SpeechSynthesisUtterance(response);
    window.speechSynthesis.speak(a);
  }

  return (
    <div className="App">
     <div className='box'>
       <div className='profile-pic'>
          <img  className='pic' alt='profile-pic' src={require('../src/assets/KByte.jpg')}/>
       </div>
       <p className='label'>KByte</p>
       <textarea value={question} onChange={(e)=>{setquestion(e.target.value)}}/>
       <button onClick={submitHandler} >Send</button>
     </div >
     <div className='box'>
      <div className='profile-pic'>
          <img  className='pic' alt='profile-pic' src={require('../src/assets/GeminiImg.jpg')}/>
       </div>
         <p className='label'>Gemini</p>
       <textarea  value={response} readOnly />
       <button onClick={speakHandler}>Speak</button>
     </div>
    </div>
  );
}

export default App;
