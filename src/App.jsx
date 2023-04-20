import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Register from "./pages/Register/Register";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <NavBar />
      <Register />
    </div>
  );
}

export default App;
