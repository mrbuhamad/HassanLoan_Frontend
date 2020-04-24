import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; /// check this later
import "bootstrap/dist/css/bootstrap.css";

//Components
import Navbar from "./Components/Webnavbar";
import PartList from "./Components/PartList";

function App() {
  return (
    <div>
      <Navbar />
      <PartList />
    </div>
  );
}

export default App;
