import React from "react";
import {connect} from "react-redux";
import api from "../../apis/api";
import {setUser,editUser} from '../../actions/userActions';
class UserProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:0,
            username:'',
            firstName:'',
            lastName:'',
            email:'',
            password:''
        }
    }
    onChangeUsername=(e)=>{
        e.preventDefault();
        this.setState({
            username:e.target.value
        });
    }
    onChangeFirstName=(e)=>{
        e.preventDefault();
        this.setState({
            firstName:e.target.value
        });
    }
    onChangeLastName=(e)=>{
        e.preventDefault();
        this.setState({
            lastName:e.target.value
        });
    }
    onChangeEmail=(e)=>{
        e.preventDefault();
        this.setState({
            email:e.target.value
        });
    }
    onSubmitProfile=(e)=>{
        e.preventDefault();
        const { 
            username ,
            firstName,
            lastName,
            email//,password
        } =this.state;
        const userProfile={
            username ,
            firstName,
            lastName,
            email//,password
        };
        this.props.editUser(userProfile);
    }
    componentDidMount(){
        var _this=this;
        try {
            api.get('/api/user/info').then(function (res) {
                if(res.data){
                    _this.props.setUser(res.data);
                }
            });
        } catch (error) {
            console.log('An error occurs in Modal.setUserData() '+error);
        }
    }
    logOut=(e)=>{
        e.preventDefault();
        window.location.replace("/logout");
    }
    getSnapshotBeforeUpdate(prevProps) {
        if(prevProps.user!==this.props.user){
            try {
                this.setState({
                    username:this.props.user.username,
                    firstName:this.props.user.firstname,
                    lastName:this.props.user.lastname,
                    email:this.props.user.email
                });
            } 
            catch (error) {
                console.log('An error occurs in UserProfile.getDerivedStateFromProps()');
                console.error(error);
            }
        }
    }
    render(){
        return(
            <div className="container-user-details">
                <h1>User Profile</h1>
                <form onSubmit={this.onSubmitProfile} id="form-profile"> 
                    <label htmlFor="username">Username: </label>
                    <input value={this.state.username} name="username" id="username" onChange={(e)=>this.onChangeUsername(e)}/>

                    <label htmlFor="firstName">First Name: </label>
                    <input value={this.state.firstName} name="firstName" id="firstName" onChange={(e)=>this.onChangeFirstName(e)}/>

                    <label htmlFor="lastName">Last Name: </label>
                    <input value={this.state.lastName} name="lastName" id="lastName" onChange={(e)=>this.onChangeLastName(e)}/>

                    <label htmlFor="email">Email:</label>
                    <input value={this.state.email} name="email" id="email" onChange={(e)=>this.onChangeEmail(e)}/>
                    <button type="submit" className="btn btn-success">Update</button>
                    <button id="btn-logout" onClick={(e)=>this.logOut(e)} className="btn btn-danger">
                        Logout
                    </button>
                </form>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
      user:state.user.user
    }
}
export default connect(mapStateToProps,{setUser,editUser})(UserProfile);