import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import  firebase from 'firebase'
import 'firebase/firestore'
class Header extends Component {
	constructor(props){
		super(props)
		this.state = { 
			name: 'Sign In',
			email: '',
			db: firebase.firestore(),
			display:'hidden',
		}
		this.handleOnClick = this.handleOnClick.bind(this)
	};

	handleOnClick(){
		if(this.state.name === 'Sign In'){
			let provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider).then(function(result) {
			}).catch(function(error) {
			});
		}
		else{
			firebase.auth().signOut();
		};
	};
	componentDidMount(){
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({name: 'Sign Out',email:user.email})
				this.state.db.collection("users").doc(user.uid).get().then(res => {
					if(!res.exists){
						this.state.db.collection("users").doc(user.uid).set({
						email: user.email,
						username: user.displayName,
						profile: user.photoURL
						}).then(res => {
						}).catch(err => {
						})
					}
				})
				if(user.email === 'jhmquan@gmail.com'){
					this.setState({
						display:'visible'
					})
				}
			} else {	
				this.setState({name:'Sign In',display:'hidden'})
			}
		});
	};
	renderNavBar(){
		if(this.state.display ==='visible'){
			return(
				<nav className="navbar is-black">
				<div className="navbar-brand">
				<Link to="/" className="navbar-item has-text-danger" style={{fontSize:"30px"}}>
					TUI
				</Link>	
			</div>
			<div className="navbar-start">
				<Link to="/upload" style={{visibility:this.state.display}} className="has-text-danger is-size-12 navbar-item">
					Upload
				</Link>
				<Link to="/manage" style={{visibility:this.state.display}} className="navbar-item has-text-danger is-size-12">
					Manage
				</Link>
			</div>		

			<div className="navbar-end">
				<div onClick={this.handleOnClick}  className="navbar-item navbar-link has-text-danger is-size-12">
					{this.state.name}
				</div>
			</div>
			</nav>
			)
		}
		else{
			return(
				<nav className="navbar is-black">
					<div className="navbar-brand">
						<Link to="/" className="navbar-item has-text-danger" style={{fontSize:"30px"}}>
							TUI
						</Link>	
					</div>	
					<div className="navbar-end">
					<div onClick={this.handleOnClick}  className="navbar-item has-text-danger is-hover is-size-12">
						{this.state.name}
					</div>
					</div>
				</nav>
			)
		}
	}

	render(){
		return(
			<div>
				{this.renderNavBar()}
			</div>		
		)
	}
}
export default Header