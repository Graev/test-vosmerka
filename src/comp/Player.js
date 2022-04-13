import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

const Player = (props) => {
  return (
    <ReactPlayer
      url="https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8"
      width="100%"
    />
  );
};

export default Player;
