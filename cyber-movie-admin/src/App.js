import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import UserControl from './pages/UserControl';
import { FetchUser } from './store/actions/Auth';
import AdminTemplate from './Template/AdminTemplate';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchUser())
  }, [dispatch])
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignIn} />
          <AdminTemplate path="/admin" exact Component={UserControl} />
        </Switch>
      </BrowserRouter>

    </div>
  );
}
export default App;
