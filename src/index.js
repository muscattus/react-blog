import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './redux/redux-store';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

let renderTree = (state) => {
    root.render(
        // <React.StrictMode>
          <Provider store={store}>
            <App />
          </Provider>
        // </React.StrictMode>
      );
}

renderTree(store.getState());