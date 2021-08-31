import { createBrowserHistory } from "history";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Router, Switch } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Personal from "./pages/Personal";
import { FetchUser } from "./store/actions/Auth";
import HomeTemplate from "./Template/HomeTemplate";

const history = createBrowserHistory();

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchUser())
  }, [dispatch])

  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path="/" exact Component={Home} />
        {/* <HomeTemplate path="/home" exact Component={Home} /> */}
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <HomeTemplate path="/personal/" exact Component={Personal} />
      </Switch>
    </Router>
  );
}

export default App;
