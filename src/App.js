import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./views/routes/home";
import Play from "./views/routes/play";
import NoMatch from "./views/routes/nomatch";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/play/:musicTitle/:artists/:image/:isrc"
          element={<Play />}
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
