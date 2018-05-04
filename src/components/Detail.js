import React, { Component } from 'react'
import firebase from 'firebase'
import 'firebase/firestore'
import Comment from './Comment'

class Detail extends Component {
  constructor(props){
    super(props)
    this.state = {
      db: firebase.firestore(),
      data: null,
      comment:'',
      user:null
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleEnter = this.handleEnter.bind(this)
  }
  componentDidMount(){
    const settings = {timestampsInSnapshots: true};
    this.state.db.settings(settings);
    this.state.db.collection("images").doc(this.props.match.params.id).get().then(res => {
      this.setState({data:res.data()})
    })
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        let data = {
          username: user.displayName,
          profile: user.photoURL
        }
        this.setState({user:data})
      }
      else{

      }
    })
  }
  handleOnChange(e){
    this.setState({comment:e.target.value})
  }
  handleEnter(e){
    e.preventDefault()
    if(this.state.comment !== ''){
      firebase.firestore().collection("Comments").add({
        user:this.state.user,
        comment:this.state.comment,
        time:Date.now(),
        imageId:this.props.match.params.id
      })
      this.setState({comment:''})

    }
  }
  renderImage(){
    if(this.state.data!==null){
      return( 
        <div className="ui raised segment" style={{backgroundColor:"whitesmoke"}} >
          <p className="ui text container" style={{fontSize:"20px"}}>
            {this.state.data.status}
          </p>
          <img alt="" src={this.state.data.imagePath} className="ui centered huge rounded image" />
        </div> 
      )
    }
  }
  render(){
    return(
      <div className="ui container" onSubmit={this.handleEnter} style={{overflow:"auto"}} >
        {this.renderImage()}
        
        <form className="ui form" >
          <div className="field">
            <input placeholder="comment chửi nó đi bay"  onChange={this.handleOnChange}  value={this.state.comment}/>
          </div>
        </form>
        <Comment imageId={this.props.match.params.id}/>  
      </div>  
    )
  }
}
export default Detail