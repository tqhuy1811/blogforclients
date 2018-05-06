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
          <div key={value.id} className="column box is-10">
            <article className="media">
              <figure className="media-left">
                <p className="image is-32x32">
                  <img alt="" src={value.comment.user.profile}/>
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                <p>
                  <strong>{value.comment.user.username}</strong>
                  <small> {moment(value.comment.time).fromNow()}</small>
                </p>
                  {value.comment.comment}    
                </div>  
              </div>    
            </article>  
          </div>  
 
        )
      })
    }
  }
  componentDidMount(){
    this.state.db.collection("Comments").where("imageId","==",this.props.imageId).orderBy("time","desc").onSnapshot(res =>{
      let arr = []
      res.forEach(res => {
        let data = {
          id:res.id,
          comment: res.data()
        }
        arr.push(data)
        this.setState({comments:arr.slice(0)})
      })
    })
  }
  render(){
    return(
      <div  style={{marginBottom:"4%"}}>
        <div className="columns is-centered">
          <div className="column is-10">
            <h3 className="subtitle">Comments</h3>
          </div>
        </div>
        <div className="columns is-centered is-multiline">   
          {this.renderComments()}
        </div>    
 
      </div>  
    )
  }
}
export default Comments