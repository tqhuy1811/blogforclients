import React, { Component } from 'react'
import firebase from 'firebase'
import moment from 'moment'
import 'firebase/firestore'
class Comments extends Component {
  constructor(props){
    super(props)
    this.state = {
      db: firebase.firestore(),
      comments: []
    }
  }
  renderComments(){
    if(this.state.comments.length !== 0){
      return this.state.comments.map(value => {
        return(
          <div key={value.id} className="comment">
            <a className="avatar">
              <img alt="" src={value.comment.user.profile}/>
            </a>
            <div className="content">
              <a className="author">{value.comment.user.username}</a>
              <div className="metadata">
                <span className="date">{moment(value.comment.time).fromNow()}</span>
              </div>
              <div className="text">
                {value.comment.comment}
              </div>
            </div>
          </div>  
        )
      })
    }
  }
  componentDidMount(){
    const settings = {timestampsInSnapshots: true};
    this.state.db.settings(settings);
    this.state.db.collection("Comments").where("imageId","==",this.props.imageId).onSnapshot(res =>{
      let arr = []
      res.forEach(res => {
        let data = {
          id:res.id,
          comment: res.data()
        }
        arr.push(data)
        this.setState({comments:arr})
      })
    })
  }
  render(){
    return(
      <div className="ui comments" style={{marginBottom:"4%"}}>
        <h3 className="ui dividing header">Comments</h3>
        {this.renderComments()}
      </div>  
    )
  }
}
export default Comments