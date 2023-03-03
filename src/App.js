import Match from "./components/Match";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Football Court</h1>
      <Match matchId={1234} />
    </div>
  );
}
