// import React, { useState } from "react";
// import YouTubeToMP3Converter from "./YouTubeToMP3Converter.jsx"
import './App.css';
import "./index.css"

import { useEffect, useState } from 'react';
import { fetch } from './services/ApiRequest';

function App() {
  const [link, setLink] = useState('');
  const [id, setId] = useState(null);
  const [response, setResponse] = useState(null);
  const [disabled, setDisabled] = useState(false);
  
  useEffect(() => {
    if (id) {
      const fetchData = () => {
        let interval = setInterval(async function() {
          setDisabled(true);
          const res = await fetch(id);
          
          if (res.status === 200 && res.data.status === "ok") {
            setDisabled(false);
            setResponse(res.data);
            clearInterval(interval);
          } else if (res.status === 200 && res.data.status === "fail") {
            alert("Invalid video ID");
            setDisabled(false);
            clearInterval(interval);
          }

        }, 1000);
      }

      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (response) {
      window.location.href = response.link;
    }
  }, [response]);

  return (
    <div className="App">
      <div id="logo">
        <h1>MP3 DOWNLOADER</h1>
      </div>

      <form>
        <input
          type="text"
          placeholder="YouTube link here"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
      </form>
      <span>It might take a moment to convert your video</span>
      <button
        onClick={() => {
          const pcLink = "youtube";
          const mobileLink = "youtu.be";
          if (link.includes(pcLink)) {
            const text = link.split("=")[1];
            if (text) {
              setId(text);
            }
          } else if ((link.includes(mobileLink))) {
            const temp = link.split("/");
            const text = temp[3].split("?")[0];
            if (text) {
              setId(text);
            }
          }
        }}
        disabled={disabled}
        className={disabled ? "button-disabled" : ""}
      >Download</button>
    </div>
  )
}

export default App;

// function App() {
//   return (
//     <div className='App'>
//         <h1>Youtube to mp3 conventor</h1>
//         <YouTubeToMP3Converter/>
//     </div>
//   );
// }

// export default App;