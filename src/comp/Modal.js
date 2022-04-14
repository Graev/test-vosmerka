import { Modal, Button } from "antd";
import {
  CaretRightOutlined,
  CompressOutlined,
  ExpandOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useMachine } from "@xstate/react";
import playerMachine from "../machineXstate/playerMachine";
import Player from "./Player";

/**
 *
 * @param {import('react').ProviderProps} props
 * @returns
 */

const ICONS_STYLE = {
  fontSize: "24px",
};

const ModalElement = (props) => {
  const [playVideo, setPlayVideo] = useState(false);
  const changePlayVideoState = (bool) => () => setPlayVideo(bool);

  const [state, send] = useMachine(playerMachine, {
    actions: {
      pauseVideo: changePlayVideoState(false),
      playVideo: changePlayVideoState(true),
    },
  });
  const close = state.matches("page");
  const { mini } = state.context;

  const setSendMachine = (stateString) => () => send(stateString);
  const additSettings = {};
  if (mini) additSettings.width = 300;

  return (
    <>
      <div className="player-placeholder" onClick={setSendMachine("toggle")}>
        <CaretRightOutlined style={{ fontSize: "40px" }} />
      </div>
      <Modal
        visible={!close}
        title="Title"
        onCancel={setSendMachine("toggle")}
        footer={[
          //Разные иконки, в зависимости от размера окна
          mini ? (
            <ExpandOutlined
              key="modal"
              onClick={setSendMachine("toggleMini")}
              style={ICONS_STYLE}
            />
          ) : (
            <CompressOutlined
              key="mini"
              onClick={setSendMachine("toggleMini")}
              style={ICONS_STYLE}
            />
          ),
          //Кнопка play/pause
          <PlayCircleOutlined
            key="play"
            onClick={changePlayVideoState(!playVideo)}
            style={{ ...ICONS_STYLE, marginLeft: "10px" }}
          />,
        ]}
        //Данные с шириной, при изменении размера попап
        {...additSettings}
      >
        <Player play={playVideo} />
      </Modal>
    </>
  );
};

export default ModalElement;
