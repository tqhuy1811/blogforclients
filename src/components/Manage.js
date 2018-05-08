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
            window.location.reload()
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
        <div key={value.id} className="box column is-10">
          <article className="media">
            <figure className="image is-64x64" >
              <img alt="" src={value.data.imagePath} />
            </figure>
            <div className="media content" style={{marginLeft:"8px"}}>
              <div className="content"> 
                <p>
                  <small>{moment(value.data.time).format('LLLL')}</small>
                  <br/> 
                </p>
                <div className="field is-grouped" style={{marginTop:"2%"}}>
                    <div className="control">
                      <button id={value.id}  onClick={this.handleOnEdit} className="button is-link">Edit</button>
                    </div>
                    <div className="control">
                      <button onClick={this.handleDelete.bind(this,value.data.imagePath,value.id)} className="button is-danger">Delete</button>
                    </div>    
                  </div>   
              </div>
            </div>  
          </article> 
        </div>  
      )
    })
  }
  }
  render(){
    return(
      <div className="container">
        <div style={{marginTop:"2%"}} className="columns is-multiline"> 
          {this.renderAllImages()}
        </div>  
      </div>
    )
  }
}


export default withRouter(Manage)