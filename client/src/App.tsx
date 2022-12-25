import React, { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import './App.css';

function App() {
  const [value, setValue] = useState<string>('Waiting on value');

  function submit(){
    fetch('http://localhost:8080/college-essay', {method: 'POST', body: JSON.stringify({a: "Data for ChatGPT", b: "Data for ChatGPT"})})
        .then((response) => response.json())
        .then((data) => {setValue(data.body)});
  }

  useEffect(() => {
    
  }, []);

  return (
    
    <div className="App">
        <input type="textarea" 
          name="textValue"
        />
        <button onClick={submit} >Send the data</button>
        <br></br>
        <br></br>
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
