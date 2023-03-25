import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import StudyPage from "./components/StudyPage";
import SingleClass from "./components/SingleClass";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route path="/study/decks/:id">
            <StudyPage />
          </Route>

          <Route path="/dashboard/classes/:id" >
            <SingleClass />
          </Route>

          <Route path="/dashboard" >
            <Dashboard />
          </Route>

          <Route path="/" >
            <Navigation isLoaded={isLoaded} />
            <HomePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
