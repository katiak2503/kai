import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      'https://api.openai.com/v1/engine/davinci-codex/completions',
      {
        prompt: `Your prompt: ${input}`,
        max_tokens: 5,
        n: 1,
        stop: 'stop',
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      }
    );
    setResponse(response.data.choices[0].text);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Input:
          <input type="text" value={input} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
