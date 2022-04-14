import { Modal, Button } from "antd";
import React, { useState, useEffect } from "react";
import { useMachine } from "@xstate/react";
import playerMachine from "../machineXstate/playerMachine";
import Player from "./Player";

/**
 *
 * @param {import('react').ProviderProps} props
 * @returns
 */
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
      <Button type="primary" onClick={setSendMachine("toggle")}>
        Open Modal with customized footer
      </Button>
      <Modal
        visible={!close}
        title="Title"
        onCancel={setSendMachine("toggle")}
        footer={[
          <Button onClick={changePlayVideoState(!playVideo)}>Return</Button>,
          <Button
            key="submit"
            type="primary"
            onClick={setSendMachine("toggleMini")}
          >
            mini
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={changePlayVideoState(!playVideo)}
          >
            Play
          </Button>,
        ]}
        {...additSettings}
      >
        <Player play={playVideo} />
      </Modal>
    </>
  );
};

export default ModalElement;
