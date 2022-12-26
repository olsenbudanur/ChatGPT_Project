import React, { useEffect, useRef, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import './App.css';



function App() {
  const [ChatGPTMessage, setChatGPTMessage] = useState<string>("");
  const [value, setValue] = useState<string>("");


  async function submit(){

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Origin','http://localhost:3000');
  
  
  var raw = JSON.stringify({
    "ChatGPTMessage": ChatGPTMessage,
  });
  
  var requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
    mode: 'cors'
  };
  
  fetch("http://localhost:8080/college-essay", requestOptions)
    .then(response => response.json())
    .then( data => setValue(data.body))
    .catch(error => console.log('error', error));
  }




  


  useEffect(() => {}, []);

  return (
    
    <div className="App">
        <input type="textarea" 
          name="textValue"
          onChange={(e) => setChatGPTMessage(e.target.value)}
        />
        <button onClick={submit} >Send the data</button>
        <div>{value}</div>
        <br></br>
        <TypeAnimation 
          sequence={[
            'This will be the typing animation of the response, eventually.',
          ]}
          speed={70}
          wrapper="div"
        />
      
    </div>
  );
}

export default App;