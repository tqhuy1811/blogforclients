import React, { Component } from 'react'
import Jumbotron from './Jumbotron'


class MainPage extends Component {
  render() {
    return (
      <div>
        <Jumbotron/>
        <div class="album py-5 bg-light">
          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <div class="card mb-4 box-shadow" style={{"cursor":"pointer"}}>
                  <img class="card-img-top" src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg" alt="Card image cap"/>
                  <div class="card-body">
                    <p class="card-text">Bạn mình hay chơi cùng xóm</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-primary">View</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    )
  }
}
export default MainPage