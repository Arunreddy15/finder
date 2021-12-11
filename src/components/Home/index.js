import { Component } from "react";
import {BsGithub} from "react-icons/bs"
import "./index.css"

const apiStatus={
    initial:"INITIAL",
    success:"SUCCESS",
    failure:"FAILURE",
    in_Progress:"IN_PROGRESS"
}
class Home extends Component{
state={username:"Aunreddy15",api:apiStatus.initial,profile:[]}

componentDidMount=async()=>{
    const {username}=this.state
    this.setState({api:apiStatus.in_Progress})
    const response=await fetch(`https://api.github.com/users/${username}`)
    const data=await response.json()
    if (response.ok===true){
        this.setState({profile:data,api:apiStatus.success})
    }
    else{
        this.setState({api:apiStatus.failure})
    }
}

onClickFind=async()=>{
    const {username}=this.state
    this.setState({api:apiStatus.in_Progress})
    const response=await fetch(`https://api.github.com/users/${username}`)
    const data=await response.json()
    if (response.ok===true){
        this.setState({profile:data,api:apiStatus.success})
    }
    else{
        this.setState({api:apiStatus.failure})
    }
}

onChangeUserName=(event)=>{
    this.setState({username:event.target.value})
    console.log(event.target.value)
}

renderData=()=>{
    const {profile}=this.state
    return <div className="profile-section">
        <div className="profile-img-un">
            <img className="profile-image" src={profile.avatar_url} alt="profile"/>
            <div className="profile-data">
                <h1>{profile.name}</h1>
                <p>{profile.login}</p>
            </div>
            <button>Edit Profile</button>
        </div>
        <div></div>
    </div>
}

renderLoading=()=><div>Loading...</div>

renderFail=()=>{
    const{username}=this.state 
    return<div className="error-fail"><p>{`There is no existing personal in Github with this username "${username}", Please try again with another name`}</p></div>
}

renderApiData=()=>{
    const{api}=this.state
    switch (api) {
        case apiStatus.success:
            
           return this.renderData()
        case apiStatus.failure:
            
            return this.renderFail()
        case apiStatus.in_Progress:
            
                return this.renderLoading()    
        default:
            return null;
    }
}
    
render(){
        const {username}=this.state
        return<div className="home">
            <div className="nav-bar">
                    <h1>pro<span>.finder</span></h1>
                    <div className="git-icon-container">
                    <BsGithub size={32}></BsGithub></div>
            </div>
            <div className="home-inner-body">
            <div className="home-inner">
                
                <div className="body">
                    <div className="body-upper-section">
                        <h1 className="wish">Hello, Welcome!</h1>
                        <div className="disclaimer">
                            <p>to "Github Profile Finder" </p>
                            <input value={username} onChange={this.onChangeUserName} type="text" placeholder="Enter exact username of Github user"></input>
                        </div>
                        <button onClick={this.onClickFind} type="button" className="button-find">Find</button>
                    </div>
                <div>
                    {this.renderApiData()}
                </div>
                </div>
            </div>
            </div>
        </div>
    }
}
export default Home