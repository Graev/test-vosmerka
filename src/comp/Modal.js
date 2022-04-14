import { Modal } from "antd";
import { CompressOutlined, ExpandOutlined } from "@ant-design/icons";
import Draggable from "react-draggable";
import React, { useState, useRef } from "react";
import { useMachine } from "@xstate/react";
import modalMachine from "../machineXstate/modalMachine";

const ICONS_STYLE = {
  fontSize: "24px",
};

/**
 * @typedef {object} ModalElementProps
 * @property {object} actions
 * @property {JSX.Element[]} additButtons
 * @property {string} classNamePlaceholder
 * @property {JSX.Element} placeholderElements
 */

/**
 *
 * @description Modal с возможностью уменьшения и изменения размера
 * @param {import('react').ProviderProps & ModalElementProps} props
 * @returns {JSX.Element}
 *
 */
const ModalElement = (props) => {
  //При уменьшении даем возможность передвигать
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const dragRef = useRef(null);
  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = dragRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };
  //________

  const [state, send] = useMachine(modalMachine, {
    actions: props.actions,
  });

  const close = state.matches("page");
  const { mini } = state.context;

  const setSendMachine = (stateString) => () => send(stateString);
  const additSettings = {};
  if (mini) {
    additSettings.width = 300;
    additSettings.modalRender = (modal) => (
      <Draggable disabled={false} bounds={bounds} onStart={onStart}>
        <div ref={dragRef}>{modal}</div>
      </Draggable>
    );
  }

  return (
    <>
      <div
        className={props.classNamePlaceholder}
        onClick={setSendMachine("toggle")}
      >
        {props.placeholderElements}
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
          ...props.additButtons,
        ]}
        //Данные с шириной, при изменении размера попап
        {...additSettings}
      >
        {props.children}
      </Modal>
    </>
  );
};

export default ModalElement;
