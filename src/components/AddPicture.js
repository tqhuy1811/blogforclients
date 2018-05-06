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
      value:''
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
    let path = `${this.state.path}/${Date.now()}`
    let progress = firebase.storage().ref().child(path).put(this.state.file)
    progress.on('state_changed',res => {
      this.setState({value:(res.bytesTransferred/res.totalBytes)*100})
      switch (res.state) {
        case firebase.storage.TaskState.PAUSED: 
          break;
        case firebase.storage.TaskState.RUNNING: 
          break;
        default:
          break;
          
      }
    },err =>{
      this.setState({hidden:'visible'})
    },() => {
      progress.snapshot.ref.getDownloadURL().then(res =>{
        this.state.db.collection("images").add({
        status:this.state.status,
        comments:0,
        time:Date.now(),
        imagePath:res,
        pathStorage:path
        })
        this.setState({
          path:'',
          status:'',
        })
        this.props.history.push("/")
      })
    }
  )}
  render(){
    return (
      <div className="container box" style={{backgroundColor:"whitesmoke"}}>
        <div className="columns is-centered">
          <div className="column is-10">
            <input onChange={this.handleImageChange} accept="image/*" type="file" hidden={true} ref={ref => this.input = ref }/>
            <figure className="image is-640x480">
              <img alt="" onClick={this.handleOnClick} ref={ref => this.image = ref} className="ui required field centered large image" style={{"cursor":"pointer"}} src="https://firebasestorage.googleapis.com/v0/b/quan-sblog.appspot.com/o/27336643_1897487033604039_8984620589435402605_n.jpg?alt=media&token=3f4c7563-0ce3-4ed6-afbc-3b4ab6535974"/>
            </figure>
            <progress style={{marginTop:"2%"}}  className="progress is-primary is-medium" value={this.state.value} max="100"></progress>       
          </div>  
          
        </div>
        <div className=" columns is-centered" >
          <div className="column is-10">
            <form onSubmit={this.handleSubmit} className="field">
              <div className="control">
                <label className="label">Chỗ save hình lưu trên cloud</label>
                <input required value={this.state.path} className="input" onChange={this.handlePathChange} />
              </div>
              <div className="control">
                <label className="label">Status tự kỉ</label>
                <textarea className="textarea" required placeholder="Forever Kun" onChange={this.handleStatusChange} value={this.state.status}></textarea>
              </div>
              <div className="field is-pulled-right"  style={{marginTop:"2%"}}>
                <div className="control">
                  <button className="button is-link">Save</button>
                </div>  
              </div>  
            </form>
          </div>  
        </div>     

        <div className="button is-danger" style={{"visibility":this.state.hidden}}>Đéo up hình được có lỗi gì rồi</div>  
      </div>  
    )
  }
}
export default withRouter(AddPicure)