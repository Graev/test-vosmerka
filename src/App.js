import "antd/dist/antd.css";
import "./App.css";
import ModalElement from "./comp/Modal";
import Player from "./comp/Player";

function App() {
  return (
    <div>
      <div className="player__placeholder">
        <ModalElement></ModalElement>
      </div>
    </div>
  );
}

export default App;
