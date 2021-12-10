import { Component } from "react";
import {FaLinkedinIn} from "react-icons/fa"
import "./index.css"

class Home extends Component{
state={username:"",loading:"",profile:[]}

onClickFind=async()=>{
    const {username}=this.state
    this.setState({loading:"true"})
    const response=await fetch(`https://api.github.com/users/${username}`)
    const data=await response.json()
if (response.ok===true){
    this.setState({profile:data,loading:false})
}
}

onChangeUserName=(event)=>{
    this.setState({username:event.target.value})
    console.log(event.target.value)
}

renderData=()=>{
    const {profile}=this.state
    return <div className="profile">
        <h1>{profile.login}</h1>
        <img src={profile.avatar_url} alt="profile"/>
    </div>
}
    
render(){
        const {username,loading}=this.state
        return<div className="home">
            <div className="nav-bar">
                    <h1>pro<span>.finder</span></h1>
                    <div className="link-icon-container">
                    <FaLinkedinIn size={26}></FaLinkedinIn></div>
            </div>
            <div className="home-inner-body">
            <div className="home-inner">
                
                <div className="body">
                    <h1 className="wish">Hello, welcome!</h1>
                    <div className="disclaimer">
                        <p>to "Linkedin Profile Finder" </p>
                        <input value={username} onChange={this.onChangeUserName} type="text" placeholder="Enter exact username of Linkedin user"></input>
                    </div>
                    <button onClick={this.onClickFind} type="button" className="button-find">Find</button>
                <div>
                    {loading?"Loading...":this.renderData()}
                </div>
                </div>
            </div>
            </div>
        </div>
    }
}
export default Home