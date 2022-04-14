import { assign, createMachine } from "xstate";

const modalMachine = createMachine({
  id: "modal",
  initial: "page",
  context: {
    mini: false,
  },
  states: {
    page: {
      meta: {
        description: "Player on Page",
      },
      on: {
        toggle: "modal",
      },
      entry: "pauseVideo",
    },
    modal: {
      meta: {
        description: "Player on modal",
      },
      on: {
        toggle: "page",
        toggleMini: "mini",
      },
      entry: assign({ mini: false }),
    },
    mini: {
      meta: {
        description: "Player on mini-modal",
      },
      on: {
        toggle: "page",
        toggleMini: "modal",
      },
      entry: assign({ mini: true }),
    },
  },
});

export default modalMachine;
