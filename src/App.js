import './App.css';
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Languages } from "./Components/Pages/languages.js";
import { Countries } from "./Components/Pages/countries.js";
import { Explore } from "./Components/Pages/explore.js";
import { Endangered } from "./Components/Pages/endangered.js";
//import Map from "./Map";
//import SearchBar from "./Components/SearchBar";
//import LangData from './eldata.json';
import React, {useRef, useEffect} from "react";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "1ae622e9691363c6";

function Notebook() {


  const bubblemap2Ref = useRef();

  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(notebook, name => {
      if (name === "bubblemap2") return new Inspector(bubblemap2Ref.current);
    });
    return () => runtime.dispose();
  }, []);

  return (
    <>
    <Router>
        <NavBar />

        <div className="Pages">
          <Routes>
            <Route exact path="/" component={Languages} />
            <Route path="/countries" component={Countries} />
            <Route path="/explore" component={Explore} />
            <Route path="/endangered" component={Endangered} />
          </Routes>
          </div>           
      </Router>
      <div ref={bubblemap2Ref} />
      
    </>
  );
}

export default Notebook;