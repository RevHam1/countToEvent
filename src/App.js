import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Events from "./components/Events";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import Contact from "./components/Contact";
import About from "./components/About";
import Event from "./components/Event";
import "./App.css";
// import Clock from "./components/countdownClock/Clock";

function App() {
  return (
    <Router>
      <div className="App ">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/events" component={Events} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/:event_id" component={Event} />
        </Switch>
        {/* <Clock /> */}
      </div>
    </Router>
  );
}

export default App;
