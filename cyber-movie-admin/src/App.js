import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import UserAdding from './pages/UserAdding';
import UserControl from './pages/UserControl';
import UserEditing from './pages/UserEditing';
import { FetchAllUser, FetchUser } from './store/actions/Auth';
import AdminTemplate from './Template/AdminTemplate';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchUser())
    dispatch(FetchAllUser());
  }, [dispatch])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={SignIn} />
          <AdminTemplate path="/admin/user" exact Component={UserControl} redirectPath="/" />
          <AdminTemplate path="/admin/user/add" exact Component={UserAdding} redirectPath="/" />
          <AdminTemplate path="/admin/user/edit/:tk" exact Component={UserEditing} redirectPath="/" />
        </Switch>
      </Router>

    </div>
  );
}
export default App;
