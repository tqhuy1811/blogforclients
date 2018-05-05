import React, { Component } from 'react'
import firebase from 'firebase'
import { withRouter } from 'react-router-dom'


class MainPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      db:firebase.firestore(),
      data:[]
    }
    this.handleOnclick = this.handleOnclick.bind(this)
  }
  componentDidMount(){
    this.state.db.collection("images").orderBy("time").get().then(res => {
      res.forEach(res => {
        let data = {
          id:res.id,
          data: res.data()
        }
       this.setState({data:this.state.data.concat(data)})
      })
    })
  }
  handleOnclick(e){
    this.props.history.push(`view/${e.currentTarget.id}`)
  }
  renderImage(){
    return this.state.data.map((value) => {
      return(
          <div className="column">
              <img onClick={this.handleOnclick} className="ui image" id={value.id} alt="" src={value.data.imagePath}/>
          </div>
      );
    });
  }
  render() {
    return (
      <div className="ui two column doubling stackable grid container">
          {this.renderImage()}
      </div>  
    )
  }
}
export default withRouter((MainPage))