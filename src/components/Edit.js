import React,{ Component } from 'react'
import {withRouter} from 'react-router-dom'
import firebase from 'firebase'
import 'firebase/firestore'


class Edit extends Component {
 constructor(props){
   super(props)
   this.state = {
     db: firebase.firestore(),
     data:null,
     status:''
   }
   this.handleOnChange = this.handleOnChange.bind(this)
   this.handleSubmit = this.handleSubmit.bind(this)
 }
 componentDidMount(){
   this.state.db.collection("images").doc(this.props.match.params.id).get().then(res => {
    this.setState({data:res.data()})
    this.setState({status:this.state.data.status})
   })
 }
 handleOnChange(e){
   this.setState({status:e.target.value})
 }
 handleSubmit(e){
   e.preventDefault()
   if(this.state.status !== ''){
     this.state.db.collection("images").doc(this.props.match.params.id).update({
       status:this.state.status
     }).then(res => {
       this.props.history.push(`/view/${this.props.match.params.id}`)
     })
   }
 }

 renderImage(){
   if(this.state.data!== null){
     return(
       <div>
        <img src={this.state.data.imagePath} alt="" className="ui huge centered image" />
        <form style={{marginTop:"4%"}} onSubmit={this.handleSubmit} className="ui form">
          <div className="field">
            <textarea required value={this.state.status} onChange={this.handleOnChange}></textarea>
          </div>
          <button className="ui primary button right floated">Save</button>  
        </form>  
       </div>  
     )
   }
 }
 
 render(){
   return(
     <div className="ui container">
      {this.renderImage()}
     </div>  
   )
 }
}
export default withRouter(Edit)