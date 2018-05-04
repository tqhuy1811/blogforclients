import React, { Component } from 'react';
import { BrowserRouter,Route } from 'react-router-dom'
import Header from './Header'
import MainPage from './MainPage'
import Upload from './AddPicture'
import Detail from './Detail';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route component={MainPage} exact path="/" />
            <Route component={Upload} exact path="/upload" />
            <Route component={Detail} exact path="/view/:id"/>
          </div>
        </BrowserRouter>
      </div>

    );
  }
}

export default App;
