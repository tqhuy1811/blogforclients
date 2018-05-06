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
    this.state.db.collection("images").orderBy("time","desc").get().then(res => {
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
          <div key={value.id} className="column is-4">

              <img onClick={this.handleOnclick} id={value.id}  alt="" src={value.data.imagePath}/>
          </div>
      );
    });
  }
  render() {
    return (
      <div>
        <section className="hero is-medium is-dark is-bold">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">
              I am TUI
            </h1>
            <h2 className="subtitle">
              Welcome to my blog
            </h2>
          </div>
        </div>
      </section>
        <section className="hero is-fullheight is-light is-bold">
        <div className="container"style={{marginTop:"2%"}}>
          <div className="columns is-multiline">
            {this.renderImage()}
          </div>
        </div>
        </section>
      </div> 
    )
  }
}
export default withRouter((MainPage))