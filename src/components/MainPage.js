import React, { Component } from 'react'
import firebase from 'firebase'
import { withRouter } from 'react-router-dom'
import 'firebase/firestore'

class MainPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      db:firebase.firestore(),
      images:[]
    }
    this.handleOnclick = this.handleOnclick.bind(this)
  }
  componentDidMount(){
    const settings = {timestampsInSnapshots: true};
    this.state.db.settings(settings);
    this.state.db.collection("images").orderBy("time").get().then(res => {
      res.forEach(res => {
        let data = {
          id:res.id,
          image: res.data()
        }
       this.setState({images:this.state.images.concat(data)})
      })
    })
  }
  handleOnclick(e){
    this.props.history.push(`view/${e.currentTarget.id}`)
  }
  renderImage(){
    return this.state.images.map((value) => {
      return(
        <div  key={value.id}  className="ui card" style={{cursor:"pointer"}}>
          <div  className="image">
           <img onClick={this.handleOnclick} id={value.id} alt="" src={value.image.imagePath}/>
          </div>
        </div>    
      );
    });
  }
  render() {
    return (
      <div className="ui container">
        <div className="ui three stackable cards">
          {this.renderImage()}
        </div>
      </div>  
    )
  }
}
export default withRouter(MainPage)