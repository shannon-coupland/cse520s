import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

import ImagesPage from "./components/ImagesPage"
import VideoPage from "./components/VideoPage"

enum Tabs {
  Login,
  Main,
  Images,
  Video
}

const ImagesTab = () => {
  return <div id="images" className="tab">
    <ImagesPage />
  </div>
}

const VideoTab = () => {
  return <div id="videos" className="tab">
    <VideoPage />
  </div>
}


function App() {
  const [tab, setTab] = useState(Tabs.Video)
  return (
    <div className="App">
      <header className="App-header">
      <div className="sitetitle">
        <h1>PDASC</h1>
        <h2>Person-Detecting, Affordable Security Camera</h2>
      </div>
      {tab === Tabs.Images && <ImagesTab />}
      {tab === Tabs.Video && <VideoTab />}
      <div id="tabs" className="tabs">
        <button className = "NavButton" onClick={() => setTab(Tabs.Images)}>Images</button>
        <button className = "NavButton" onClick={() => setTab(Tabs.Video)}>Video</button>
      </div>
      </header>
    </div>
  );
}

export default App;
