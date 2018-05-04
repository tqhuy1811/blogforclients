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
			db: firebase.firestore()
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
		const settings = {timestampsInSnapshots: true};
		this.state.db.settings(settings);
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
			} else {
				this.setState({name:'Sign In'})
			}
		});
	};

	render(){
		return(
			<div className="ui pink inverted huge menu"	>
				<Link to="/" className="pink item">
    			Quân Kun
  			</Link>
  			<Link to="/upload" className="item">
    			Upload
  			</Link>
  			<div className="right menu">
    			<span onClick={this.handleOnClick}  className="ui item">
      			{this.state.name}
    			</span>
  			</div>
			</div>
		)
	}
}
export default Header