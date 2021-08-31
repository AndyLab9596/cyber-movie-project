import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/configStore';
import 'antd/dist/antd.css';
import { SnackbarProvider } from 'notistack';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={1} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

