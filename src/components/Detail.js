import React, { Component } from 'react'
import firebase from 'firebase'
import 'firebase/firestore'
import Comment from './Comment'
import moment from 'moment'
class Detail extends Component {
  constructor(props){
    super(props)
    this.state = {
      db: firebase.firestore(),
      data: null,
      comment:'',
      user:null,
      display:'visible',
      displayInput:true
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleEnter = this.handleEnter.bind(this)
  }
  componentDidMount(){
    this.state.db.collection("images").doc(this.props.match.params.id).get().then(res => {
      this.setState({data:res.data()})
    })
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        let data = {
          username: user.displayName,
          profile: user.photoURL
        }
        this.setState({user:data,display:'hidden',displayInput:!this.state.displayInput})
      }
      else{
        this.setState({display:'visible',displayInput:!this.state.displayInput})
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
          <h3 className="ui dividing header">
          {moment(this.state.data.time).format('LLLL')}
          </h3>
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
        <p className="ui text container" style={{fontSize:"17px",visibility:this.state.display}}>
          Hãy đăng nhập để chửi Quân
        </p>  
        <form className="ui form" hidden={this.state.displayInput} >
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