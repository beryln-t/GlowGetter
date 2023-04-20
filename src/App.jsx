import { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <NavBar />
    </div>
  );
}

export default App;
