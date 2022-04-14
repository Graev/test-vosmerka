import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Spin } from "antd";

/**
 * @typedef {object} VideoPlayerProps
 * @property {string} videoLink
 * @property {boolean} play
 */

/**
 *
 * @description player
 * @param {import('react').ProviderProps & VideoPlayerProps} props
 * @returns {JSX.Element}
 *
 */
const Player = (props) => {
  const [playerReady, setPlayerReady] = useState(false);

  return (
    <>
      <Spin spinning={!playerReady}>
        <ReactPlayer
          url={props.videoLink}
          width="100%"
          height="auto"
          playing={props.play}
          onReady={() => setPlayerReady(true)}
        />
      </Spin>
    </>
  );
};

export default Player;
