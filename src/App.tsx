import React from 'react';
import styles from "./App.module.css";
import { HashRouter,BrowserRouter, Route, Switch} from 'react-router-dom';
import {HomePage,SignInPage,RegisterPage,DetailPage} from './pages';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path='/signIn' component={SignInPage}/>
          <Route path='/register' component={RegisterPage}/>
          <Route path='/detail/:touristRouteId' component={DetailPage}/>
          <Route render={()=><h1>404 not found 頁面去火星啦！</h1>} />
          {/* 只要Route上不寫path，則任何定義以外的路徑都會導到這個路徑，且切記404路徑必須在所有路徑最後 */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
