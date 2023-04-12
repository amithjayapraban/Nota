import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./home";

import Note from "./note";
import More from "./More";

import { CProvider } from "./context";
import { Head } from "./head";

function App() {
  return (
    <CProvider>
      <div className="App flex max-h-[80vh]     margin-0  p-4 md:p-10     text-fontc flex-col ">
        <Router>
          <Head />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/note/:uid" element={<Note />} />
            <Route path="/settings" element={<More />} />
          </Routes>
        </Router>
      </div>
    </CProvider>
  );
}

export default App;
