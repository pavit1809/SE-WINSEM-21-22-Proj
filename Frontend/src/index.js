import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './store/reducer'


const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.log("Others");
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.log("Storage errors");
  }
};

const persistedState = loadState();

const store = createStore(
  // persistedState,
  reducer,
  persistedState
);

store.subscribe(() => {
  saveState({
  	userDetails:store.getState().userDetails,
  	recordDetails:store.getState().recordDetails,
  });
});



ReactDOM.render(
    <Provider store={store}>
    	<App />
    </Provider>
  ,document.getElementById('root')
);