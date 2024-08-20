import { useState } from "react";
import "./App.css";
import Loader from "./components/Loader/Loader";
import Input from "./components/Input/Input";
import First from "./components/First/First";
import Statistics from "./components/Statistics/Statistics";
import Track from "./components/Track/Track";
import Overview from "./components/Overview/Overview";
import Milestones from "./components/Milestones/Milestones";
import IncomeContext from "./Context/IncomeContext";
import IncomeContextProvider from "./Context/IncomeContextProvider";
import Preferences from "./Preferences/Preferences";

function App() {

  return (
    <>
      <IncomeContextProvider>
        <Loader/>
      </IncomeContextProvider>
    </>
  );
}

export default App;
