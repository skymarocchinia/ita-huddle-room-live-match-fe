import logo from './logo.svg';
import './App.css';
import FootballAnimation from "./animation/page/FootballAnimation/FootballAnimation";
import store from "./animation/store/store";
import {Provider} from "react-redux";


function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <FootballAnimation></FootballAnimation>
        </div>
      </Provider>
  );
}

export default App;
