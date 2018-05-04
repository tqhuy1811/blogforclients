import React, { Component }  from 'react'
import firebase from 'firebase'
import { withRouter } from 'react-router-dom'
import 'firebase/firestore'
class AddPicure extends Component {
  constructor(props){
    super(props)
    this.state = {
      db: firebase.firestore(),
      file:null,
      path:'',
      status:'',
      hidden:'hidden',
    }
    this.handleImageChange = this.handleImageChange.bind(this)
    this.handlePathChange = this.handlePathChange.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
  }
  handleImageChange(e){
    if(e.target.files && e.target.files[0]){
      let reader = new FileReader();
      reader.onload = (e) => {
        this.image.src = e.target.result
      }
      this.setState({file:e.target.files[0]})
      reader.readAsDataURL(e.target.files[0]);
    }
   
  }
  handleOnClick(){
    this.input.click()
  }

  handlePathChange(e){
    this.setState({path:e.target.value})
  }
  handleStatusChange(e){
    this.setState({status:e.target.value})
  }
  handleSubmit(e){
    e.preventDefault()
    firebase.storage().ref().child(`${this.state.path}/${Date.now()}`).put(this.state.file).then(res => {
      this.setState({hidden:'hidden'})

      this.state.db.collection("images").add({
        status:this.state.status,
        comments:0,
        time:Date.now(),
        imagePath:res.metadata.downloadURLs[0]
      })
      this.setState({
        path:'',
        status:'',
      })
      this.props.history.push("/")
    }).catch(err => {
      this.setState({hidden:'visible'})
    })
  }
  componentDidMount(){
    const settings = {timestampsInSnapshots: true};
		this.state.db.settings(settings);
  }
  render(){
    return (
      <div className="ui container">
        <input onChange={this.handleImageChange} accept="image/*" type="file" hidden={true} ref={ref => this.input = ref }/>
        <img alt="" onClick={this.handleOnClick} ref={ref => this.image = ref} className="ui required field centered large image" style={{"cursor":"pointer"}} src="https://firebasestorage.googleapis.com/v0/b/quan-sblog.appspot.com/o/27336643_1897487033604039_8984620589435402605_n.jpg?alt=media&token=3f4c7563-0ce3-4ed6-afbc-3b4ab6535974"/>
        <form onSubmit={this.handleSubmit} className="ui form">
          <div className="required field">
            <label>Chỗ save hình lưu trên cloud</label>
            <input required value={this.state.path} onChange={this.handlePathChange} />
          </div>
          <div className="required field">
            <label>Status tự kỉ</label>
            <textarea required placeholder="Forever Kun" onChange={this.handleStatusChange} value={this.state.status}></textarea>
          </div>
          <button className="ui primary button" >Save</button>
        </form>
        <div className="ui red button" style={{"visibility":this.state.hidden}} >Đéo up hình được có lỗi gì rồi</div>  
      </div>  
    )
  }
}
export default withRouter(AddPicure)