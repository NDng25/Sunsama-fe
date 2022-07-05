import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.scss';
import reportWebVitals from './reportWebVitals';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { Route, Routes,BrowserRouter } from 'react-router-dom';
import FormAddHashtag from "./components/FormAddHashtag/FormAddHashtag";
import FormTaskDetail from "./components/FormTaskDetail/FormTaskDetail";
export const  BASE_URL= "http://192.168.101.105:4455";
ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path='/dashboard' element= {<App />}></Route>
              <Route path='/add-hashtag' element= {<FormAddHashtag />}></Route>
              <Route path='/task-detail' element= {<FormTaskDetail />}></Route>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
