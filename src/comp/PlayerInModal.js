import { CaretRightOutlined, PlayCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Player from "./Player";
import ModalElement from "./Modal";

const ICONS_STYLE = {
  fontSize: "24px",
};
const videoLink =
  "https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8";

/**
 *
 * @param {import('react').ProviderProps} props
 * @returns
 */
const PlayerInModal = (props) => {
  const [playVideo, setPlayVideo] = useState(false);
  const changePlayVideoState = (bool) => () => setPlayVideo(bool);

  const actions = {
    pauseVideo: changePlayVideoState(false),
    playVideo: changePlayVideoState(true),
  };

  const additButtons = [
    <PlayCircleOutlined
      key="play"
      onClick={changePlayVideoState(!playVideo)}
      style={{ ...ICONS_STYLE, marginLeft: "10px" }}
    />,
  ];

  const placeholderElement = (
    <CaretRightOutlined style={{ fontSize: "40px" }} />
  );

  return (
    <ModalElement
      actions={actions}
      additButtons={additButtons}
      classNamePlaceholder="player-placeholder"
      placeholderElements={placeholderElement}
    >
      <Player play={playVideo} videoLink={videoLink} />
    </ModalElement>
  );
};

export default PlayerInModal;
