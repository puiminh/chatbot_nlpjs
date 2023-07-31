  function speak(text) {
    // create a SpeechSynthesisUtterance to configure the how text to be spoken 
    let speakData = new SpeechSynthesisUtterance();
    speakData.volume = 1;
    speakData.text = text;
    speakData.lang = 'en-US';
    
    // pass the SpeechSynthesisUtterance to speechSynthesis.speak to start speaking 
    speechSynthesis.speak(speakData);
  
  }

  function read(text) {
    if ('speechSynthesis' in window) {
        speak(text);
      }else{
        console.log(' Speech Synthesis Not Supported 😞'); 
      }    
  }