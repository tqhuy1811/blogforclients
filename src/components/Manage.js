import React, { Component } from 'react'
import firebase from 'firebase'
import { withRouter  } from 'react-router-dom'
import 'firebase/firestore'
import moment from 'moment'
class Manage extends Component {
  constructor(props){
    super(props)
    this.state = {
      db: firebase.firestore(),
      data:[],
      hiddenInput:true,
      hiddenStatus:'visible',
      name:'Edit'
    }
    this.handleOnEdit = this.handleOnEdit.bind(this)

  }
  componentDidMount(){
    this.state.db.collection("images").get().then(res => {
      res.forEach(res => {
        let data = {
          id:res.id,
          data:res.data()
        }
        this.setState({data:this.state.data.concat(data)})
      })
    })
  }


  handleDelete(path,id){
      this.state.db.collection("Comments").where("imageId","==",id).get().then(res => {
        let batch = this.state.db.batch()
        res.forEach(res => {
          batch.delete(res.ref)
        })
        batch.commit();
      })
      this.state.db.collection("images").doc(id).delete().then(res =>{
        firebase.storage().refFromURL(path).delete().then(res => {
            this.props.history.push("/")
        })
      })
    }

  handleOnEdit(e){
    this.props.history.push(`edit/${e.currentTarget.id}`)
  }
  renderAllImages(){
    if(this.state.data !== null){
    return this.state.data.map(value => {
      return(
        <div key={value.id} className="item">
          <div className="ui small image">
            <img alt="" src={value.data.imagePath} />
          </div>
          <div className="fixed content">
            <span className="header">{value.data.status}</span>
            <div className="meta">
              <span>{moment(value.data.time).format('LLLL')}</span>
            </div>
            <div className="extra">
              <div onClick={this.handleDelete.bind(this,value.data.imagePath,value.id)}  className="ui right floated red button">
                Delete
              </div>  
              <div onClick={this.handleOnEdit} id={value.id} className="ui right floated primary button">
                {this.state.name}
              <i className="right chevron icon"></i>
            </div> 
            </div> 
          </div>           
        </div>  
      )
    })
  }
  }
  render(){
    return(
      <div className="ui container">
        <div className="ui relaxed divided items"> 
          {this.renderAllImages()}
        </div>  
      </div>
    )
  }
}


export default withRouter(Manage)