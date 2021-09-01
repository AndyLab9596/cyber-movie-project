import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import UserAdding from './pages/UserAdding';
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
          <AdminTemplate path="/admin/user" exact Component={UserControl} redirectPath="/" />
          <AdminTemplate path="/admin/user/add" exact Component={UserAdding} redirectPath="/" />
        </Switch>
      </BrowserRouter>

    </div>
  );
}
export default App;
