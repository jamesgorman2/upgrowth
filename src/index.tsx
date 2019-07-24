import React from 'react';
import ReactDOM from 'react-dom';
import generateStore from "./store";
import Menu from './components/menu';
import Content from "./components/photos";
import {Provider} from "react-redux";

const store = generateStore();

ReactDOM.render(
  <Provider store={store}>
    <Menu />
    <Content />
  </Provider>,
  document.getElementById('root')
);