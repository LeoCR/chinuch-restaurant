import React from "react";
import {connect} from "react-redux";
class UserDetails extends React.Component{
    logOut=(e)=>{
        e.preventDefault();
        window.location.replace("/logout");
    }
    getProfile=(e)=>{
        e.preventDefault();
        window.location.replace('/user/profile/');
    }
    render(){
        return(
            <React.Fragment>
                    <div className="container-user-details" style={{margin:'20px 50px'}}>
                        {this.props.user.username  ? <p>Username: {this.props.user.username}</p>:''}

                        {this.props.user.firstname ? <p>First Name: {this.props.user.firstname}</p>:''}

                        {this.props.user.lastname ? <p>Last Name: {this.props.user.lastname}</p>:''}

                        {this.props.user.email ? <p>Email: {this.props.user.email}</p>:'' }

                        <button id="btn-logout" onClick={(e)=>this.logOut(e)} className="btn btn-danger">
                            Logout
                        </button>
                        <button onClick={(e)=>this.getProfile(e)} className="btn btn-success">Profile</button>
                    </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
      user:state.user.user
    }
}
export default connect(mapStateToProps)(UserDetails);