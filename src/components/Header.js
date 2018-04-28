import React, { Component } from 'react'


class Header extends Component {
    render() {
        return (
            <div>
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  							<a className="navbar-brand" style={{"color":"pink"}} href="#">Quân hồng</a>
  							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    							<span className="navbar-toggler-icon"></span>
							  </button>
  							<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
    							<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      							<li className="nav-item active">
        							<a className="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      							</li>
      							<li className="nav-item">
        							<a class="nav-link" href="#">Link</a>
      							</li>
      							<li className="nav-item">
       								 <a className="nav-link disabled" href="#">Disabled</a>
      							</li>
   								</ul>
									 <ul class="navbar-nav ml-auto">
            				<li class="nav-item">
                			<button class="btn btn-outline-success my-2 my-sm-0" data-target="#myModal" data-toggle="modal">Sign In</button>
            				</li>
        					 </ul>
  							</div>
							</nav>
						
            </div>    
        )
    }
}
export default Header