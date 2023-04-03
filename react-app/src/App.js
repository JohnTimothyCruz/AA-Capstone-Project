import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import StudyPage from "./components/StudyPage";
import SingleClass from "./components/SingleClass";
import LoadingClasses from "./components/LoadingClasses";
import EditFlashcards from "./components/EditFlashcards";
import AllClassesPage from "./components/AllClassesPage";
import ClassEnrollPage from "./components/ClassEnrollPage";
import UserProfile from "./components/UserProfile";
import NotFoundPage from "./components/NotFoundPage";

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
          <Route path="/study/decks/:deckId">
            <StudyPage />
          </Route>

          <Route path="/dashboard/loading" >
            <LoadingClasses />
          </Route>

          <Route path="/dashboard/classes/:classId/decks/:deckId/flashcards/:type" >
            <EditFlashcards />
          </Route>

          <Route path="/dashboard/classes/:classId" >
            <SingleClass />
          </Route>

          <Route path="/dashboard" >
            <Dashboard />
          </Route>

          <Route path="/classes/:classId" >
            <Navigation isLoaded={isLoaded} />
            <ClassEnrollPage />
          </Route>

          <Route path="/classes" >
            <Navigation isLoaded={isLoaded} />
            <AllClassesPage />
          </Route>

          <Route path="/profiles/:profileId" >
            <Navigation isLoaded={isLoaded} />
            <UserProfile />
          </Route>

          <Route exact path="/" >
            <Navigation isLoaded={isLoaded} />
            <HomePage />
          </Route>

          <Route path='' >
            <Navigation isLoaded={isLoaded} />
            <NotFoundPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
