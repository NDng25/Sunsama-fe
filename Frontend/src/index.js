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
export const  BASE_URL= "https://sunsama.herokuapp.com";
ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path='/dashboard' element= {<App />}></Route>
              <Route path='/add-hashtag' element= {<FormAddHashtag />}></Route>
              <Route path="/task-detail/:idtask" element= {<FormTaskDetail />}></Route>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
