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
        this.setState({user:data,display:'hidden',displayInput:false})
      }
      else{
        this.setState({display:'visible',displayInput:true})
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
        <div className="columns is-centered">
         <div className="column is-10 box">
         <h6 className="subtitle">
          {moment(this.state.data.time).format('LLLL')}
          </h6>
          <p className="has-text-centered is-capitalized is-size-12 has-text-weight-bold">
            {this.state.data.status}
          </p>
          <figure className="image is-3by2">
            <img alt="" src={this.state.data.imagePath} />
          </figure>  
         </div>
        </div> 
      )
    }
  }
  render(){
    return(
      <div className="container box" onSubmit={this.handleEnter} style={{overflow:"auto",backgroundColor:"whitesmoke"}} >
        {this.renderImage()}
        <p className="has-text-centered" style={{fontSize:"17px",visibility:this.state.display}}>
          Hãy đăng nhập để chửi Quân
        </p>
        <div className="columns is-centered">
          <div className="column is-10">
            <form className="field"  hidden={this.state.displayInput} >
              <div className="control">
                <input placeholder="comment chửi nó đi bay" className="input"  onChange={this.handleOnChange}  value={this.state.comment}/>
              </div> 
            </form>
          </div>  
        </div>  

        <Comment imageId={this.props.match.params.id}/>  
      </div>  
    )
  }
}
export default Detail