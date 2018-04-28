import React, { Component } from 'react';
import { BrowserRouter,Route } from 'react-router-dom'
import Header from './Header'
import MainPage from './MainPage'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
 
        <div>
          <Header />
          <Route component={MainPage} exact path="/" />
        </div>  

      </BrowserRouter>

    );
  }
}

export default App;
