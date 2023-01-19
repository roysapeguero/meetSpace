import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Switch, Route} from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import Groups from "./components/Groups";
import OneGroupPage from "./components/OneGroup";
import HomePage from "./components/HomePage";
import EditGroupModal from "./components/EditGroup";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user)
  const group = useSelector(state => state.session.group)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            {user ? <HomePage /> : <SplashPage />}
          </Route>
          <Route exact path='/groups'>
            <Groups />
          </Route>
          <Route exact path='/groups/:groupId'>
            <OneGroupPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
