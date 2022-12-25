import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState<string>('Waiting on value');

  useEffect(() => {
    fetch('http://localhost:8080/college-essay')
        .then((response) => response.json())
        .then((data) => setValue(data.body));
  }, []);

  return (
    
    <div className="App">
        <input type="textarea" 
          name="textValue"
        />
        <div className="response">{value}</div>
    </div>
  );
}

export default App;
